#  simpl-div-ui - example multi-player simulation frontend service.

## Python Setup (assumes Python >= 3.6, simpl-games-api and simpl-div-model servers running)

```shell
$ git clone git@github.com:simplworld/simpl-div-ui.git
$ cd simpl-div-ui
$ mkvirtualenv simpl-div-ui
$ add2virtualenv .

$ pip install -r requirements.txt
$ ./manage.py migrate
```

## Run front end

```shell
$ ./manage.py runserver 0.0.0.0:8000
```

If you need some serious debugging help, in frontend/templates/frontend/home.html set:

```js
var AUTOBAHN_DEBUG = true;
```

Which will turn on verbose debugging of the Autobahn/Websockets to help debug interactions between the browser and model service backend.
If you do this, do NOT commit this change.

### Gulp Setup (run gulp in a separate terminal outside Vagrant)

Install gulp and/or webpack globally outside Vagrant to ensure they are on your PATH

```shell
$ sudo npm install --global webpack
$ sudo npm install --global gulp
```

Update node_modules and run Gulp to compile JS and SASS

```shell
$ cd to simpl-div-ui directory
$ npm install
$ gulp
```

When you are running gulp with Mac OS, you may get an error like this:

```
Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 4.x
```

If you get this error, run:

```shell
$ npm rebuild node-sass
```

If you install Live Reload browser extension(s) from http://livereload.com/extensions/ and run gulp
your browser will automatically reload pages anytime the JS or a Django template changes.

## Run javascript unit tests (run outside Vagrant)

We use jest and enzyme for unit testing (see http://redux.js.org/docs/recipes/WritingTests.html)

```shell
$ npm test
```

## Debugging WAMP subscriptions and registrations

Point your browser to http://localhost:8080/monitor and open your javascript console

Copyright © 2018 The Wharton School,  The University of Pennsylvania 

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
