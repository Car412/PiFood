/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
  describe('GET /recipes/:id', ()=>{
    it('should get 200', ()=>{
      return agent.get('/recipes/715497')
      .then(res=> {expect (res.status).to.equal(200)})
    })
  });
  it('should respond a recipe with the id and the correct title', ()=>{
    return agent.get('/recipes/716426')
    .then(res=> {
      expect(res.body[0].title).to.equal('Cauliflower, Brown Rice, and Vegetable Fried Rice')
    })
  })
});
