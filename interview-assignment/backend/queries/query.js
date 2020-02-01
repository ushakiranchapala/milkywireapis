const knex = require('knex');


const db = require('../db/knex'); 
const multerConfig = require("../config/multer");


// get image

const getImage =  (req, res) => {
	console.log(req.file.path);
	console.log(req.file);
	return res.json("file uploaded successfully");

}

//Get all posts
const getPosts = (req, res)=> {
	db('co_posts').then(data=>{
		res.status(200).json(data);

	})
	  .catch(err=> res.status(400).json('error'));
}


//Get all posts for a specific impacter

const getImpactersById = (req, res) => {
	const { id } = req.params;
		
		db.select('*').from('co_impacters').where({impacter_id : id})
		.then(user=> {

			if(user.length){
				res.json(user[0]);
			} else {
				res.status(400).json('not found');
			}
			
		})
		.catch(err=> res.status(400).json('error'));

}
//Get a post by id
const getPostsById = (req,res) => {
	const { id } = req.params;
		
		db.select('*').from('co_posts').where({post_id : id})
		.then(post=> {
			res.json(post);
			
		})
		.catch(err=> res.status(400).json('error'));
}
//GET all posts by imapcter name
const getPostsByName = (req,res) => {
	const {name} = req.params;
   db.select('*').from('co_impacters').where({name}).then(data=> {
	
	id = data[0].impacter_id;
	db.select('*').from('co_posts').where({impacter_id :id }).then(post => {
		res.status(200).json(post);
    //console.log(post);
	})
	})
      .catch(err=> res.status(400).json(err));

	}
// delete post
const deletePost = (req,res) => {
		const {id} = req.params;
		db('co_posts').where({post_id : id}).del()
		.then(post => {
			res.status(200).json({sucess : true});
		})
		  .catch(err=> res.status(400).json('error'));
}
//Update a post
const updatePost = (req,res) => {
	const {id} = req.params;

	const { description, image, author } = req.body;
	

	db('co_posts')
  			.where({post_id : id})
    		.update({
       		description: description,
       		data: {
            	media: [
              	{
               		image:  image,
                	version: "2019-03-14",
                	description: author
              	}
            	]
         	},
         	status: "VISIBLE",
          impacter_id: 19
       		
       
        	})
        	.returning('*')
        	.then(post=>{
        		res.send(post);
        	})
        	  .catch(err=> res.status(400).json('error'));
  	

}
//user can create a new post by uploading an image to the API. for now im saving image to local server.
const createPost = (req, res)=> {
	const { description, image, author, impacter_id } = req.body;
	const nameimage = req.file.path;
	//console.log(req.file.path);
	db('co_posts')
			.returning('*')
    		.insert({
    			
    			type: "IMAGES",
       		description: description,
       		data: {
            	media: [
              	{
               		image:  nameimage,
                	
                	version: "2019-03-14",
                	description: author
              	}
            	]
         	},
         	status: "VISIBLE",
          impacter_id: impacter_id
       
        	})
        	
        	.then(post=>{
        		res.status(200).send(post)
        		
        	})
        	
}




module.exports = {
	getPosts,
	getPostsById,
	getImpactersById,
	getPostsByName,
	deletePost,
	updatePost,
	createPost,
	getImage
}
