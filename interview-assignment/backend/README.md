# Getting started
To help you with the setup we have provided a PostgreSQL database that runs in Docker. To use this you need to have [Docker](https://www.docker.com/) and [Node](https://nodejs.org/) installed on your computer and then run these commands in your terminal.

1. Open this folder in your terminal
2. Run `docker-compose up -d`
3. Run `npm i`
4. Run `npm run init-db` to setup the database and populate it with data. You can find the database definition in the migrations folder.

If you want to run the database without using docker you will have to update the `knexfile.js` file with the connection information for your database setup and then run `npm run init-db` to populate the database.

When you are done you can run `docker-compose down` to take down the database.

# Dev
Run `npm run dev` to start nodemon with index.js

Api End points:
After Run `npm run dev` to start nodemon with index.js, api runs on http://localhost:3000. Below you can find a list of all endpoints. 

| Method | HTTP Request | Description |
| :---         |     :---:      |          ---: |
| getPosts  | GET  http://localhost:3001/api/posts and GET /api/posts | Get all posts   |
| getPostsById    | GET /api/posts/id/{post id}     | Get a post by id.   example:/api/posts/2 |
| getImapctersById    | GET /api/impacters/{id}    | Get all posts for a specific impacter. example:/api/1   |
| getPostsByName    | GET /api/posts/name/{impacter name}     | GET all posts by imapcter name. example:/api/posts/name/mollit ad|		
| deletePost    | GET /api/posts/delete/{id}    | delete post  by post id. example:/api/posts/delete/3|

Update a post:

Request - HTTP request
PUT http://localhost:3001/api/posts/update/{id} .Example http://localhost:3001/api/posts/update/3.
Request body:
In the request body, supply data with the following structure:

{
  "description": "we have hulk",
  "image": "https://picsum.photos/id/1000/5626/3635",
  "author" : "ironman"
  }
 
| property name | value | description |
| :---         |     :---:      |  :---:    |
| description   | String    | Description of post |
| image    | string    | Image url of post |
| author    | string    | Author of Post | 

Create a post:

Request - HTTP request
Post http://localhost:3001/api/posts/create
Request body
In the request body, supply data with the following structure:

{
  "description": "we have hulk",
  "image": "https://picsum.photos/id/1000/5626/3635",
  "author" : "ironman",
  "impacter_id": "4"
  
 }
 
| property name | value | description |
| :---         |     :---:      |  :---:    |
| description   | String    | Description of post |
| image    | string    | Image url of post |
| author    | string    | Author of Post | 
| Impacter_id    | string    | Id of the Impacter who is posting. | 


Test APIS:

Install postgresql. 
You can install postgresql using brew by following link:
https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3

If you are using your own test database change the name of the test database in knexfile.js or update 'test' object with your database details.

1. Run `npm i`

2. Run `npm test`




