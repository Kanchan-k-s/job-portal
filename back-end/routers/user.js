const express = require('express')
const {login,logout,createUser,allUser,resume,resumeDetails} = require('../controller/userHandler')

const user = express.Router();

user.post('/login',login);

user.route('/').get(allUser).post(createUser).delete(logout)

user.route('/resume/:id').put(resume)
user.get('/resume/:id',resumeDetails)
module.exports=user;