# Note_Taker Backend
A simple Notetaker Full Stack Application to understand how a full stack application along with Authentication and deployment where we also include a data base

Backend is the API store the data
Front End is user facing that helps user interact with the API
Deploy Database (stored in clound)
Deploy Backend
Deploy Front End

Bachkend

Django we create a project 
django-admin startproject backend
cd backend
python manage.py atartapp api

Then make imports and changes to the setting in the inner backend dir

JWT Tokens
Json web token acts as a permission/auth
Frontend is separate from the backend(backend needs to now who we are and what permisions we hav).So we'll include a token along with our request.That token can be decoded to understand the permissions.
For Example john is a user will hav a token and it'll be used with all future requests to tell the backend what permissions that user had.Django handles most of the complex parts.
Pass creds to frontend and it'll send it to the backend(like username and pw) grant token based on 2 tokens access and refresh one.
Access one we use with all requests and refresh one we use to refresh
Frontend stores and uses it for future requests to signin to the app.Once the token expires the fronend will submit the token to backend and if refresh token is valid a new access token will be generated and sent back and we can continue it.So this process is done because if an access token is leaked we want it to expire and cant permanatly giv access to our account

Create users,username and pw

Onve views are in place,and paths in urls hav been set we try makemigrations and migrate with manage.py - it provisions db that it has correct tables.When we hav a new db same thing should be done again

To run the program pyhton manage.py runserver

Once done we go to there url paths and see once a user is created how the access and refresh tokens are set up and also how using refresh token we get the access token
