# Milleus.github.io
Milleus.github.io, gitpages website.

## How to use Github pages?
1. Change the repository’s name to `username.github.io`, replacing username with Github username.
2. Change website's name, description, avatar and other options by modifying `_config.yml` file.
3. Create blog posts by adding files into the `_posts` folder with `2017-12-31-Hello-World.md` format.
4. Add `_/site` into `.gitignore` file as it will be build by jekyll on Github pages, no need to commit own site folder.

## How to run locally?
1. Install Ruby and Ruby Gem.
2. Install Github pages with `gem install github-pages`.
3. Go to folder in terminal and run command `jekyll serve --watch`.
4. View website at `http://127.0.0.1:4000`.