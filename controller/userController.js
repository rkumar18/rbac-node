const {User} = require('../models/user');
const {hashPasswordUsingBcrypt, comparePasswordUsingBcrypt, jwtSign} = require('../utils')

   exports.signup = async (req, res, next) => {
    try {
     const { email, password, role } = req.body
     console.log(req.body);
     const hashedPassword = await hashPasswordUsingBcrypt(password);
     const newUser = new User({ email, password: hashedPassword, role: role || "basic" });
     const accessToken = await jwtSign(newUser)
     await newUser.save();
     res.json({
      data: newUser,
      accessToken
     })
    } catch (error) {
     next(error)
    }
   }
 
   
   exports.login = async (req, res, next) => {
    try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) return next(new Error('Email does not exist'));
     const validPassword = await comparePasswordUsingBcrypt(password, user.password);
     if (!validPassword) return next(new Error('Password is not correct'))
     const accessToken = await jwtSign(user)
     res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken
     })
    } catch (error) {
     next(error);
    }
   }
    
    
    exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
     data: users
    });
   }
    
   exports.getUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     const user = await User.findById(userId);
     if (!user) return next(new Error('User does not exist'));
      res.status(200).json({
      data: user
     });
    } catch (error) {
     next(error)
    }
   }
    
   exports.updateUser = async (req, res, next) => {
    try {
     const update = req.body
     const userId = req.params.userId;
     await User.findByIdAndUpdate(userId, update);
     const user = await User.findById(userId)
     res.status(200).json({
      data: user,
      message: 'User has been updated'
     });
    } catch (error) {
     next(error)
    }
   }
    
   exports.deleteUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     await User.findByIdAndDelete(userId);
     res.status(200).json({
      data: null,
      message: 'User has been deleted'
     });
    } catch (error) {
     next(error)
    }
   }
    