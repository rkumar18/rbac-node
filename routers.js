const express = require('express');
const router = express.Router();
const controller = require('./controller/userController')
const {grantAccess,allowIfLoggedin} = require('./middleware')

 
router.post('/signup', controller.signup);
 
router.post('/login', controller.login);
 
router.get('/user/:userId', allowIfLoggedin, controller.getUser);
 
router.get('/users', allowIfLoggedin, grantAccess('readAny', 'profile'), controller.getUsers);
 
router.put('/user/:userId', allowIfLoggedin, grantAccess('updateAny', 'profile'), controller.updateUser);
 
router.delete('/user/:userId', allowIfLoggedin, grantAccess('deleteAny', 'profile'), controller.deleteUser);
 
module.exports = router;