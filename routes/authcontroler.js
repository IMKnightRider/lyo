const { getUsers, saveUsers } = require('../models/users');
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(1).required(),
  state: Joi.string().required(),
  password: Joi.string().min(6).required()
});

function signup(req, res) {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const users = getUsers();
  const userExists = users.find(user => user.email === req.body.email);
  if (userExists) return res.status(400).send('User already registered.');
  
  users.push(req.body);
  saveUsers(users);
  res.send('Signup successful.');
}

function login(req, res) {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) return res.status(400).send('Email or password is wrong.');
  
  res.send('Login successful.');
}

module.exports = {
  signup,
  login
};
