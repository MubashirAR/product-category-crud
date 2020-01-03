# Welcome!

This is a simple CRUD project with 2 modules, product and category. Each product belongs to a category and has a unique product ID. Similarly, each category also has a unique ID.

## Flow

There are 3 links on the home-page, `product list`, `product form` and `category form`. The user must first create atleast one category through the `category form` page. Once a category is made, the user can then create a product through the `product form` page. The user can now view all products with their attached category details and also edit or delete them. 

Deleting the product will permanently delete the product details. The category however cannot be permanently deleted, only disable (permanently). Once disabled, the category will be visible only in the edit page of a connected product.

## Files and folders

There are two main folders `store` and `backend`. (The poorly named) `store` folder contains the front-end project made with Angular.

The backend folder contains the following folders:
**routes:** Contains all the express routes within a file for each module.
**models:** Contains all the mongoose Schema in individual files, and models can be accessed through index.js.
**libs/service:** Contains the services for each module.
**routes:** Contains all the static files generated with `ng build --prod`.
**server.js:** The starting point of the app. express 4.0 supports bin/www, however I've just set it up like this for now.

## Tech stack and modules

Front-end: Angular
Back-end: Node.js, Express.js, 
Database: MongoDB,
Modules: cors, body-parser, mongoose

## How to launch

1. Please perform an `npm install` before launching the app for the first time.
2. Open the `backend` folder and enter `node server`. Alternatively you can use `nodemon server` if nodemon is install on your system. **Either** go to `store` folder and enter `ng serve` and access `localhost:4200` **or** directly access `localhost:3000`
