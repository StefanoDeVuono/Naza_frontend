#!/bin/sh

git checkout staging
git merge develop
yarn release
git add -add
git commit -a
