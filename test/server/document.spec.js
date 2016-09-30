// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('./../../server');
<<<<<<< HEAD
const mongoose = require('mongoose');

const Document = mongoose.model('Document');
=======

>>>>>>> c1e4326... Refactor code according to role access
const expect = chai.expect;

chai.use(chaiHttp);

describe('DOCUMENT', () => {
  let token;
<<<<<<< HEAD
  let documentID;
=======
>>>>>>> c1e4326... Refactor code according to role access
  const doc = {
    title: 'This is a dummy title',
    content: 'Content goes here',
  };
  const doc2 = {
    title: 'Dummy title',
    content: 'Content goes here',
  };
<<<<<<< HEAD
  const user = {
    username: 'Saddam',
    first: 'Saddam',
    last: 'Hussein',
    email: 'sh@gmail.com',
    password: '1234',
    role: 'admin',
  };
  Document.collection.drop();
  before((done) => {
    chai.request(api)
    .post('/users')
    .send(user)
=======
  before((done) => {
    chai.request(api)
    .post('/users/login')
    .send({
      username: 'john',
      password: '1234',
    })
>>>>>>> c1e4326... Refactor code according to role access
    .end((err, res) => {
      token = res.body.token;
      done();
    });
  });
  describe('POST', () => {
    it('Should create a new document', (done) => {
      chai.request(api)
      .post('/documents')
      .send(doc)
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('message', 'document');
        expect(res.body.document).to.have.keys('createdAt', 'ownerId', 'content', 'title', '_id', 'updatedAt', '__v');
        expect(res.body.message).to.be.equal('Document created');
        done();
      });
    });

    it('Should create a new document with all fileds', (done) => {
      chai.request(api)
      .post('/documents')
      .send(doc2)
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys('message', 'document');
        expect(res.body.document).to.have.keys('createdAt', 'ownerId', 'content', 'title', '_id', 'updatedAt', '__v');
        expect(res.body.message).to.be.equal('Document created');
        done();
      });
    });

    it('Should create a new document the title should be unique', (done) => {
      chai.request(api)
      .post('/documents')
      .send(doc)
      .set({ Authorization: 'Bearer ' + token })
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.key('message');
        expect(res.body.message).to.be.equal('Title already exists');
        done();
      });
    });
  });
  describe('GET', () => {
    it('/documents/: Returns all documents according to dates created.', (done) => {
      chai.request(api)
        .get('/documents')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
<<<<<<< HEAD
          documentID = res.body.documents[0]._id;
          expect(res.status).to.equal(200);
          expect(res.body.documents).to.be.a('Array');
          expect(res.body.documents.length).to.equal(2);
=======
          expect(res.status).to.equal(200);
          expect(res.body.documents).to.be.a('Array');
          expect(res.body.documents.length).to.equal(3);
>>>>>>> c1e4326... Refactor code according to role access
          expect(res.body.documents[0]).to.have.all.keys('title', 'content', 'ownerId', 'updatedAt', '_id', 'createdAt');
          expect(res.body.documents[0].createdAt > res.body.documents[1].createdAt).to.be.true;
          done();
        });
    });

    it('/documents/<id>: Find document.', (done) => {
      chai.request(api)
<<<<<<< HEAD
        .get('/documents/' + documentID)
=======
        .get('/documents/57d11f44b0a303c1186279bf')
>>>>>>> c1e4326... Refactor code according to role access
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.all.keys('title', 'content', 'ownerId', 'updatedAt', '_id', 'createdAt');
          done();
        });
    });
  });
  describe('UPDATE', () => {
    it('/documents/<id>: Update document attributes.', (done) => {
      chai.request(api)
<<<<<<< HEAD
        .put('/documents/' + documentID)
=======
        .put('/documents/57d11f44b0a303c1186279bf')
>>>>>>> c1e4326... Refactor code according to role access
        .set({ Authorization: 'Bearer ' + token })
        .send({
          title: 'new title',
          content: 'new content',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
<<<<<<< HEAD
          expect(res.body.document._id).to.be.equal(documentID);
=======
          expect(res.body.document._id).to.be.equal('57d11f44b0a303c1186279bf');
>>>>>>> c1e4326... Refactor code according to role access
          expect(res.body.document.title).to.be.equal('new title');
          expect(res.body.document.content).to.be.equal('new content');
          done();
        });
    });

    it('/documnents/<id>: Returns error if document is not found.', (done) => {
      chai.request(api)
        .put('/documnents/67e806916b61fd612204fe2b')
        .set({ Authorization: 'Bearer ' + token })
        .send({
          title: 'title',
          content: 'content',
        })
        .end((err, res) => {
          expect(res).to.be.a('object');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('SEARCH', () => {
    it('Returns search results according to text searched', (done) => {
      chai.request(api)
        .get('/search/new title')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.results).to.be.a('object');
          expect(res.body.results).to.have.all.keys('_id', 'updatedAt', 'createdAt', 'ownerId', 'content', 'title');
          done();
        });
    });
    it('Returns error if query is not found', (done) => {
      chai.request(api)
        .get('/search/monicah')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.be.equal('No such title in documents');
          done();
        });
    });
  });
<<<<<<< HEAD
  describe('DELETE', () => {
    it('/documents/<id>: Delete document.', (done) => {
      chai.request(api)
        .delete('/documents/' + documentID)
=======
  describe('PAGINATION', () => {
    it('/documents/ Returns document with limit.', (done) => {
      chai.request(api)
        .get('/documents/?limit=2&page=1')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.documents.length).to.equal(2);
          done();
        });
    });
    it('/documents/ Returns document with pagination.', (done) => {
      chai.request(api)
        .get('/documents/?limit=1&page=2')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.documents.length).to.equal(1);
          done();
        });
    });
  });
  describe('DELETE', () => {
    it('/documents/<id>: Delete document.', (done) => {
      chai.request(api)
        .delete('/documents/57d11f44b0a303c1186279bf')
>>>>>>> c1e4326... Refactor code according to role access
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          expect(res.status).to.equal(202);
          expect(res.body.message).to.equal('Successfully deleted');
          done();
        });
    });
  });
});
