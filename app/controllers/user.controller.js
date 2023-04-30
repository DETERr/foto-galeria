const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!(password && username)) {
    res.status(400).send("All input is required");
  } else {
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    } else {
      encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { user_id: user._id, username },
        "pcfkgv9z56d3gw7lEcmV",
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      console.log(token);

      res.status(201).json(user);
    }
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    res.status(400).send("All input is required");
  } else {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        "pcfkgv9z56d3gw7lEcmV",
        {
          expiresIn: "2h",
        }
      );
      user.token = token;

      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  }
};
