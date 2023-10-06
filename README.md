# Awesome neovim - Fontend

This project is a "viewer" of the [rockerBOO/awesome-neovim](https://github.com/rockerBOO/awesome-neovim) repository

## Motivation.

I use neovim as my primary code editor and I time to time look for new plugins in the rockerBOO/awesome-neovim repo,
but when I see a plugin that catches my attention I have to open it up in a new tab to see if it is archived, when was it
updated (has maintainers), and the number of stars (popularity).

So I created this web app to see all of that at once, in one place.

## How to run it.

First of all install the dependencies:
```bash
pnpm install
```

This app gets all the data from the readme through the scripts/get-data.js script, it pulls the readme, get all the
plugin entries, and it organize them in a tree structure (the repo has sections and sub-sections), then it pull the
data for each repository and store all the data in src/data.json file.

To run scripts/get-data.js you need to provide a github-token to get data from the github-api (it doesn't need to have
any permissions), the token is extracted from the scripts/gh-token.secret file, replace the file content with your token.

Run the scripts/get-data.js with:
```bash
node scripts/get-data.js
```

When it is done, run the app with:
```bash
pnpm dev
```
