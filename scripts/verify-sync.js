#!/usr/bin/env node

/**
 * 7Slots Design Tokens Synchronization Verifier
 *
 * Compares all theme token sets against the baseline (default: 7slots.default.json)
 * and highlights missing tokens, extra tokens, type mismatches, and "-copy" artifacts.
 *
 * MEMO: Tokens ending with "-copy" (e.g. "bg-copy", "6-copy") are created
 * automatically by Token Studio when a user copies a token to another set in Figma.
 * These are usually unrenamed duplicates or missing canonical tokens.
 *
 * Usage:
 *   node scripts/verify-sync.js [options]
 *
 * Options:
 *   -s, --summary-only        Show only the summary table
 *   -t, --theme <name>        Inspect only a specific theme (e.g. "masalbet", "winnita")
 *   -b, --base <name>         Baseline theme (default: "7slots.default")
 *   -f, --filter <pattern>    Filter displayed tokens by substring or regex pattern
 *   -a, --all                 Include snapshot themes (e.g. masalbet-old)
 *   --json                    Output results in JSON format
 *   -h, --help                Show this help message
 */

const fs = require('fs');
const path = require('path');

// ANSI escape codes for colors
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
  white: '\x1b[37m',
};

// Disable colors if running in environments without TTY or NO_COLOR
if (process.env.NO_COLOR || !process.stdout.isTTY) {
  Object.keys(c).forEach(k => c[k] = '');
}

// Parse command line arguments
const args = process.argv.slice(2);
let summaryOnly = false;
let targetTheme = null;
let baseThemeName = '7slots.default';
let filterPattern = null;
let includeAll = false;
let outputJson = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-s' || arg === '--summary-only') {
    summaryOnly = true;
  } else if (arg === '-t' || arg === '--theme') {
    targetTheme = args[++i];
  } else if (arg === '-b' || arg === '--base') {
    baseThemeName = args[++i];
  } else if (arg === '-f' || arg === '--filter') {
    filterPattern = args[++i];
  } else if (arg === '-a' || arg === '--all') {
    includeAll = true;
  } else if (arg === '--json') {
    outputJson = true;
  } else if (arg === '-h' || arg === '--help') {
    console.log(`
${c.bold}7Slots Design Token Sync Verifier${c.reset}

${c.cyan}Usage:${c.reset}
  node scripts/verify-sync.js [options]

${c.cyan}Options:${c.reset}
  -s, --summary-only        Show only the summary table
  -t, --theme <name>        Inspect only a specific theme (e.g. "masalbet", "winnita")
  -b, --base <name>         Baseline theme (default: "7slots.default")
  -f, --filter <pattern>    Filter displayed tokens by substring or regex pattern
  -a, --all                 Include snapshot themes (e.g. masalbet-old)
  --json                    Output results in JSON format
  -h, --help                Show this help message

${c.yellow}Memo on "-copy" tokens:${c.reset}
  Tokens ending in "-copy" (e.g. "card.bg-copy") are created automatically
  by Token Studio when copying tokens between sets in Figma. The verifier flags
  these so they can be renamed to canonical names or cleaned up.
`);
    process.exit(0);
  }
}

// Helper to test if a token path is a copy artifact
function isCopyToken(tokenPath) {
  return /-copy(\b|\.|$)|_copy(\b|\.|$)/i.test(tokenPath);
}

// Suggest canonical name by stripping -copy
function getCanonicalSuggestion(tokenPath) {
  return tokenPath.replace(/-copy(-\d+)?/gi, '');
}

// Ensure theme name format
function normalizeThemeName(name) {
  if (name.endsWith('.json')) name = name.replace(/\.json$/, '');
  if (!name.startsWith('7slots.') && !name.includes('.')) {
    name = '7slots.' + name;
  }
  return name;
}

baseThemeName = normalizeThemeName(baseThemeName);
if (targetTheme) {
  targetTheme = normalizeThemeName(targetTheme);
}

const themesDir = path.resolve(__dirname, '..', 'themes');
const metadataPath = path.join(themesDir, '$metadata.json');

