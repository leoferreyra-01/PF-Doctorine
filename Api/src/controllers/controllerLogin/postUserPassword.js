const bcrypt = require('bcrypt');
const { User } = require('../../db');
var nodemailer = require('nodemailer');
const saltRounds = 10;

const newPassword = async req => {
  // console.log(req)
  const { email, currentPassword, newPassword } = req;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error('User not found');
    }
    if (!currentPassword) {
      throw new Error('Current password is required');
    }
    if (!newPassword) {
      throw new Error('New password is required');
    }

    let result = bcrypt.compareSync(currentPassword, user.dataValues.password);
    if (result) {
      const userUpdated = User.update(
        { password: newPassword },
        { where: { email: email } }
      );
    }
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('There was a problem updating the password');
  }
};

const passwordReset = async (req) => {
  try {
    console.log('ESTE ====>', req.email);
    const user = await User.findOne({
      where: {
        email: req.email,
      },
    });
    if (user) {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.USER_ADMIN, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });
      transporter.verify().then(() => {
        console.log('Ready for send mails');
      });
      await transporter.sendMail({
        from: '"Reset password 😎" <doctorine.com@gmail.com>', // sender address
        to: req.email, // list of receivers
        subject: 'Reset Password Doctorine', // Subject line
        html: '<b>To reset your password, click on the link</b><br/><div><a href=http://localhost:3000/newPassword>Link</a></div>', // html body
      });
    } else {
      return ({ error: 'Usuario no registrado!' });
    }
  } catch (error) {
    console.log(error);
    throw new Error('There was a problem updating the password');
  }
};

const newPasswordReset = async req => {
  const { email, password } = req;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error('User not found');
    }
    if (!password) {
      throw new Error('Password is required');
    }
    const userUpdated = User.update(
      { password: password },
      { where: { email: email } }
    );
    return userUpdated;
  } catch (error) {
    console.log(error);
    throw new Error('There was a problem updating the password');
  }
};

const checkPassword = async (req) => {
  const { email, password } = req;
  try{
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error('User not found');
    }
    if (!password) {
      throw new Error('Password is required');
    }
    console.log(user.dataValues.password);
    let result = bcrypt.compareSync(password, user.dataValues.password);
    return result;
  } catch (error){
    console.log(error);
    throw new Error('There was a problem checking your password');
  }
}

module.exports = {
  newPassword,
  passwordReset,
  newPasswordReset,
  checkPassword
};
