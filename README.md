# Freakquency

A GitHub Pages-friendly one-phone Freak or Drink card game.

## Features

- Pass-the-phone / one-device gameplay
- Multiple player profiles
- Gender selection
- Flirt/contact opt-in per player
- 4 card levels:
  - L1 Icebreaker: light blue
  - L2 Spicy: red with chilli pepper
  - L3 Freaky: pink with lip-bite emoji
  - L4 OMG: black with pink writing
- Never Have I Ever and Would You Rather cards
- Safety toggles for contact/targeted cards
- Local browser storage for players

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `app.js`, and this `README.md` to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/root` folder.
6. Save. GitHub will give you a live link.

## Important limitation

This version works fully on one phone or one shared screen. For true separate-phone online rooms, GitHub Pages needs an external real-time backend like Firebase, Supabase, or Socket.io on a server.

## Editing cards

Open `app.js` and edit the `cards` array. Each card looks like this:

```js
{ level: 2, type: 'Spicy', icon: '🌶️', tags: ['target','flirt'], text: '{player}, pick someone and give them your smoothest one-line flirt.' }
```

Useful tags:

- `target`: the card picks another player
- `flirt`: only appears for players who opted into flirt cards
- `contact`: only appears when contact cards are enabled and both players opted in
