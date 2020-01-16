## Desire

We want to do acceptance testing.

## Problem

Squarespace doesn't support staging versions.

## Solution

Maintain a separate staging branch in Git and push that to a separate Squarespace site that represents our staging instance.

## Implementation

The Squarespace Git repository has one main branch:

- master: Represents the code that will be deployed to the production Squarespace

### Development

Requirements:
* [Yarn](https://yarnpkg.com/en/docs/getting-started)
* [Squarespace-server](https://developers.squarespace.com/local-development)

You should branch off master and merge back into master.

This app uses Webpack + Vue to build most of the functionality. You will need to run `yarn build` to compile all the scripts. You can also run `yarn prettier` to run the Javascript prettier.

To run the Squarespace template locally:
 ```
 squarespace-server https://amethyst-okra-dblc.squarespace.com/template.git
 ```

If the site is password protected (see site settings for that particular squarespace), append `--auth` to the above command.

### Authentication

In order to access the Squarespace Git repository, you will need to obtain an app secret. This is accessible here:

https://account.squarespace.com/settings/security

Under App Passwords. You will use this to authenticate your Git requests.

### Deploying to Staging

If this is your first time deploying to staging, you will need to add the instance to your Git remotes:

    git remote add staging https://amethyst-okra-dblc.squarespace.com/template.git

When you are ready to deploy to staging:

    # you may get merge conflicts on scripts/bundle.js
    git merge feature/my-feature-branch

    # overwrites scripts/bundle.js with the release version
    yarn release

    git add scripts/bundle.js
    git commit -a
    git push staging master

This will update the staging Squarespace.

### Deploying to production

If this is your first time deploying to production, you will need to add the instance to your Git remotes:

    git remote add production https://blue-scarlet-dba3.squarespace.com/template.git

When you are ready to deploy to master, run:

    git push production master

This will update the production Squarespace.

This workflow means that master may not contain the code currently deployed to production.

### Deployment issues

Sometimes pushing to Squarespace doesn't show the update. A follow-on 'fake' commit might be needed to force an update.

## Hair Color Images

Hair color images are stored on Amazon S3 in the `projectcurl-assets` bucket in the `HairColors` folder. They should have the same name as the presentation field for the option type in Spree. One caveat is that if the color is named something like "X w/ Y" then you should upload it named as "X with Y". This is because S3 doesn't support slashes in file names.

You can add additional colors by adding a new Option Value underneath the Hair Color Option Type. Then you must add a corresponding image underneath `assets/hair-colors`, named the exact same string as the presentation field of the option value.

## How it Works Images

These are stored on Amazon S3 in the `projectcurl-assets` bucket in the `HowItWorks` folder. They are named: Step1.jpeg, Step2.jpeg, Step3.jpeg, Step4.jpeg and Step5.jpeg, with each image corresponding to each step.

## Confirmation Screen Hero Image

This is stored on Amazon S3 in the `projectcurl-assets` bucket in the `Confirmation` folder.

## Landing images + info

This is stored on Amazon S3 in the `projectcurl-assets` bucket in the `LandingPage` folder.

### Main hero

This image has 2 versions
hero.png and hero-large.png

### Our Services

This section has a hero and an example picture for each type of service

Hero: our-services-hero.png
Crochet Braids: crochet.png
Silk Press: silk-press.png
Cornrows: cornrows.png
Box Braids & Twists: box-braids.png
Weave Installs: weave-installs.png

### Our Stylists

The text in this section can be edited. For editing/adding/deleting go to the heroku app at `/admin/stylists` (you can also go to `/admin/pages` to see a list of custom admin pages)

Images in this section should be uploaded somewhere and then linked in the admin section.

### Naza Experience

This sections hero images are:
the-playground-hero.png, elevated-design.png, and lets-cheers.png

## Adding Fonts to Squarespace

Squarespace allows you to upload OTF font files for use on the site. Presently, this is the best way to use custom fonts in the booking app.

For staging you can go here:

https://amethyst-okra-dblc.squarespace.com/config/design/custom-css

If you haven't already, click the "Manage Custom Files" button and upload your font.

You can then define a new `@font-face` CSS rule using your font. If you click on the font name, the CDN path to your font will be inserted into the text box.