// Discover token set list
let tokenSets = [];
if (fs.existsSync(metadataPath)) {
  try {
    const meta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    if (Array.isArray(meta.tokenSetOrder)) {
      tokenSets = meta.tokenSetOrder;
    }
  } catch (err) {
    console.error(`${c.red}Warning: Failed to parse $metadata.json${c.reset}`, err.message);
  }
}

if (tokenSets.length === 0) {
  tokenSets = fs.readdirSync(themesDir)
    .filter(f => f.endsWith('.json') && !f.startsWith('$'))
    .map(f => f.replace(/\.json$/, ''));
}

// Filter themes
let themesToCompare = tokenSets.filter(t => t !== baseThemeName);

if (!includeAll) {
  themesToCompare = themesToCompare.filter(t => !t.endsWith('-old') && !t.includes('snapshot'));
}

if (targetTheme) {
  themesToCompare = themesToCompare.filter(t => t.toLowerCase() === targetTheme.toLowerCase());
  if (themesToCompare.length === 0) {
    console.error(`${c.red}Error: Theme "${targetTheme}" not found.${c.reset}`);
    console.error(`Available themes: ${tokenSets.filter(t => t !== baseThemeName).join(', ')}`);
    process.exit(1);
  }
}

// Recursively traverse JSON to extract tokens
function extractTokens(obj, currentPath = [], tokenMap = new Map()) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return tokenMap;

  // A token node is identified by the presence of a 'value' property
  if ('value' in obj) {
    tokenMap.set(currentPath.join('.'), {
      path: currentPath.join('.'),
      type: obj.type || 'unknown',
      value: obj.value,
      description: obj.description || '',
    });
  }

  // Also traverse child objects (handles composite/nested tokens)
  for (const [key, val] of Object.entries(obj)) {
    if (key !== 'value' && key !== 'type' && key !== 'description' && !key.startsWith('$') && typeof val === 'object' && val !== null) {
      extractTokens(val, [...currentPath, key], tokenMap);
    }
  }

  return tokenMap;
}

