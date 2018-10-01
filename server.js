const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Game, Team, UserGame, GameTeam } = require('./models');

const PORT = process.env.PORT || 5678;
const jwtSecret = 'shh1234';

const app = express();

app.use("/", express.static("./build/"));

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

  const token = jwt.sign({ userId: user.id }, jwtSecret);
  response.json({
    token: token
  });
});

// app.put('/api/update', async (request, response) => {
//   const { email, password, firstName, lastName, favoriteTeam } = request.body;
//   if (!email || !password) {
//     response.status(400).json({
//       error: "Please Provide an Email and Password"
//     });
//     return;
//   }

//   const existingUser = await User.findOne({
//     where: {
//       email: email
//     }
//   });

//   if (existingUser) {
//     response.status(409).json({
//       message: "That email is already registered."
//     })
//     return;
//   }

//   const passwordDigest = await bcrypt.hash(password, 12);

//   const user = await User.({
//     firstName: firstName,
//     lastName: lastName,
//     favoriteTeam: favoriteTeam,
//     email: email,
//     passwordDigest: passwordDigest
//   });

//   const token = jwt.sign({ userId: user.id }, jwtSecret);
//   response.json({
//     token: token
//   });
// });

app.get('/api/:favoriteTeam/games', async (request, response) => {
  const favoriteTeam = request.params.favoriteTeam
  const favoriteTeamGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: favoriteTeam },
        { awayTeam: favoriteTeam }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(favoriteTeamGames);
})

app.post('/api/:id/userGames', async (request, response) => {
  const gameId = request.params.id
  const token = request.headers['jwt-token'];
  const verify = await jwt.verify(token, jwtSecret);

  const userGame = await UserGame.create({
    userId: verify.userId,
    gameId: gameId,
  });
  response.json(userGame);
});

app.get('/api/:id/userGames', async (request, response) => {
  const userId = request.params.id
  const sequelizeOptions = {};
  const token = request.headers['jwt-token'];
  const verify = await jwt.verify(token, jwtSecret);
  
  sequelizeOptions.include = {
    model: User,
    where: {
      id: userId,
    },
    attributes: []
  }
  const userGame = await Game.findAll(sequelizeOptions);
  response.json(userGame);
});


app.get('/api/teams', async (request, response) => {
  const teams = await Team.findAll();
  response.json(teams)
})

app.post('/api/login', async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400).json({
      message: "Please Provide an Email and Password"
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

app.get('/api/current-user', async (request, response) => {
  const token = request.headers['jwt-token'];
  const verify = await jwt.verify(token, jwtSecret);

  const user = await User.findOne({
    where: {
      id: verify.userId
    }
  });
  response.json({
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    favoriteTeam: user.favoriteTeam,
    email: user.email,
  })
});

app.get('/api/favoriteTeam', async (request, response) => {
  const token = request.headers['jwt-token'];
  const verify = await jwt.verify(token, jwtSecret);
  const favoriteTeam = verify.favoriteTeam;

  console.log(verify);
  const sequelizeOptions = {
    where: {
      $or: [
        { homeTeam: favoriteTeam },
        { awayTeam: favoriteTeam }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  }

  if (request.query.userId) {
    sequelizeOptions.include = {
      model: User,
      where: {
        favoriteTeam: verify.favoriteTeam
      },
      attributes: []
    }
  };
  const game = await Game.findAll({ sequelizeOptions });
  response.json(game);
  console.log('hello');

});

app.get('/api/games', async (request, response) => {
  const games = await Game.findAll({});
  response.json(games);
})

if (process.env.NODE_ENV == "production") {
  app.get("/*", function(request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
