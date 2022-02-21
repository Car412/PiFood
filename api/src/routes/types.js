const {Router} = require ('express');
const {Types} = require ('../db.js');
const router = Router();

const getTypes = async () => {
    const types = await Types.findAll();
    return types;
  };
  
  router.get('/', async (req, res) => {
    const data = await getTypes();
    data.length? res.status(200).json(data) : res.status(404).send({ msg: 'Types not found' });     
      
  });
  
  module.exports = router;