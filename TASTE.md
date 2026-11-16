# taste

laws for ui, ux, and architecture. a skill that tells an agent to "make it look modern" has already failed. these are the checks. a palate in `palates/` may tighten them. it may not loosen them.

## space

use an 8pt scale and nothing else: 8, 16, 24, 32, 48, 64. 4px is allowed only as an optical nudge (icon alignment, a hairline sitting next to type). it is not padding between regions.

- page sections: 48px between them on desktop, 32px on viewports under 720px.
- primary containers (page, card, dialog, form): at least 24px padding. 32px when the container is a page section.
- related controls inside a cluster: 8px. separate clusters: 16px or 24px.
- one card holds at most three type sizes and at most three visual weights. a weight is a size step, a color step, or a border treatment. count them.
- prose measure: 60–72ch. labels and buttons: under 40ch.
- touch targets: 40px minimum on viewports under 720px. the hit area can be larger than the glyph.

## type

pick a display face and a text face, or one face with a written scale of exactly three sizes for a screen: title, body, label.

- body is one size, one line-height, one color. do not mix 14 and 15 in the same screen.
- a screen set entirely in inter at one size fails, even if the font is already in the project. hierarchy comes from the scale above, or it is missing.
- headings are sentence case. uppercase is for labels under 24 characters, with letter-spacing of at least 0.04em.
- numbers in a column use tabular figures when the face has them.
- do not justify text.

## color

name five tokens at most for a screen: paper, ink, muted, line, accent. write the hex values down in the palette you are following.

- body text against paper: 7:1 or better. muted text: 4.5:1 or better.
- the accent appears on links, the current selection, and focus. it does not fill large surfaces.
- fills are flat. no gradient on a page, card, button, or text.
- no `backdrop-filter` used as decoration. a scrim over a dialog may be a flat ink at 40–60% opacity.
- shadows, if the palate allows one, are a single layer. no stacked glows.

## motion

- hover and focus: 120–200ms.
- a panel entering or leaving: 200–320ms.
- animate `opacity` and `transform` only.
- easing is `cubic-bezier(0.2, 0, 0, 1)`. no bounce, no elastic, no overshoot.
- no looping animation on content that is trying to be read.
- under `prefers-reduced-motion: reduce`, snap to the end state. do not animate.

## alignment and icons

- columns share one left edge. a ragged inset of 12px next to 16px is a defect.
- an icon beside a label shares the label's center line. if the glyph looks high, nudge it. do not add a wrapper to "fix" it.
- icons are 16 or 20px, one stroke weight per screen.
- an icon-only control is allowed when the palate is a dense tool and the control has an accessible name. product pages get words.
- focus is visible on every interactive element: 2px outline, 2px offset, accent color. do not remove outline without replacing it.

## states

empty, loading, and error use the same container, padding, and type as the filled state.

- empty: one sentence that says what belongs here, plus the action that fills it, if the user can take one.
- loading: reserve the filled layout. do not swap a tall skeleton for a short result and shift the page.
- error: what happened, and the next action. the words "something went wrong" alone fail the check.
- disabled controls still show their label. they do not disappear.

## copy

- sentence case.
- buttons are verbs: "save changes", "delete project". "ok" and "submit" fail when a specific verb exists.
- no exclamation marks. no "oops", "uh oh", or "welcome to your dashboard".
- no lorem ipsum, no placeholder names left in the ui, no "click here".
- errors name the field or the resource.

## architecture

- name things with the domain words already in the repo. read them before inventing a parallel vocabulary.
- one module, one reason to change. a file that mixes http, sql, and email gets split along those seams.
- no abstraction for a single caller. inline it. the second caller is what earns a function.
- no new dependency when the language, the standard library, or a package already in the manifest can do the job.
- boundary errors are objects: `{ code, message }`. `code` is a stable string. `message` is for a human. do not throw bare strings. do not catch and continue.
- a file past ~200 lines is split by domain. do not create `utils`, `helpers`, or `common` as a drawer for leftovers.
- delete unused exports, props, styles, and branches in the same change that orphans them.
- preferred control flow is readable top to bottom. a factory, a class hierarchy, or an event bus needs a concrete reason written in the prep note.

## verification

- `tsc`, a build, and a green test suite do not prove taste. they prove the program runs.
- ui work is judged from screenshots of the running screen at 1280px wide and 390px wide.
- every change is read as a diff, line by line, after the code is written.
- the agent names the defaults it removed. a summary that only lists new files has not been tasted.

## banned

these fail the check on sight:

- a purple, blue, or rainbow gradient, a mesh, or a glow behind a hero
- glass cards and blur-as-depth
- three identical feature cards in a row
- a centered hero, a gray subhead, and two buttons, sitting on a decorative blob
- `border-radius` above 8px on every rectangle, or pills on everything
- a 40px blurred drop shadow used as a personality
- emoji used as icons
- inter, at one size, as the whole voice of a screen
- cramped padding under 16px inside a primary container
- an orphan icon with no accessible name
- "welcome to your dashboard" and any copy that could ship on a template
- `console.log`, `debugger`, commented-out blocks, and a `TODO` with no owner
- a wrapper, manager, factory, or context whose only job is to call one function
- an empty `catch`, or a `catch` that logs and continues
