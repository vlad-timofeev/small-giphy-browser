# Small Giphy Browser

## Demo

[https://vlad-timofeev.github.io/small-giphy-browser-demo/]

## Starting point

### Node and npm

Install and use the latest `lts` node (`nvm` is demonstrated here).

`nvm install --lts`

`nvm use --tls`

At the moment of writing it was:

`Node v12.16.1 (npm v6.13.4)`

### Bootstrapping

The app was bootstrapped with the help of `create-react-app` in the following
way:

`npx create-react-app small-giphy-browser --use-npm --template redux`

`--use-npm`

was used to force `npm` instead of `yarn`, because `npm` is already installed
on the previous steps.

`--template redux`

did install Redux dependencies at the same time, including `reduxjs/toolkit`
which makes working with Redux easier.

More info about `cra-template-redux`
[here](https://github.com/reduxjs/cra-template-redux/releases/tag/v1.0.0)

### Other dependencies

On top of that just 2 libs were added:

`prettier` (devDependencies) -

For consistent and automatic code formatting. The configuration was borrowed
from Signal Desktop app repository.

`react-intersection-observer` (dependencies) -

For lazy image loading and determining at what point to fetch more items.
Relies on *Intersection Observer API*.

## Running the application locally

1. Ensure that `node` and `npm` are available.

2. Install the dependencies with `npm install`

3. `export REACT_APP_API_KEY=<your giphy api key>`

4. (Optional) `export BROWSER=none` to avoid auto-opening of your browser

5. `npm run start` will start the development version.

## Tradeoffs, design desitions, incomplete tasks

The priorities were set to:

* Completely implement the basic browsing functionality such as search and
  infinite scrolling
* Minimize usage of external libraries
* Deliver well-written, concise, and maintainable code
* UX (performance, consistent loading, caching results between searches)

Things that were not covered:

* Test coverage
* Handling exceptional situations while interacting with Giphy API e.g.
  response JSON validation, and error notifications
* Props checks
* Attractive design
