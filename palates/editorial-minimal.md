# editorial-minimal

quiet paper, a real type hierarchy, and room to read. use this for marketing pages, docs, essays, and product surfaces where the words are the work.

tokens are css custom properties. put them on `:root` and use the names. do not invent a sixth color.

## tokens

```css
:root {
  --paper: #f6f4ef;
  --ink: #1a1916;
  --muted: #5e5a53;
  --line: #e2ddd4;
  --accent: #9a3412;
  --display: "Newsreader", "Iowan Old Style", "Palatino Linotype", palatino, serif;
  --text: "Geist", "Avenir Next", "Segoe UI", sans-serif;
  --title: 2.5rem;
  --body: 1.0625rem;
  --label: 0.8125rem;
  --lh-title: 1.15;
  --lh-body: 1.6;
  --measure: 68ch;
  --page: 48px;
  --card: 32px;
}
```

on viewports under 720px, `--title` is `2rem` and `--page` is `16px`. `--card` stays 32px on section containers and may drop to 24px on a compact card. both sit on the 8pt scale: 8, 16, 24, 32, 48, 64.

## type

- titles use `--display`, `--title`, weight 450 or 500, `--lh-title`, `--ink`.
- body uses `--text`, `--body`, weight 400, `--lh-body`, `--ink`. measure is `--measure`.
- labels use `--text`, `--label`, weight 500, `--muted`. uppercase only under 24 characters, letter-spacing `0.06em`.
- links are `--accent`, underlined, underline-offset 3px. hover keeps the underline and moves the color to `--ink`.
- one screen, three sizes. a pull quote may use `--display` at `--body` size. that is the only extra voice, and it still counts as one of the three sizes if it sits inside a card.

## layout

- page background is `--paper`. text is `--ink`. the page margin is `--page`.
- sections stack with 48px between them, 32px under 720px.
- a card, when one is actually needed, has padding `--card`, a 1px `--line` border, radius 2px, and no shadow. the default is a column of type on paper, not a card.
- a split is 12 columns. text takes 7. the other 5 stays empty or holds one figure. do not fill it with a decoration.
- figures share the text's left edge, or they span the measure. no floating circles.

## motion

hover and focus change color or underline opacity over 160ms, `cubic-bezier(0.2, 0, 0, 1)`. a disclosure opens with opacity and 8px of translate, 200ms. reduced motion snaps to the end state.

focus is 2px solid `--accent`, offset 2px.

## components

- primary button: `--ink` fill, `--paper` text, padding `8px 16px`, and `min-height: 40px` under 720px so the hit area clears the touch floor. secondary: transparent, 1px `--ink` border, same padding and height. one primary per view.
- a nav is one row. wordmark on the left edge, links on the right, 16px gap. no hamburger at 720px or above when the links fit.
- a list is a list. markers are `--muted`. check icons replace bullets only when the line is a completed step.

## banned

- gradients, meshes, glows, and blur
- three equal cards with an icon, a heading, and two gray lines
- a centered hero with two buttons
- inter as the display face
- radius above 2px
- drop shadows
- stock illustrations and emoji
- a second accent
- full-bleed color bands added for "rhythm"
