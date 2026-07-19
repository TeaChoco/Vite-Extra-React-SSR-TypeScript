---
name: coding-convention
description: >
    Apply the user's personal coding conventions to any file or project.
    Trigger when the user says "rrr" (apply to specific files mentioned) or "rra" (apply to all files in the project).
    Also trigger when the user asks to "fix formatting", "apply convention", or "clean up code style".
---

# Coding Convention

Apply these rules to every file created or modified.

---

## Shorthand Commands

| Command | Meaning                                                          |
| ------- | ---------------------------------------------------------------- |
| `rrr`   | Apply conventions to files mentioned earlier in the conversation |
| `rra`   | Apply conventions to every file in the project                   |

---

## Rules

### 1. Path Comment (first line of every file)

Every file that supports comments must have a path comment as the very first line.
Format: `// -Path: 'ProjectName/path/to/file.ext'`
**Exception**: `.json` files (JSON does not support comments)

```ts
// -Path: 'MyProject/src/components/Button.tsx'
```

```css
/* -Path: 'MyProject/src/app/globals.css' */
```

```python
# -Path: 'MyProject/utils/helper.py'
```

---

### 2. Import Order

Sort each import line by **character length, ascending**.
If two lines are the same length, sort alphabetically.

```ts
// ✅ correct
import { use } from "react";
import { Link } from "$/i18n/routing";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

// ❌ wrong
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
```

---

### 3. Variable Declaration Order

Sort variable declarations by **character length, ascending**.
**Exception**: if a variable depends on another (must be declared first), keep the dependency order and note it with a comment.

```ts
// ✅ correct
const id = params.id;
const locale = useLocale();
const pathname = usePathname();
const translations = useTranslations("home");

// dependency exception — router must come first because handleChange uses it
const router = useRouter();
const handleChange = () => router.push("/");
```

---

### 4. React Components

Use **function components only**. Never use class components.

```tsx
// ✅ correct
export function Button({ label }: ButtonProps) {
  return <button>{label}</button>;
}

// ❌ wrong
export class Button extends React.Component { ... }
```

---

### 5. Brace-less Single-line Statements

Omit `{}` for `if/else` branches and arrow functions that fit on one line.

```ts
// ✅ correct
if (isLoading) return null;
const double = (value: number) => value * 2;

// ❌ wrong
if (isLoading) {
    return null;
}
const double = (value: number) => {
    return value * 2;
};
```

---

### 6. JSDoc Comments

Always use **JSDoc** instead of plain comments wherever the file supports comments.
Do not add any comments to files that do not support them (e.g. `.json`).

```ts
// ✅ correct
/**
 * Calculates the total price after discount.
 * @param price - item price
 * @param discount - discount percentage (0–100)
 */
function calculateTotal(price: number, discount: number): number {
  return price * (1 - discount / 100);
}

// ❌ wrong
// calculate total price
function calculateTotal(price: number, discount: number): number { ... }
```

---

### 7. No Single-letter Variable Names

Never use single-letter or meaningless abbreviations.

| ❌ avoid | ✅ use instead         |
| -------- | ---------------------- |
| `e`      | `event`                |
| `c`      | `color` / `clr`        |
| `b`      | `box`                  |
| `k`      | `key`                  |
| `i`      | `index`                |
| `v`      | `value`                |
| `fn`     | `callback` / `handler` |

```ts
// ✅ correct
items.forEach((item, index) => console.log(index, item));
input.addEventListener("change", (event) => handleChange(event));

// ❌ wrong
items.forEach((i, k) => console.log(k, i));
input.addEventListener("change", (e) => handleChange(e));
```

---

### 8. Package Manager

Use **pnpm only**. Never suggest or use `npm`, `yarn`, or `bun`.

```bash
# ✅ correct
pnpm add zod
pnpm install

# ❌ wrong
npm install zod
yarn add zod
```

---

## Pre-output Checklist

- [ ] First line is a path comment (unless `.json`)
- [ ] Imports sorted by length ascending
- [ ] Variables sorted by length ascending (dependency exceptions noted)
- [ ] React uses function components only
- [ ] Single-line if/arrow has no braces
- [ ] Comments are JSDoc
- [ ] No single-letter variable names
- [ ] Package manager is pnpm
