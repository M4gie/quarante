# <div align="center"><img src="https://i.ibb.co/wgFmzBH/Webp-net-resizeimage.png"/><p>Quarante</p></div>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
![release](https://badgen.net/github/tag/M4gie/quarante)

# Introduction

Quarante is a blind test project (currently in French only). This project provides an online blind test with differents categories such as Youtube. Sounds are uploaded by the community and approved by staff members. Quarante is available on [web](https://quarante.m4gie.com), ios and android (soon 😉). You can join us on **[discord](https://discord.gg/xgcbjXU)**

# Run in local

- Run `yarn install` in the root folder
- Create a postgreSQL database
- Create the API env file `mv packages/api/.env.example packages/api/.env`
- Fill the API env file
- Create the server env file `mv packages/server/.env.example packages/server/.env`
- Fill the server env file
- Start the API with `yarn api dev`
- Start the server with `yarn server dev`
- Start the client with `yarn client web`

# How to contribute

If you want to contribute to an issue, just create a fork, run the project in local, make your changes, commit your changes with the commitizen rules (use `git commit` or `yarn commit`), then you can create a pull request !
