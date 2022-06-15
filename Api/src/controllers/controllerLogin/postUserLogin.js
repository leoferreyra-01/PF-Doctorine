const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../db');
var nodemailer = require('nodemailer');

const loginUser = async (req) => {
  try {
    const { email, password } = req;
    
    const user = await User.findOne({ where: { email: email } });
  
    if (!user) {
      throw new Error('User not found');
    }
    if (!(user && password)) {
      throw new Error('User or password not found');
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password
    );
    if (isPasswordValid) {
      const userForToken = {
        ID: user.ID,
        email: user.email,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      return ({
        email: user.email,
        token,
        userType: user.userType,
        name: user.name,
        lastName: user.lastName,
        document: user.document,
        birth: user.birth,
      });
    } else {
      throw new Error('Password is invalid');
    }
  } catch (err) {
    console.log(err);
    throw new Error('There were some errors when logging in');
  }
};

const saltRounds = 10;
var registerMail = async username => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_ADMIN,
      pass: process.env.PASSWORD,
    },
  });
  transporter.verify().then(() => {
    console.log('Ready for send mails');
  });
  await transporter.sendMail({
    from: '"Welcome!" <doctorine.com@gmail.com>', // sender address
    to: username, // list of receivers
    subject: 'Welcome to Doctorine!', // Subject line
    html: '<b><div>Welcome to Doctorine!</div>>div>¡Here you can do all yours managements 100% online!</div></b>', // html body
  });
};

const registerUser = async (req) => {
  try {
    const { email, password, userType, document, name, lastName, birth } =
      req;
    const user = await User.findAll({ where: { email } });
    if (!user.length) {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err);
          throw new Error(err);
        }
        await User.findOrCreate({
          where: {
            email: email,
            password: hash,
            userType: userType,
            document: document,
            name: name,
            lastName: lastName,
            birth: birth,
          },
        });
      });
      registerMail(email);
      return ({ success: 'Usuario creado correctamente' });
    } else {
      return ({ error: 'Este usuario ya existe en la base de datos' });
    }
  } catch (error) {
    console.log(error);
    throw new Error('There were some errors when registering');
  }
};

const userExist = async (req) => {
  try {
    const { email } = req;
    const user = await User.findOne({ where: { email } });
    // console.log(user)
    if (user) {
      return ({ success: 'User found' });
    } else {
      return ({ failure: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    throw new Error('There were some errors when checking if user exist');
  }
};

module.exports = {
  loginUser,
  registerUser,
  userExist,
};
