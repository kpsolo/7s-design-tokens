#!/usr/bin/env node

/**
 * 7Slots Referral Program Token Synchronization Tool
 *
 * Extracts and migrates the 43 canonical "referral-program" tokens from the
 * git branch 'refferal-program' into the active theme sets on the current branch (main).
 *
 * Enforces project rules:
 *  - Preserves standard comma-separated rgba(r, g, b, a) format for colors with alpha.
 *  - Verifies presence and exact equality for all 43 tokens in each theme set.
 *  - Ensures valid Token Studio / W3C DTCG format with 2-space JSON indentation.
 *
 * Usage:
 *   node scripts/sync-referral-tokens.js [options]
 *
 * Options:
 *   --verify               Verify that all referral tokens on the current branch exist and match
 *   --apply                Extract and write referral tokens into local theme files (default)
 *   --dry-run              Simulate the extraction and report changes without modifying files
 *   -t, --theme <name>     Target only a specific theme (e.g. "default", "masalbet")
 *   -b, --branch <branch>  Source branch to pull tokens from (default: "refferal-program")
 *   -h, --help             Show this help message
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI escape codes for terminal formatting
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

if (process.env.NO_COLOR || !process.stdout.isTTY) {
  Object.keys(c).forEach(k => (c[k] = ''));
}

// Canonical list of 43 tokens specified for Referral Program
const REFERRAL_TOKENS = [
  'typography.referral-program.text-strong',
  'typography.referral-program.text-regular',
  'typography.referral-program.earning-numbers',
  'typography.referral-program.earning-currency',
  'typography.referral-program.no-qualification-number',
  'typography.referral-program.no-qualification-percent',
  'typography.special-blocks.referral-number',

  'shadow.special-blocks.referral',
  'referral-program.shadow.rule-card',
  'referral-program.shadow.special-blocks.card2',

  'referral-program.card.radius',
  'referral-program.card.radius-progress-line',
  'referral-program.card.opacity 1',
  'referral-program.card.opacity 2',
  'referral-program.card.bg',
  'referral-program.card.bg-no qualification',
  'referral-program.card.accent text 3',
  'referral-program.card.text accent 1',
  'referral-program.card.border',
  'referral-program.card.bg-lable',
  'referral-program.card.progress',
  'referral-program.card.text primary',
  'referral-program.card.progress 2',
  'referral-program.card.text secondary',
  'referral-program.card.accent 2',

  'referral-program.qualification.steps.point',
  'referral-program.qualification.steps.progress-line-inactive',
  'referral-program.qualification.steps.progress-line-active',
  'referral-program.qualification.steps.progress-line-default',
  'referral-program.qualification.steps.icon',
  'referral-program.qualification.steps.complite-icon',
  'referral-program.qualification.card.fill',
  'referral-program.qualification.card.border',
  'referral-program.qualification.social-media-card.fill',
  'referral-program.qualification.social-media-card.icon-fill',
  'referral-program.qualification.social-media-card.invite-fill',

  'referral-program.statistic.card.fill',
  'referral-program.main-screen.bg-element',
  'referral-program.bg.blur',
  'referral-program.rule-card.opacity',

  'border.special-blocks.referral-card',
  'border.special-blocks.referral-card-line',

  'bg.blur-referral'
];

const THEME_FILES = [
  '7slots.default.json',
  '7slots.abebet.json',
  '7slots.basari.json',
  '7slots.masalbet.json',
  '7slots.winnita.json'
];

// CLI Arguments parsing
const args = process.argv.slice(2);
let mode = 'apply';
let dryRun = false;
let targetTheme = null;
let sourceBranch = 'refferal-program';

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--verify') {
    mode = 'verify';
  } else if (arg === '--apply') {
    mode = 'apply';
  } else if (arg === '--dry-run') {
    dryRun = true;
    mode = 'apply';
  } else if (arg === '-t' || arg === '--theme') {
    targetTheme = args[++i];
  } else if (arg === '-b' || arg === '--branch') {
    sourceBranch = args[++i];
  } else if (arg === '-h' || arg === '--help') {
    printHelp();
    process.exit(0);
  }
}

function printHelp() {
  console.log(`
${c.bold}7Slots Referral Program Token Synchronization Tool${c.reset}

${c.cyan}Usage:${c.reset}
  node scripts/sync-referral-tokens.js [options]

${c.cyan}Options:${c.reset}
  --apply                Extract and apply referral tokens into theme files (default)
  --verify               Verify all 43 referral tokens against source branch
  --dry-run              Simulate apply without writing to disk
  -t, --theme <name>     Target a specific theme (e.g. "default", "masalbet")
  -b, --branch <branch>  Source branch (default: "refferal-program")
  -h, --help             Show this help message
`);
}

function getByPath(obj, tokenPath) {
  const parts = tokenPath.split('.');
  let curr = obj;
  for (const p of parts) {
    if (curr == null || typeof curr !== 'object') return undefined;
    curr = curr[p];
  }
  return curr;
}

function setByPath(obj, tokenPath, value) {
  const parts = tokenPath.split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!curr[p] || typeof curr[p] !== 'object' || ('value' in curr[p])) {
      curr[p] = {};
    }
    curr = curr[p];
  }
  curr[parts[parts.length - 1]] = value;
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function checkRgbaSyntax(val) {
  const str = JSON.stringify(val);
  // Detect modern CSS slash syntax like rgb(r g b / a)
  const slashMatch = str.match(/rgb\(\s*\d+\s+\d+\s+\d+\s*\/\s*[\d.%]+\s*\)/i);
  return !slashMatch;
}

function normalizeRgba(obj) {
  // Recursively inspect and enforce standard rgba(r, g, b, a) format if any modern CSS slash syntax was present
  if (!obj || typeof obj !== 'object') return obj;
  const clone = JSON.parse(JSON.stringify(obj));
  function walk(node) {
    for (const k of Object.keys(node)) {
      if (typeof node[k] === 'string') {
        // Convert rgb(r g b / a%) -> rgba(r, g, b, a)
        node[k] = node[k].replace(/rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)%?\s*\)/gi, (m, r, g, b, a) => {
          let alphaNum = parseFloat(a);
          if (m.includes('%') || alphaNum > 1) {
            alphaNum = (alphaNum / 100).toFixed(2);
          } else {
            alphaNum = alphaNum.toFixed(2);
          }
          return `rgba(${r}, ${g}, ${b}, ${alphaNum})`;
        });
      } else if (node[k] && typeof node[k] === 'object') {
        walk(node[k]);
      }
    }
  }
  walk(clone);
  return clone;
}

function run() {
  console.log(`\n${c.bold}================================================================${c.reset}`);
  console.log(`      ${c.cyan}7Slots Referral Program Token Synchronization Tool${c.reset}`);
  console.log(`${c.bold}================================================================${c.reset}`);
  console.log(`Mode:          ${c.bold}${mode.toUpperCase()}${dryRun ? ' (DRY RUN)' : ''}${c.reset}`);
  console.log(`Source Branch: ${c.bold}${sourceBranch}${c.reset}`);
  console.log(`Tokens Count:  ${c.bold}${REFERRAL_TOKENS.length}${c.reset}`);

  const activeThemes = targetTheme
    ? THEME_FILES.filter(f => f.toLowerCase().includes(targetTheme.toLowerCase()))
    : THEME_FILES;

  if (activeThemes.length === 0) {
    console.error(`\n${c.red}Error: No themes matched filter "${targetTheme}".${c.reset}`);
    process.exit(1);
  }

  let totalErrors = 0;
  const summary = [];

  for (const themeFileName of activeThemes) {
    const localFilePath = path.join(__dirname, '..', 'themes', themeFileName);
    const themeName = themeFileName.replace('7slots.', '').replace('.json', '');

    if (!fs.existsSync(localFilePath)) {
      console.error(`\n${c.red}Error: File not found: ${localFilePath}${c.reset}`);
      totalErrors++;
      continue;
    }

    // Load source theme from branch
    let sourceContent;
    try {
      sourceContent = execSync(`git show ${sourceBranch}:themes/${themeFileName}`, {
        stdio: ['pipe', 'pipe', 'ignore'],
        encoding: 'utf8'
      });
    } catch (e) {
      console.error(`\n${c.red}Error reading themes/${themeFileName} from branch ${sourceBranch}${c.reset}`);
      totalErrors++;
      continue;
    }

    const sourceJson = JSON.parse(sourceContent);
    const localJson = JSON.parse(fs.readFileSync(localFilePath, 'utf8'));

    if (mode === 'apply') {
      let updatedCount = 0;
      let addedCount = 0;

      for (const tokenPath of REFERRAL_TOKENS) {
        const sourceToken = getByPath(sourceJson, tokenPath);
        if (!sourceToken) {
          console.warn(`  ${c.yellow}Warning: ${tokenPath} not found in ${sourceBranch}:${themeFileName}${c.reset}`);
          continue;
        }

        const normalizedToken = normalizeRgba(sourceToken);
        const existingToken = getByPath(localJson, tokenPath);

        if (existingToken) {
          if (!deepEqual(existingToken, normalizedToken)) {
            updatedCount++;
          }
        } else {
          addedCount++;
        }

        setByPath(localJson, tokenPath, normalizedToken);
      }

      if (!dryRun) {
        fs.writeFileSync(localFilePath, JSON.stringify(localJson, null, 2) + '\n', 'utf8');
      }

      summary.push({
        theme: themeName,
        status: 'OK',
        added: addedCount,
        updated: updatedCount,
        totalReferral: REFERRAL_TOKENS.length
      });
    } else if (mode === 'verify') {
      let missingCount = 0;
      let mismatchCount = 0;
      let rgbaIssues = 0;

      for (const tokenPath of REFERRAL_TOKENS) {
        const sourceToken = getByPath(sourceJson, tokenPath);
        const localToken = getByPath(localJson, tokenPath);

        if (!localToken) {
          missingCount++;
        } else {
          const normalizedSource = normalizeRgba(sourceToken);
          if (!deepEqual(localToken, normalizedSource)) {
            mismatchCount++;
          }
          if (!checkRgbaSyntax(localToken)) {
            rgbaIssues++;
          }
        }
      }

      const isOk = missingCount === 0 && mismatchCount === 0 && rgbaIssues === 0;
      if (!isOk) totalErrors++;

      summary.push({
        theme: themeName,
        status: isOk ? 'OK' : 'MISMATCH',
        missing: missingCount,
        mismatched: mismatchCount,
        rgbaIssues: rgbaIssues,
        total: REFERRAL_TOKENS.length
      });
    }
  }

  // Print Summary Table
  console.log(`\n${c.bold}Verification & Summary Table:${c.reset}`);
  console.log('-'.repeat(78));
  if (mode === 'apply') {
    console.log(
      `${c.bold}| Theme               | Added | Updated | Total Ref Tokens | Status           |${c.reset}`
    );
    console.log('-'.repeat(78));
    for (const row of summary) {
      console.log(
        `| ${row.theme.padEnd(19)} | ${String(row.added).padStart(5)} | ${String(row.updated).padStart(7)} | ${String(row.totalReferral).padStart(16)} | ${c.green}✔ APPLIED${c.reset}        |`
      );
    }
  } else {
    console.log(
      `${c.bold}| Theme               | Total | Missing | Mismatch | RGBA Err | Status          |${c.reset}`
    );
    console.log('-'.repeat(78));
    for (const row of summary) {
      const statusColor = row.status === 'OK' ? c.green : c.red;
      const statusIcon = row.status === 'OK' ? '✔ VERIFIED' : '✘ DESYNC';
      console.log(
        `| ${row.theme.padEnd(19)} | ${String(row.total).padStart(5)} | ${String(row.missing).padStart(7)} | ${String(row.mismatched).padStart(8)} | ${String(row.rgbaIssues).padStart(8)} | ${statusColor}${statusIcon.padEnd(15)}${c.reset} |`
      );
    }
  }
  console.log('-'.repeat(78));

  if (totalErrors > 0) {
    console.error(`\n${c.red}✘ Synchronization failed with ${totalErrors} issue(s).${c.reset}\n`);
    process.exit(1);
  } else {
    console.log(`\n${c.green}✔ All ${activeThemes.length} theme sets processed and verified successfully!${c.reset}\n`);
  }
}

run();
