const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Game, Team, UserGame, GameTeam } = require('./models');

const PORT = process.env.PORT || 5678;
const jwtSecret = 'shh1234';

const app = express();

app.use(bodyParser.json());

app.get('/api/users', async (request, response) => {
  const users = await User.findAll({});
  response.json(users);
})

app.post('/api/register', async (request, response) => {
  const { email, password, firstName, lastName, favoriteTeam } = request.body;
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
    response.status(409).json({
      message: "That email is already registered."
    })
    return;
  }

  const passwordDigest = await bcrypt.hash(password, 12);

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    favoriteTeam: favoriteTeam,
    email: email,
    passwordDigest: passwordDigest
  });

  const game = await Game.create({
    date: date,
    time: time,
    location: location,
    awayTeam: awayTeam,
    homeTeam: homeTeam
  });

  const gameSchedule = await Game.findAll({
    where: {
      teamId: 15
    },
    order: [
      ['date', 'ASC']
    ]
  });

  const token = jwt.sign({ userId: user.id }, jwtSecret);
  response.json({
    token: token
  });
});

app.get('/api/games', async (request, response) => {
  const rangersGames = await Game.findAll({
    where: {
      $or: [
        {homeTeam: 'New York Rangers'},
        {awayTeam: 'New York Rangers'}
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(rangersGames)
})

app.get('/api/teams', async (request, response) => {
  const teams = await Team.findAll();
  response.json(teams)
})

app.post('/api/login', async (request, response) => {
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
  if (existingUser === null) {
    response.status(401).json({
      message: "Invalid username or password."
    });
    return;
  }
  const isPasswordCorrect = await bcrypt.compare(password, existingUser.passwordDigest);
  if (isPasswordCorrect) {
    const token = jwt.sign({ userId: existingUser.id }, jwtSecret);
    response.json({
      token: token
    });
  } else {
    response.status(401).json({
      message: 'Invalid Username or Password'
    })
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
