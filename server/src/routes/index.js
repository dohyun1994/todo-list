const express = require('express') 
const router = express.Router() 
const todo = require('./todo') 

router.use('/todos', todo)      // api/todos/ app.get('/edit')

module.exports = router
