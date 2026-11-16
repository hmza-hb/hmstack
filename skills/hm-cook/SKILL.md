---
name: hm-cook
description: >-
  Implements the prep plan under TASTE.md and the active palate, with
  concrete ui, server, and copy checks. Use for /hm-cook, the third
  phase of /hm-mode, or when writing the code for a tasted change.
disable-model-invocation: true
---

# hm-cook

write the plan. nothing beside the plan. if a file is missing from the prep tree, add it to that tree in one line, then create it.

read `TASTE.md` and the active `palates/<name>.md` before the first edit. repo patterns from mise beat a palate token when both style the same element. the palate fills gaps. it does not repaint the product.

## ui

- spacing values are 8, 16, 24, 32, 48, or 64. 4px only to nudge an icon onto a label's center line.
- a page section, card, dialog, or form has at least 24px padding. a page section has 32px.
- one card: at most three type sizes and three visual weights.
- use the palate's tokens. do not add a color, a radius, or a shadow the palate does not list.
- body text meets 7:1 on its paper. muted text meets 4.5:1.
- hover, pressed, and focus are three different paints. focus is a 2px accent outline with 2px offset.
- transitions are 120–200ms on `opacity` or `transform`, easing `cubic-bezier(0.2, 0, 0, 1)`. `prefers-reduced-motion` snaps.
- empty, loading, and error use the same container as the filled state.
- an icon is 16 or 20px. if it is the only content of a control, the control has an accessible name.

## server

- flat functions, domain names from the repo, inputs as arguments.
- boundary failures are `{ code, message }`. `code` is a stable lowercase string.
- validate at the boundary. do not re-check the same field deeper in.
- no new dependency past what prep listed.
- no `utils` drawer, no single-caller service class, no empty `catch`.

## copy

sentence case. buttons are verbs. errors name the resource and the next action. no exclamation marks, no "oops", no "something went wrong" as the whole message.

## while editing

match the surrounding file's format. leave unrelated lines alone. no `console.log`, no commented-out code, no `TODO` without an owner. delete an export your edit orphaned.

when the tree matches the plan, stop. taste is the next phase. do not declare the work done from a compiler.
