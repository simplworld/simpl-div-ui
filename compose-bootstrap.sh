#!/bin/sh
python manage.py migrate --no-input
python manage.py collectstatic --no-input

npm install
npm rebuild node-sass
npm run start &
python manage.py runserver 0.0.0.0:8000
