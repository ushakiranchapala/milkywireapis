const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const knex = require('knex');
const apidb = require('./queries/query');
const knexfile = require('./knexfile')

const db = knex(knexfile);

const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/api/posts', apidb.getPosts);

app.get('/api/posts/id/:id', apidb.getPostsById);
app.get('/api/impacters/:id', apidb.getImpactersById);
app.get('/api/posts/name/:name', apidb.getPostsByName);
app.put('/api/posts/update/:id', apidb.updatePost);
app.post('/api/posts/create', apidb.createPost)
app.delete('/api/posts/delete/:id',apidb.deletePost);

/*
const  id  = '3';
    const details = {
    	width : '2002',
    	height: '3003',
    	pictureId : '1000'
    }
	const	image = `https://picsum.photos/id/${details.pictureId}/${details.width}/${details.height}`;
	db('co_posts')
  			.where({post_id : id})
    		.update({
       		description: 'usha kiran',
       		data: {
            	media: [
              	{
               		image:  image,
                	width: details.width ,
                	height: details.height,
                	version: "2019-03-14",
                	description: 'author'
              	}
            	]
         	},
       
        	}).then(post=>{
        		console.log('sucess udated')
        	})
  	

const  id  = '1';
    const details = {
    	width : '2002',
    	height: '3003',
    	pictureId : '1000'
    }
	const	image = `https://picsum.photos/id/${details.pictureId}/${details.width}/${details.height}`;

db('co_posts')
    		.insert({
    			
    			type: "IMAGES",
       		description: 'ushakiran',
       		data: {
            	media: [
              	{
               		image:  image,
                	width: details.width ,
                	height: details.height,
                	version: "2019-03-14",
                	description: 'author'
              	}
            	]
         	},
         	status: "VISIBLE",
          impacter_id: 19
       
        	}).then(post=>{
        		console.log('sucess added')
        	})
*/

app.listen(port, ()=> {
	console.log('app is running on port 3000');
})




/*
/getposts -> GET = user posts
/getpostid -> GET = user posts by id
/updatePosts -> pUT = update a post
/Delete -> DELETE = delete post
/image -> put -> create post by image to api.
*/