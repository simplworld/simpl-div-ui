#  simpl-div-ui - example multi-player simulation frontend service.

## Python Setup (assumes Python 3.6, simpl-games-api and simpl-div-model servers running)

## Install simpl-div-ui

```shell
$ git clone https://github.com/simplworld/simpl-div-ui.git
$ cd simpl-div-ui
```

## Local Docker Setup

The `simpl-games-api` and `simpl-div-model` containers need to be running before starting `simpl-div-ui`.

You also need to have a `is_staff=True` user in the simpl-games-api database that
corresponds to the `SIMPL_GAMES_AUTH` setting used here.

After you clone the repo, run:

```bash
$ docker-compose up
```

this will create the Docker image and run it. 

## Local Setup Without Docker

### Install Python dependencies and create a SQLite database
```shell
$ mkvirtualenv simpl-div-ui
$ add2virtualenv .
$ pip install -r requirements.txt
$ ./manage.py migrate
```

### Run front end

```shell
$ ./manage.py runserver 0.0.0.0:8000
```

If you need some serious debugging help, in frontend/templates/frontend/home.html set:

```js
var AUTOBAHN_DEBUG = true;
```

Which will turn on verbose debugging of the Autobahn/Websockets to help debug interactions between the browser and model service backend.
If you do this, do NOT commit this change.

In a separate terminal, update node_modules and run Gulp to compile JS

```shell
$ cd to simpl-div-ui directory
$ npm install
$ npm start
```

## Run javascript unit tests

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
