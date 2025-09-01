const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Signup
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    

    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({error : 'Credentials are required'});
    }

    //checking is user already exist
    const existingUser = await User.findOne({ email });
    if ( existingUser ) {
        res.status(400).json({error : "Email already exist"});
    }

    //createing new user
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, password : hashPassword});

    //Generating jwt token
    const token = jwt.sign({ id : user._id}, process.env.JWT_SECRET,{
      expiresIn: '1h'
    });

    res.cookie( 'token', token, {
      httpOnly: true,//cant be access by javascript
      // secure: process.env.NODE_ENV === 'production', // HTTPS-only in prod
      secure: false,
      sameSite: 'lax',
      maxAge: 3600000
    })

    user.password = undefined;
    res.status(201).json({ user });

  } catch (error) {
    console.log('Signup error: '+ error); 
    res.status(500).json({ error: 'Server error' });
  }
};

//login
exports.loginUser = async( req, res )=>{
  try {
    const { email, password } = req.body;

    //1. Check if user exist
    const user = await User.findOne({ email }).select('+password');
    if ( !user ) {
      return res.status(401).json({error : 'Invalid credentials'})
    }

    //2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if ( !isPasswordValid ) {
     return res.status(401).json({error : 'Invalid credentials'})
    }

    //3. Generate token
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET,{
      expiresIn: '1h'
    })

    res.cookie( 'token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600000,
    })
    user.password = undefined;
    return res.status(200).json({ user });


  } catch (error) {
    console.log('Server Error: ' + error);
    return res.status(500).json({error : 'Internal Server Error'})
  }
}

exports.logoutUser = (req, res)=>{
  res.cookie( 'token', '',{
    httpOnly: true, //cant access by javascript
    expires: new Date(0), //expires immediately
  } )
  res.status(200).json({ message: 'Logged Out'});
}

exports.verifyUser = async(req, res) =>{

  const user = await User.findById(req.user.id).select('-password')
  res.json({ user})
  
}