function loadTokens(themeName) {
  const filePath = path.join(themesDir, `${themeName}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return extractTokens(content);
}

// Load baseline
let baseTokens;
try {
  baseTokens = loadTokens(baseThemeName);
} catch (err) {
  console.error(`${c.red}Error loading baseline theme "${baseThemeName}":${c.reset} ${err.message}`);
  process.exit(1);
}

// Find -copy tokens in baseline
const baseCopyTokens = [];
for (const [pathKey, token] of baseTokens.entries()) {
  if (isCopyToken(pathKey)) {
    baseCopyTokens.push({
      path: pathKey,
      type: token.type,
      canonical: getCanonicalSuggestion(pathKey),
    });
  }
}

const report = {
  baseline: {
    theme: baseThemeName,
    totalTokens: baseTokens.size,
    copyTokens: baseCopyTokens,
  },
  results: [],
};

let filterRegex = null;
if (filterPattern) {
  try {
    filterRegex = new RegExp(filterPattern, 'i');
  } catch (e) {
    filterRegex = new RegExp(filterPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  }
}

// Compare each theme against baseline
for (const themeName of themesToCompare) {
  let themeTokens;
  try {
    themeTokens = loadTokens(themeName);
  } catch (err) {
    console.error(`${c.red}Error loading theme "${themeName}":${c.reset} ${err.message}`);
    continue;
  }

  const missing = [];
  const extra = [];
  const typeMismatches = [];
  const copyTokens = [];

  // Check for missing tokens and type mismatches
  for (const [pathKey, baseToken] of baseTokens.entries()) {
    if (!themeTokens.has(pathKey)) {
      if (!filterRegex || filterRegex.test(pathKey)) {
        missing.push({
          path: pathKey,
          expectedType: baseToken.type,
        });
      }
    } else {
      const themeToken = themeTokens.get(pathKey);
      if (baseToken.type !== 'unknown' && themeToken.type !== 'unknown' && baseToken.type !== themeToken.type) {
        if (!filterRegex || filterRegex.test(pathKey)) {
          typeMismatches.push({
            path: pathKey,
            baselineType: baseToken.type,
            themeType: themeToken.type,
          });
        }
      }
    }
  }

  // Check for extra tokens and copy tokens
  for (const [pathKey, themeToken] of themeTokens.entries()) {
    if (!baseTokens.has(pathKey)) {
      if (!filterRegex || filterRegex.test(pathKey)) {
        extra.push({
          path: pathKey,
          type: themeToken.type,
        });
      }
    }

    if (isCopyToken(pathKey)) {
      if (!filterRegex || filterRegex.test(pathKey)) {
        const canonical = getCanonicalSuggestion(pathKey);
        copyTokens.push({
          path: pathKey,
          canonical,
          existsInBaseline: baseTokens.has(canonical),
          existsInTheme: themeTokens.has(canonical),
        });
      }
    }
  }

  report.results.push({
    theme: themeName,
    totalTokens: themeTokens.size,
    isSynced: missing.length === 0 && extra.length === 0 && typeMismatches.length === 0 && copyTokens.length === 0,
    missing,
    extra,
    typeMismatches,
    copyTokens,
  });
}

// JSON Output
if (outputJson) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(report.results.every(r => r.isSynced) ? 0 : 1);
}

// Terminal Output
console.log(`\n${c.bold}================================================================${c.reset}`);
console.log(`${c.bold}      7Slots Design Tokens Synchronization Verifier             ${c.reset}`);
console.log(`${c.bold}================================================================${c.reset}`);
console.log(`${c.gray}Baseline Theme:${c.reset} ${c.cyan}${c.bold}${baseThemeName}${c.reset} (${baseTokens.size} tokens)`);
console.log(`${c.gray}Comparing:${c.reset}      ${themesToCompare.length} theme(s)`);
if (filterPattern) {
  console.log(`${c.gray}Filter Pattern:${c.reset} ${c.yellow}${filterPattern}${c.reset}`);
}
console.log(`${c.dim}Memo: "-copy" tokens are auto-created when copying in Token Studio (Figma).${c.reset}\n`);

// Print baseline -copy warnings if any
if (baseCopyTokens.length > 0) {
  console.log(`${c.yellow}${c.bold}⚠️  Baseline "${baseThemeName}" has ${baseCopyTokens.length} "-copy" artifact(s):${c.reset}`);
  baseCopyTokens.forEach(b => {
    console.log(`   ${c.yellow}*${c.reset} ${b.path} ${c.gray}(suggested: "${b.canonical}")${c.reset}`);
  });
  console.log('');
}

// Print Summary Table
function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

function padRight(str, len) {
  const visibleLen = stripAnsi(str).length;
  return str + ' '.repeat(Math.max(0, len - visibleLen));
}

function padLeft(str, len) {
  const visibleLen = stripAnsi(str).length;
  return ' '.repeat(Math.max(0, len - visibleLen)) + str;
}

const cols = [
  { name: 'Theme', width: 20, align: 'left' },
  { name: 'Tokens', width: 8, align: 'right' },
  { name: 'Missing', width: 9, align: 'right' },
  { name: 'Extra', width: 8, align: 'right' },
  { name: 'Type Err', width: 10, align: 'right' },
  { name: '-copy', width: 8, align: 'right' },
  { name: 'Status', width: 12, align: 'left' }
];

const headerLine = '| ' + cols.map(col => col.align === 'left' ? padRight(col.name, col.width) : padLeft(col.name, col.width)).join(' | ') + ' |';
const sepLine = '|' + cols.map(col => '-'.repeat(col.width + 2)).join('|') + '|';

console.log(c.bold + sepLine + c.reset);
console.log(c.bold + headerLine + c.reset);
console.log(c.bold + sepLine + c.reset);

for (const res of report.results) {
  const shortName = res.theme.replace(/^7slots\./, '');
  const missingStr = res.missing.length === 0
    ? `${c.green}0${c.reset}`
    : `${c.red}${res.missing.length}${c.reset}`;
  const extraStr = res.extra.length === 0
    ? `${c.green}0${c.reset}`
    : `${c.yellow}${res.extra.length}${c.reset}`;
  const typeErrStr = res.typeMismatches.length === 0
    ? `${c.green}0${c.reset}`
    : `${c.magenta}${res.typeMismatches.length}${c.reset}`;
  const copyStr = res.copyTokens.length === 0
    ? `${c.green}0${c.reset}`
    : `${c.yellow}${res.copyTokens.length}${c.reset}`;
  const statusStr = res.isSynced
    ? `${c.green}✔ SYNCED${c.reset}`
    : `${c.red}✘ DESYNC${c.reset}`;

  const row = '| ' + [
    padRight(shortName, cols[0].width),
    padLeft(String(res.totalTokens), cols[1].width),
    padLeft(missingStr, cols[2].width),
    padLeft(extraStr, cols[3].width),
    padLeft(typeErrStr, cols[4].width),
    padLeft(copyStr, cols[5].width),
    padRight(statusStr, cols[6].width),
  ].join(' | ') + ' |';

  console.log(row);
}
console.log(sepLine + '\n');

// Print Detailed Breakdowns
if (!summaryOnly) {
  for (const res of report.results) {
    if (res.isSynced) {
      console.log(`${c.green}${c.bold}✔ ${res.theme}${c.reset}: All ${res.totalTokens} tokens perfectly in sync with baseline.\n`);
      continue;
    }

    console.log(`${c.bold}${c.red}▶ Theme: ${res.theme}${c.reset} (${res.totalTokens} tokens)`);

    // 1. Missing Tokens
    if (res.missing.length > 0) {
      console.log(`  ${c.red}${c.bold}Missing from baseline (${res.missing.length}):${c.reset}`);
      res.missing.forEach(m => {
        console.log(`    ${c.red}-${c.reset} ${c.bold}${m.path}${c.reset} ${c.gray}(expected type: ${m.expectedType})${c.reset}`);
      });
    }

    // 2. Extra Tokens
    if (res.extra.length > 0) {
      console.log(`  ${c.yellow}${c.bold}Extra tokens not in baseline (${res.extra.length}):${c.reset}`);
      res.extra.forEach(e => {
        console.log(`    ${c.yellow}+${c.reset} ${c.bold}${e.path}${c.reset} ${c.gray}(type: ${e.type})${c.reset}`);
      });
    }

    // 3. Type Mismatches
    if (res.typeMismatches.length > 0) {
      console.log(`  ${c.magenta}${c.bold}Type mismatches with baseline (${res.typeMismatches.length}):${c.reset}`);
      res.typeMismatches.forEach(tm => {
        console.log(`    ${c.magenta}~${c.reset} ${c.bold}${tm.path}${c.reset}: baseline=${c.cyan}${tm.baselineType}${c.reset}, theme=${c.yellow}${tm.themeType}${c.reset}`);
      });
    }

    // 4. Copy Artifacts (-copy)
    if (res.copyTokens.length > 0) {
      console.log(`  ${c.yellow}${c.bold}Artifact "-copy" tokens (${res.copyTokens.length}) [Auto-created by Token Studio]:${c.reset}`);
      res.copyTokens.forEach(ct => {
        let note = '';
        if (ct.existsInBaseline) {
          note = `${c.green}→ Baseline has canonical "${ct.canonical}" (rename needed)${c.reset}`;
        } else if (ct.existsInTheme) {
          note = `${c.red}→ Duplicate: theme already has "${ct.canonical}" (remove needed)${c.reset}`;
        } else {
          note = `${c.gray}→ Suggested canonical: "${ct.canonical}"${c.reset}`;
        }
        console.log(`    ${c.yellow}⚠️ ${c.reset} ${c.bold}${ct.path}${c.reset} ${note}`);
      });
    }

    console.log('');
  }
}

// Exit code
const allSynced = report.results.every(r => r.isSynced);
if (allSynced) {
  console.log(`${c.green}${c.bold}All themes are completely synchronized with ${baseThemeName}!${c.reset}\n`);
  process.exit(0);
} else {
  console.log(`${c.yellow}${c.bold}Helpful commands:${c.reset}`);
  console.log(`  Inspect single theme:  ${c.cyan}node scripts/verify-sync.js -t <theme>${c.reset}`);
  console.log(`  Filter by token name:  ${c.cyan}node scripts/verify-sync.js -f <pattern>${c.reset}`);
  console.log(`  Show only summary:     ${c.cyan}node scripts/verify-sync.js -s${c.reset}\n`);
  process.exit(1);
}
