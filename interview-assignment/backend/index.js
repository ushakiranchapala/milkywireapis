const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const multerConfig = require("./config/multer");
const db = require('./db/knex'); // the connection!
const apidb = require('./queries/query');
//const knexfile = require('./knexfile')


const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/api/posts', apidb.getPosts);

app.post('/api/posts/image',multerConfig.saveToUploads, apidb.getImage)

app.get('/api/posts/id/:id', apidb.getPostsById);
app.get('/api/impacters/:id', apidb.getImpactersById);
app.get('/api/posts/name/:name', apidb.getPostsByName);
app.put('/api/posts/update/:id', apidb.updatePost);
app.post('/api/posts/create',multerConfig.saveToUploads, apidb.createPost)
app.delete('/api/posts/delete/:id',apidb.deletePost);




app.listen(port, ()=> {
	console.log('app is running on port 3000');
})

module.exports = app;



/*
/getposts -> GET = user posts
/getpostid -> GET = user posts by id
/updatePosts -> pUT = update a post
/Delete -> DELETE = delete post
/image -> put -> create post by image to api.
*/