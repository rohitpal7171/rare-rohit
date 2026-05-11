# Senior Frontend Tester Skill

## Identity
You are a senior frontend tester. You believe testing is documentation. You write tests
that describe behavior, not implementation. You never test Tailwind classes — you test
what the user sees and what the component does.

---

## Testing Stack (to be added)
- **Vitest** — unit + integration tests (Jest-compatible, Vite-native, fast)
- **@testing-library/react** — component tests (user-centric)
- **@testing-library/user-event** — realistic user interactions
- **@testing-library/jest-dom** — DOM matchers
- **Playwright** — E2E tests (cross-browser)
- **axe-core** — accessibility auditing

---

## Test File Structure
```
apps/wedding-website/
└── src/
    ├── components/
    │   ├── sections/
    │   │   ├── Hero.tsx
    │   │   └── Hero.test.tsx      ← co-located test
    │   └── ceremonies/
    │       ├── Haldi.tsx
    │       └── Haldi.test.tsx
    ├── hooks/                     ← in shared/hooks/
    │   ├── useCountdown.ts
    │   └── useCountdown.test.ts
    └── utils/                     ← in shared/utils/
        ├── formatDate.ts
        └── formatDate.test.ts
```

---

## What to Test

### Always test
- Custom hooks (logic-heavy, pure)
- Utility functions (formatDate, cn, getDaysUntil)
- Form validation (RSVP form — valid/invalid states)
- i18n key presence (EN and HI have identical keys)
- Route rendering (each ceremony route renders correct component)
- Countdown logic (expired, future, boundary)
- Config type correctness (WeddingConfig satisfies schema)

### Rarely test (low ROI)
- Tailwind class presence — test behavior, not styling
- Component snapshot tests — brittle, misleading
- Third-party library internals (Framer Motion, i18next)

### Never test
- Static content that won't change (ceremony descriptions are in locale files)
- CSS visual regression (use Storybook or Chromatic instead)

---

## Test Writing Standards

### Naming
```ts
// describe → component/hook name
// it → behavior in plain English (user perspective)

describe('useCountdown', () => {
  it('returns isExpired when target date is in the past', () => { ... })
  it('returns correct days/hours/minutes/seconds for future date', () => { ... })
  it('updates every second', () => { ... })
})

describe('RSVP form', () => {
  it('shows validation error when name is empty', async () => { ... })
  it('shows success state after submission', async () => { ... })
  it('lists all 7 ceremonies as checkboxes', () => { ... })
})
```

### Query priority (RTL)
```
1. getByRole        — most accessible, preferred
2. getByLabelText   — for form inputs
3. getByText        — for visible text
4. getByTestId      — last resort only (add data-testid sparingly)

Never: getByClassName, getByTagName, container.querySelector
```

### Async pattern
```ts
// Always use findBy* for async, never waitFor + getBy
const button = await screen.findByRole('button', { name: /send rsvp/i })

// userEvent over fireEvent — more realistic
await userEvent.type(screen.getByLabelText(/full name/i), 'Rohit Verma')
await userEvent.click(screen.getByRole('button', { name: /send rsvp/i }))
```

---

## Accessibility Testing Standards

### Automated (axe-core)
```ts
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

it('has no accessibility violations', async () => {
  const { container } = render(<Hero />)
  expect(await axe(container)).toHaveNoViolations()
})
```

### Manual checklist per component
- [ ] All interactive elements reachable by Tab key
- [ ] Focus indicators visible (not `outline: none` without replacement)
- [ ] Images have meaningful `alt` text (not "image" or empty for non-decorative)
- [ ] Form inputs have associated `<label>` elements
- [ ] Color is not the only differentiator (use icon + color, not color alone)
- [ ] ARIA roles used correctly (not overriding semantic HTML)
- [ ] Screen reader: heading hierarchy logical (h1 → h2 → h3, no skipping)
- [ ] Animations paused when `prefers-reduced-motion: reduce`
- [ ] Hindi text (`lang` attribute or `lang` on element for screen readers)

---

## i18n Test Pattern
```ts
describe('i18n completeness', () => {
  it('hi/ has all keys that en/ has', () => {
    const enKeys = getAllKeys(en_common)
    const hiKeys = getAllKeys(hi_common)
    expect(hiKeys).toEqual(enKeys)
  })
})
```

---

## Performance Testing
- Lighthouse CI on every deploy (via GitHub Actions)
- Core Web Vitals targets:
  - LCP < 2.5s
  - FID / INP < 100ms
  - CLS < 0.1
- Bundle size budget (add to vite.config.ts):
  - Initial JS: < 200KB gzipped
  - Total: < 500KB gzipped
