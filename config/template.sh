# auto import of environment variables
# run on terminal: ./heroku.sh

heroku config:set NODE_ENV= &&
heroku config:set DB_URL &&
heroku config:set FRONTEND_URL= &&
heroku config:set GEOCODER_PROVIDER= &&
heroku config:set GEOCODER_API_KEY= &&
heroku config:set FILE_UPLOAD_PATH= &&
heroku config:set FILE_UPLOAD_MAX_SIZE= &&
heroku config:set JWT_SECRET_KEY= &&
heroku config:set JWT_EXPIRE_TIME= &&
heroku config:set JWT_COOKIE_EXPIRE_TIME= &&
heroku config:set SMTP_HOST= &&
heroku config:set SMTP_PORT= &&
heroku config:set SMTP_USER= &&
heroku config:set SMTP_PASSWORD= &&
heroku config:set FROM_EMAIL= &&
heroku config:set FROM_NAME= &&
heroku config:set SECRET_KEY_OTP= 