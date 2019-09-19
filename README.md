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

Requirements:
* [Yarn](https://yarnpkg.com/en/docs/getting-started)
* [Squarespace-server](https://developers.squarespace.com/local-development)

You should branch off develop and merge back into develop.

This app uses Webpack + Vue to build most of the functionality. You will need to run `yarn build` to compile all the scripts. You can also run `yarn prettier` to run the Javascript prettier.

To run the Squarespace template locally:
 ```
 squarespace-server https://site-name.squarespace.com
 ``` 

If the site is password protected, append `--auth` to the above command.

### Deploying to Staging

If this is your first time deploying to staging, you will need to add the instance to your Git remotes:

    git remote add staging https://amethyst-okra-dblc.squarespace.com/template.git

When you are ready to deploy to staging:

    # you will get merge conflicts on scripts/bundle.js
    git merge develop

    # overwrites scripts/bundle.js with the release version
    yarn release

    git add scripts/bundle.js
    git commit -a
    git push staging staging:master

This will update the staging Squarespace. You have to push to the remote master branch because Squarespace will only use whatever templates are in master.

### Deploying to production

When you are ready to deploy to master, merge staging into master and run:

    git push origin head

This will update the production Squarespace.

## Hair Colors

A hair style can have a color option type, which lets you create variants based on hair color. But option types can't have images associated with them. Project Curl gets around this by maintaining a list of hair color images in the Squarespace repo, underneath `assets/hair-colors`. 

You can add additional colors by adding a new Option Value underneath the Hair Color Option Type. Then you must add a corresponding image underneath `assets/hair-colors`, named the exact same string as the presentation field of the option value, with all non-alphabet characters replaced with underscores. So for example, "Honey Brown w/5 Highlights" becomes "Honey_Brown_w___Highlights.jpeg".

## How it Works Images

These are stored on Amazon S3 in the `projectcurl-assets` bucket. They are named: Step1.jpeg, Step2.jpeg, Step3.jpeg, Step4.jpeg and Step5.jpeg, with each image corresponding to each step.
