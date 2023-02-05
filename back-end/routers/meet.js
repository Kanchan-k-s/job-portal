const express = require('express')
const {relation,job_applied,user_applied,rejstatus,accstatus} =require('../controller/meetHandler')

const meet = express.Router();

meet.post('/',relation)
meet.get('/:id',job_applied)
meet.get('/apply/:id',user_applied)
meet.post('/reject/:user_id/:job_id',rejstatus)
meet.post('/accept/:user_id/:job_id',accstatus)

module.exports=meet;