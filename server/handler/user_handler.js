const User = require("../models/user");
const status = require("http-status");

async function registerNewUser(req, res) {
  var user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  await user.save();
  return res.json({
    user: {
      username: user.username,
      email: user.email
    }
  });
}

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({
    email: email
  });

  if (!user || !user.validPassword(password)) {
    return res.status(status.UNAUTHORIZED).json({
      error: {
        message: "email or password is invalid"
      }
    });
  }

  const token = user.generateJWT();
  return res.json({
    user: {
      username: user.username,
      email: user.email,
      token: token
    }
  });
}

async function changePassword(req, res) {
  const userId = req.user.userid;
  const user = await User.findById(userId);

  const newUserProfile = req.body.user;
  if (newUserProfile.password) {
    user.setPassword(newUserProfile.password);
  }

  await user.save();
  return res.json({ status: "done" });
}

module.exports = {
  registerNewUser,
  login,
  changePassword
};