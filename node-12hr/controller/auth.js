const jwt = require("jsonwebtoken");
const model = require("../model/user");
const User = model.User;
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email }, privateKey, {
      algorithm: "RS256",
    });

    user.token = token;

    await user.save();

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error signing up user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ email }, privateKey, {
      algorithm: "RS256",
    });

    user.token = token;
    await user.save();

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Authentication failed" });
  }
};
