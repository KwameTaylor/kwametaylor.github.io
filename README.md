# kwametaylor.github.io

Personal site for Kwame V. Taylor, PMP. Live at https://kwametaylor.github.io.

Plain HTML, CSS and JavaScript. There is no build step: edit a file, commit, push, and GitHub Pages serves it.

## Repo structure

| File | Content |
|---|---|
| `assets/js/content.js` | Services, projects, design pieces, organizations, the rotating phrases, the portrait path and the contact form address. Most edits happen here. |
| `index.html` | Home page: the name, tagline and the desktop windows. Each window is a `<section class="win">`; its position is the `--x`, `--y` and `--w` values on it. |
| `about.html` | About text, work history and training, written directly in the page. |
| `services.html`, `projects.html`, `design.html`, `contact.html` | Page frames. Their lists are filled from `content.js`. |
| `404.html` | Shown for addresses that do not exist. |
| `assets/css/site.css` | All styles. Colors and the typeface are the variables at the top. |
| `assets/js/site.js` | Behavior: dragging windows, arrow keys, the theme switch, the form. |
| `assets/img/` | Images. |

## Common edits

All of these are in `assets/js/content.js`. Each list is a set of `{ ... }` entries separated by commas. Copy an existing entry, paste it where you want it to appear, and change the text.

**Add a project.** Add an entry to `projects`:

```js
{ name: "Project name", status: "In progress", year: "2026", stack: "Python",
  text: "One or two sentences.", link: "https://github.com/...", image: "assets/img/project.png" },
```

Only `name` and `text` are required. Without `link` the page says a link is coming. Without `image` it shows a drawn stand-in.

**Add a design piece.** Put the image in `assets/img/`, then add an entry to `design`:

```js
{ title: "Client or piece name", type: "Logos", shape: "square", image: "assets/img/piece.jpg" },
```

`type` is the filter the piece appears under; a new type creates a new filter button. `shape` is `square`, `wide` or `tall`. Entries without `image` show a glyph as a stand-in.

**Add an organization.** Add an entry to `champions`:

```js
{ name: "Organization name", url: "https://example.org/" },
```

**Add or change a service.** Edit `services`. `includes` is the short list shown when the service is opened.

**Change the rotating phrase.** Edit `phrases`.

**Add the portrait.** Put the photo in `assets/img/` and set `portrait: "assets/img/portrait.jpg"`. It appears on the home and About pages. A 4:5 crop at about 1000 by 1250 pixels works well.

**Pick the four home-page services.** Edit `homeServices` with the exact names from `services`, in order. If a name doesn't match, the first four services show instead.

**Change the swatch colors.** Edit `var colors` in `assets/js/site.js`. Each entry is `["#hexcode", "Name"]`.

**Change the portrait.** Replace `assets/img/portrait.jpg` with a new photo of the same name, with location data removed. Then change the `?v=` code.

**Add a terminal answer.** Add an entry to `facts`. When a visitor's question contains any of the `keys`, the terminal prints `a`:

```js
{ keys: ["hobby", "weekend"], a: "Kwame draws and bakes." },
```

**Add a terminal hint.** Edit `tips` (lines like "Try: fig") or `secrets` (what `cat .secrets` lists).

**Add a terminal command.** New commands are code, in `assets/js/site.js`. Search for `if (v === "exit"` and add a line above it:

```js
if (v === "hello") { say("Hi there."); return true; }
```

`v` is what the visitor typed, in lowercase. Put `\n` in the text for a line break.

### Every terminal command

Built in: `help`, `ls`, `ls -a`, `clear`, `cat .secrets` (also `less`, `more`, `head`, `tail`, `bat`), `open` plus a page name (`open contact`), `nano`, `vim`, `exit`, `quit`. Any question that matches a `facts` key also works.

Hidden: `fig` (or `figure`), `rickroll`, `draw`, `save`, `kern`, `comic sans` (then `y` or `n`; `serif` undoes it), `coffee` (also `brew`, `make coffee`), `check email`, `rm -rf /`, `sudo hire kwame`, `xyzzy`, `fizzbuzz`, `motherlode`, `rosebud`, `kaching`, `dysentery`, `oregon trail`, `ford the river`, `caulk the wagon`, `its time to duel`, `trogdor` (or `burninate`), `homestar`, `homsar`, `strong bad`, `sbemail`, `the cheat`, `fhqwhgads`, `everybody everybody`, `consummate v`, `afrofuturism`, `sun ra`, `octavia`, `parable`.

Not typed: the Konami code (up up down down left right left right B A) anywhere on the page.

## Contact form

GitHub Pages cannot receive form submissions, so the form posts to a form service. [Formspree](https://formspree.io) has a free tier and is what the form is written for.

1. Create a Formspree account with the address messages should go to.
2. Create a form. Formspree gives it an address like `https://formspree.io/f/abcdwxyz`.
3. Paste that address into `formEndpoint` in `assets/js/content.js`.
4. Send a test message from the live site and confirm it arrives.

The form address is safe to publish. It does not reveal the email address behind it. The form includes a hidden field that catches most automated spam.

## Before committing

This repository is public, including its history.

- Do not put an email address, phone number or home address anywhere in it.
- Do not commit keys, tokens or passwords.
- Remove location and device data from photos before adding them. On most phones, sharing a photo with location turned off does this; `exiftool -all= photo.jpg` does it on a computer.

## Light and dark

The site follows the visitor's device setting and has a switch in the menu bar. Both sets of colors are at the top of `assets/css/site.css`.

## Previewing locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit `http://localhost:8000`.

## After an update

Each page loads its stylesheet and scripts with `?v=` and a short code on the end, for example `assets/css/site.css?v=f5453ee`. Browsers cache files by their full address, so changing that code makes every visitor fetch the new version instead of an old copy. After editing `site.css`, `site.js` or `content.js`, change the code on all the pages to anything new (the latest commit's short ID is a good choice).
