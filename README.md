# AREDN Angular UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5. It is designed to serve as a new / alternative frontend for the AREDN project.

## Requirements to run locally

1) NodeJS (10+ is preferable)
2) An accessible AREDN node for API requests.

## First setup

After installing NodeJS and cloning this repository run the command.

`> npm install`

You can get then follow the instructions below.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The code expects an AREDN node to be running at http://localnode.local.mesh:8080, as defined in the proxy.conf.json file at the root of the project.  To use this file to develop/test remotely, run `ng serve --proxy-config proxy.conf.json`.
This allows the front-end project to make API requests to the localnode (or other node specified in proxy.conf.json) as if the frontend were actually running on the node itself.  The node must be running an AREDN nightly build at version 637 or higher.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests  TODO: Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests TODO: End To End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
