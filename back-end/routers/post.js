const express = require('express')
const {createJob,delJob,getJob,applyJob}=require('../controller/postHandler')

const job = express.Router();

job.post('/',createJob)

job.route('/:id').delete(delJob).get(getJob)

job.get('/apply/:id',applyJob)

module.exports=job;