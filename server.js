const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./models');

const PORT = process.env.PORT || 5678;
const jwtSecret = 'shh1234';

const app = express();

app.use(bodyParser.json());

app.get('/api/users', async (request, response) => {
  const users = await User.findAll({});
  response.json(users);
})

app.post('/api/register', async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400).json({
      error: "Please Provide an Email and Password"
    });
    return;
  }

  const existingUser = await User.findOne({
    where: {
      email: email
    }
  });

  if (existingUser) {
    response.status(409).send('User Already Exists');
    return;
  }

  const passwordDigest = await bcrypt.hash(password, 12);

  const user = await User.create({
    email: email,
    passwordDigest: passwordDigest
  });

  const token = jwt.sign({ userId: user.id }, jwtSecret);
  response.json({
    token: token
  });
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
