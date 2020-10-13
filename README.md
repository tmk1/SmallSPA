# My comments
1) Dates are displayed with the year part on purpose. There is only one October date in the provided JSON, but from a previous year. Without year info, sorting may look like not working properly.
2) I have chosen to display EUR currency everywhere to be consistent with JSON data.
3) JSON data lack documentation and are messy - more in the code comments.
4) RWD - layout is responsive - it could be more if needed/designs were provided.
5) Icons for the header were of poor quality and not transparent - I did not use them, and I like it better that way.
6) Removing background from disabled "From Account" input is not the best UX idea in my opinion.
7) For the new transactions there is a default icon provided.
8) Using reactive forms for the payment widget might be "nicer", but my time is limited.
9) I would not concatenate arrays in subscription for handling a history list in the real world situation.
10) Adding favicon, translations, tests etc. would be a nice touch but ...see point no. 8.
11) A bit more comments in the code comments :)
12) Have fun with my code :)

# PeachtreeBank

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
