const knex = require('../db/knex');
const request = require('supertest');
const expect = require('chai').expect;

const app = require('../index')



describe('Imapacters posts api', ()=>  {
	before(function(done) {
		//run migrations
		knex.migrate.latest()
		.then(()=>{
			//run seeds
			return knex.seed.run();

		}).then(()=> done());
    
		
	});
  
	it('GET /posts', function(done) {
    request(app)
      .get('/api/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response)=> {
        //big array need more time to render.
        //expect(response.body).to.be.a('array');

        done();
      })
  });

  it('GET /posts/id', function(done) {
    request(app)
      .get('/api/posts/id/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response)=> {
        expect(response.body).to.be.a('array');
        
        done();
      })
  });

  it('GET /posts/name', function(done) {
    //random name is generated every time the test data base is fired. so name is queried from db.
    knex.select('name').from('co_impacters').then((user)=>{
      console.log(user[0].name);
      const impactername= user[0].name;

      request(app)
      .get(`/api/posts/name/${impactername}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response)=> {
        expect(response.body).to.be.a('array');
        //console.log(response.body)
        done();
      })
    })
    
  });

  it('put /api/posts/update/:id', (done) => {
    request(app)
      .put('/api/posts/update/5')
      .send({ description: 'we have hulk',
              image: 'https://picsum.photos/id/1000/5626/3635', 
              author : 'ironman' })
      .set('accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response)=> {
        expect(response.body).to.be.a('array');
       
        done();
      })

   })

   it('POST /api/posts/create', (done) => {
    
            

    request(app)
      .post('/api/posts/create')
      .field('description', 'hello')
     
      .field('author', 'kiran')
      .field('impacter_id', '6')
      //for test purpose im using local impage
      .attach('file', './test/testimage.jpeg')
      .expect(200)
      .then((response)=> {
        expect(response.body).to.be.a('array');
        console.log(response.body[0].data);

          done();
        })

     })


   it('DELETE /api/posts/delete/:id', (done) => {
    request(app)
      .delete('/api/posts/delete/7')
      .set('accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response)=> {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({sucess : true});
        //console.log(response.body);
          done();
        })

     })


});


 

