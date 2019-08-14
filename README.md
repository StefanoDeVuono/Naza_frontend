## Desire

We want to do acceptance testing.

## Problem

Squarespace doesn't support staging versions.

## Solution

Maintain a separate staging branch in Git and push that to a separate Squarespace site that represents our staging instance.

## Implementation

The Squarespace Git repository has three main branches:

- master: Represents the code that will be deployed to the production Squarespace
- staging: Represents the code that will be deployed to the staging Squarespace
- develop: Represents code suitable for local development

### Development

You should branch off develop and merge back into develop.

This app uses Webpack + Vue to build most of the functionality. You will need to run `yarn build` to compile all the scripts. You can also run `yarn prettier` to run the Javascript prettier.

### Deploying to Staging

The staging branch should be identical to the develop branch with one major difference: it should point to the staging instance of the projectcurl Heroku app and not the local one.

If this is your first time deploying to staging, you will need to add the instance to your Git remotes:

git remote add staging https://amethyst-okra-dblc.squarespace.com/template.git

When you are ready to deploy to staging, merge develop into staging and run:

git push staging staging:master

This will update the staging Squarespace. You have to push to the remote master branch because Squarespace will only use whatever templates are in master.

### Deploying to production

When you are ready to deploy to master, merge staging into master and run:

git push orign head

This will update the production Squarespace.

### When Things Break

You can always reset the develop and staging branches if things go awry, but you need to remember to update the reference to the Heroku app. The file you need to change is:

src/constants.js

Make sure `SPREE_SERVER` points to the correct server based on whatever branch you're in.
