# tactile-craft

physical edges, a press you can see, and tight alignment. use this for tools, editors, settings, and any surface where someone is operating something.

## tokens

```css
:root {
  --paper: #f3f1ec;
  --ink: #161513;
  --muted: #6b665e;
  --line: #cfcabe;
  --accent: #1f4d3a;
  --text: "IBM Plex Sans", "Avenir Next", "Segoe UI", sans-serif;
  --mono: "IBM Plex Mono", "ui-monospace", monospace;
  --title: 1.25rem;
  --body: 0.875rem;
  --label: 0.75rem;
  --lh: 1.45;
  --pad: 16px;
  --radius: 2px;
}
```

page sections separate by 32px. tool chrome uses 16px padding. a form or a dialog uses 24px. that is the floor. density comes from alignment and type size, not from thinner padding.

## surfaces

- the page is `--paper`. a panel is `#fffdf8`, 1px solid `--line`, radius `--radius`.
- one shadow is allowed, and it is hard: `4px 4px 0 #161513`. it belongs on the topmost popover or a dragged item. every other surface is a border.
- a well inside a panel uses `--paper` and the same 1px line. one well deep, no further.
- a divider is 1px `--line`. it stops at the padding edge, except between full-bleed rows in a list, where it runs the full width.

## type

- ui text is `--text` at `--body`, `--ink`, `--lh`.
- a panel has one title: `--title`, weight 560, `--ink`.
- labels are `--label`, weight 500, `--muted`. uppercase labels stay under 24 characters with letter-spacing `0.04em`.
- code, keys, and ids use `--mono` at `--body`.
- three sizes maximum in one panel.

## interaction

every control has rest, hover, and pressed paint. a control missing one of them is unfinished.

- rest: `#fffdf8` or `--paper`, 1px `--line`.
- hover: the border becomes `--ink`. the control does not scale.
- pressed: `transform: translate(1px, 1px)` over 120ms. a hard shadow on that control shrinks to `3px 3px 0`.
- focus: 2px solid `--accent`, offset 2px. focus paint is separate from hover paint.
- disabled: `--muted` text, `--line` border, no shadow.

keyboard order follows visual order. a menu keeps focus until escape or a choice.

## alignment

- toolbar controls are 32px tall and share one center line. icons are 16px.
- a list row is at least 40px. labels in that row share a baseline.
- numeric columns are right-aligned and tabular.
- sit controls on the 8px grid. the 1px press translate is the only off-grid motion.

## motion

120ms for hover, press, and focus. 200ms for a menu or dialog: opacity plus 8px translate. easing `cubic-bezier(0.2, 0, 0, 1)`. reduced motion snaps. no spring, no bounce.

## banned

- blur, glass, and any `box-shadow` with a blur radius above 0
- radius above `--radius`, including pills on buttons that contain words
- `transform: scale` on hover
- gradients, glow rings, and a second accent
- more than one hard shadow on a screen
- an icon-only button without an accessible name
- a card grid used for settings. settings are rows.
- animation longer than 320ms
