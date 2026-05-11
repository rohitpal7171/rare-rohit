#!/usr/bin/env node
/**
 * pre-commit-check.mjs — run before EVERY git push
 * npm run pre-push
 *
 * Mirrors exactly what Netlify runs. If this passes → Netlify passes.
 */

import { execSync } from 'child_process'
import { existsSync, readFileSync, readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const APP  = path.resolve(ROOT, 'apps/wedding-website')

const PASS  = '\x1b[32m✅ PASS\x1b[0m'
const FAIL  = '\x1b[31m❌ FAIL\x1b[0m'
const INFO  = '\x1b[36mℹ️  \x1b[0m'
const WARN  = '\x1b[33m⚠️  \x1b[0m'

let failed = false

function run(label, cmd, cwd = ROOT) {
  process.stdout.write(`\n${INFO}${label}...\n`)
  try {
    execSync(cmd, { cwd, stdio: 'inherit' })
    console.log(`${PASS} ${label}`)
    return true
  } catch {
    console.log(`${FAIL} ${label}`)
    failed = true
    return false
  }
}

function check(label, condition, hint = '') {
  if (condition) {
    console.log(`${PASS} ${label}`)
  } else {
    console.log(`${FAIL} ${label}${hint !== '' ? `\n   ${WARN}${hint}` : ''}`)
    failed = true
  }
}

console.log('\n\x1b[35m══════════════════════════════════════════\x1b[0m')
console.log('\x1b[35m  Pre-push Check — rare-rohit\x1b[0m')
console.log('\x1b[35m══════════════════════════════════════════\x1b[0m')

// ── 1. TypeScript — same as Netlify's tsc -b ──────────────────────────────
run(
  'TypeScript (tsc -b) — same as Netlify build',
  'npx tsc -b apps/wedding-website/tsconfig.json --noEmit',
  ROOT
)

// ── 2. ESLint — catches red lines before push ─────────────────────────────
run(
  'ESLint — catches all red underlines in editor',
  'npx eslint src --ext .ts,.tsx --max-warnings 0',
  APP
)

// ── 3. Required files ─────────────────────────────────────────────────────
console.log(`\n${INFO}Checking required files...`)
const REQUIRED = [
  'apps/wedding-website/index.html',
  'apps/wedding-website/netlify.toml',
  'apps/wedding-website/tsconfig.json',
  'apps/wedding-website/tsconfig.node.json',
  'apps/wedding-website/tailwind.config.ts',
  'apps/wedding-website/vite.config.ts',
  'apps/wedding-website/src/main.tsx',
  'apps/wedding-website/src/App.tsx',
  'apps/wedding-website/src/i18n/config.ts',
  'apps/wedding-website/src/router/index.tsx',
  'apps/wedding-website/public/favicon.svg',
]
for (const f of REQUIRED) {
  check(`Exists: ${f}`, existsSync(path.join(ROOT, f)))
}

// ── 4. i18n key parity ───────────────────────────────────────────────────
console.log(`\n${INFO}Checking i18n key parity (EN ↔ HI)...`)

const EN_DIR = path.join(APP, 'src/i18n/locales/en')
const HI_DIR = path.join(APP, 'src/i18n/locales/hi')

function getAllKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) => {
    const full = prefix !== '' ? `${prefix}.${k}` : k
    return typeof v === 'object' && v !== null && !Array.isArray(v)
      ? getAllKeys(v, full)
      : [full]
  })
}

const namespaces = readdirSync(EN_DIR).filter(f => f.endsWith('.json'))
for (const ns of namespaces) {
  try {
    const en = JSON.parse(readFileSync(path.join(EN_DIR, ns), 'utf8'))
    const hi = JSON.parse(readFileSync(path.join(HI_DIR, ns), 'utf8'))
    const enKeys = getAllKeys(en).sort()
    const hiKeys = getAllKeys(hi).sort()
    const missing = enKeys.filter(k => !hiKeys.includes(k))
    const extra   = hiKeys.filter(k => !enKeys.includes(k))
    if (missing.length === 0 && extra.length === 0) {
      console.log(`${PASS} i18n: ${ns}`)
    } else {
      console.log(`${FAIL} i18n: ${ns}`)
      if (missing.length > 0) console.log(`   ${WARN}Missing in HI: ${missing.join(', ')}`)
      if (extra.length > 0)   console.log(`   ${WARN}Extra in HI:   ${extra.join(', ')}`)
      failed = true
    }
  } catch (e) {
    console.log(`${FAIL} i18n: ${ns} — parse error: ${e.message}`)
    failed = true
  }
}

// ── 5. No console.log (warn only) ────────────────────────────────────────
console.log(`\n${INFO}Checking for console.log...`)
try {
  const result = execSync(
    'grep -rn "console\\.log" src --include="*.ts" --include="*.tsx"',
    { cwd: APP, encoding: 'utf8' }
  ).trim()
  if (result !== '') {
    console.log(`${WARN}console.log found (remove before production):\n${result}`)
  } else {
    console.log(`${PASS} No console.log`)
  }
} catch {
  console.log(`${PASS} No console.log`)
}

// ── 6. Critical deps ─────────────────────────────────────────────────────
console.log(`\n${INFO}Checking devDependencies...`)
const pkg = JSON.parse(readFileSync(path.join(APP, 'package.json'), 'utf8'))
check('@types/node present', '@types/node' in pkg.devDependencies)
check('typescript present',  'typescript' in pkg.devDependencies)
check('vite present',        'vite' in pkg.devDependencies)

// ── Summary ───────────────────────────────────────────────────────────────
console.log('\n\x1b[35m══════════════════════════════════════════\x1b[0m')
if (failed) {
  console.log('\x1b[31m  ❌ FAILED — fix errors above before pushing\x1b[0m')
  console.log('\x1b[35m══════════════════════════════════════════\x1b[0m\n')
  process.exit(1)
} else {
  console.log('\x1b[32m  ✅ ALL PASSED — safe to push\x1b[0m')
  console.log('\x1b[35m══════════════════════════════════════════\x1b[0m\n')
  process.exit(0)
}
