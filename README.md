# NODE.js API
## Overview

This is a simple application created for training purposes. I have built an **Employee Management System API** for a fictitious company named **TutorialCo**. Only authorized users can call the endpoints on my API. For this purposes is used the [OAuth 2.0 authorization framework](https://tools.ietf.org/html/rfc6749). When a user wants to access protected endpoints on an API, he needs to present an **Access Token** as proof that he has the required permissions (scopes) for making the call to the endpoint. Each Access Token contains a list of authorized scopes. API includes 4 levels of authorization:

* reading emloyees (scope: *read:employees*);
* creating employees (scope: *create:employees*);
* editting employees (scope: *edit:employees*);
* deleting employees (scope: *delete:employees*).
         
The application is used by two types of users (**Admin and Guest**) with different permissions. Roles and permissions configured with the [Auth0 Authorization Extension](https://auth0.com/docs/extensions/authorization-extension/v2). The admin's access token should include *create, edit and delete* scopes and guest should have token only with the *read* scope.

## Implementation
This folder includes the API implementation using Node.js and the [Express](http://expressjs.com) framework

## Prerequisites
* Auth0 account
* Node.js v9.0.0

## Set the configuration values

Rename the envEexample.js file in the /server/config/ folder to env.js.
Once you have renamed the file you should set the following values in this file:

`DATABASE_NAME`: Set this to the name of your database.

`DATABASE_HOST`: Set this to the name of your domain.

`DATABASE_USERNAME`: Set a user name that is used by the database.

`DATABASE_PASSWORD`: Set a password that is used by the database.

`DATABASE_DIALECT`: Set the sql dialect of the database.

`AUTH0_DOMAIN`: Set this to the value of your Auth0 Domain. You can retrieve it from the Settings of your Client at the [Auth0 Dashboard](https://auth0.com/docs/dashboard).

`AUTH0_AUDIENCE`: Set this to the value of your API Identifier. You can retrieve it from the Settings of your API at the [Auth0 Dashboard](https://auth0.com/docs/dashboard).

## Deploy & Run

Open a terminal and navigate to the folder in which this README.md is. Install the required packages for the Node.js API by running:

* ```npm install```

Once the packages are installed, you can then run the server:

* ```npm run devstart```

# Test 

To test this application you can run the corresponding SPA application.  For instructions on how to configure and run the SPA app please see the [README.md]().
Alternatively you can test it using a tool with which you can make HTTP requests (such as Postman) but first of all you need to ask Auth0 for tokens for any of your authorized client applications, perform a POST operation to the https://YOUR-AUTH-DOMAIN/oauth/token  