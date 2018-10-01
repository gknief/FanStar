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

app.get('/api/games', async (request, response) => {
  const gameList = await Game.findAll({});
  response.json(gameList);
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

// GAMESLIST START



app.get('/api/ducks/games', async (request, response) => {
  const ducksGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Anaheim Ducks' },
        { awayTeam: 'Anaheim Ducks' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(ducksGames)
})

app.get('/api/coyotes/games', async (request, response) => {
  const coyotesGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Arizona Coyotes' },
        { awayTeam: 'Arizona Coyotes' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(coyotesGames)
})

app.get('/api/bruins/games', async (request, response) => {
  const bruinsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Boston Bruins' },
        { awayTeam: 'Boston Bruins' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(bruinsGames)
})

app.get('/api/sabres/games', async (request, response) => {
  const sabresGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Buffalo Sabres' },
        { awayTeam: 'Buffalo Sabres' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(sabresGames)
})


app.get('/api/flames/games', async (request, response) => {
  const flamesGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Calgary Flames' },
        { awayTeam: 'Calgary Flames' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(flamesGames)
})

app.get('/api/hurricanes/games', async (request, response) => {
  const hurricanesGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Carolina Hurricanes' },
        { awayTeam: 'Carolina Hurricanes' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(hurricanesGames)
})


app.get('/api/blackhawks/games', async (request, response) => {
  const blackhawksGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Chicago Blackhawks' },
        { awayTeam: 'Chicago Blackhawks' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(blackhawksGames)
})

app.get('/api/avalanche/games', async (request, response) => {
  const avalancheGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Colorado Avalanche' },
        { awayTeam: 'Colorado Avalanche' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(avalancheGames)
})

app.get('/api/bluejackets/games', async (request, response) => {
  const blueJacketsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Columbus Blue Jackets' },
        { awayTeam: 'Columbus Blue Jackets' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(blueJacketsGames)
})

app.get('/api/stars/games', async (request, response) => {
  const starsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Dallas Stars' },
        { awayTeam: 'Dallas Stars' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(starsGames)
})

app.get('/api/redwings/games', async (request, response) => {
  const redWingsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Detroit Red Wings' },
        { awayTeam: 'Detroit Red Wings' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(redWingsGames)
})

app.get('/api/oilers/games', async (request, response) => {
  const oilersGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Edmonton Oilers' },
        { awayTeam: 'Edmonton Oilers' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(oilersGames)
})

app.get('/api/panthers/games', async (request, response) => {
  const panthersGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Florida Panthers' },
        { awayTeam: 'Florida Panthers' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(panthersGames)
})

app.get('/api/kings/games', async (request, response) => {
  const kingsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Los Angeles Kings' },
        { awayTeam: 'Los Angeles Kings' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(kingsGames)
})

app.get('/api/wild/games', async (request, response) => {
  const wildGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Minnesota Wild' },
        { awayTeam: 'Minnesota Wild' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(wildGames)
})

app.get('/api/:team/games', async (request, response) => {
  const canadiensGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Montreal Canadiens' },
        { awayTeam: 'Montreal Canadiens' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(canadiensGames)
})

app.get('/api/predators/games', async (request, response) => {
  const predatorsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Nashville Predators' },
        { awayTeam: 'Nashville Predators' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(predatorsGames)
})

app.get('/api/devils/games', async (request, response) => {
  const devilsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'New Jersey Devils' },
        { awayTeam: 'New Jersey Devils' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(devilsGames)
})

app.get('/api/islanders/games', async (request, response) => {
  const islandersGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'New York Islanders' },
        { awayTeam: 'New York Islanders' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(islandersGames)
})

app.get('/api/rangers/games', async (request, response) => {
  const rangersGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'New York Rangers' },
        { awayTeam: 'New York Rangers' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(rangersGames)
})

app.get('/api/senators/games', async (request, response) => {
  const senatorsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Ottawa Senators' },
        { awayTeam: 'Ottawa Senators' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(senatorsGames)
})

app.get('/api/flyers/games', async (request, response) => {
  const flyersGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Philadelphia Flyers' },
        { awayTeam: 'Philadelphia Flyers' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(flyersGames)
})

app.get('/api/penguins/games', async (request, response) => {
  const penguinsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Pittsburgh Penguins' },
        { awayTeam: 'Pittsburgh Penguins' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(penguinsGames)
})

app.get('/api/sharks/games', async (request, response) => {
  const sharksGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'San Jose Sharks' },
        { awayTeam: 'San Jose Sharks' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(sharksGames)
})

app.get('/api/blues/games', async (request, response) => {
  const bluesGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'St. Louis Blues' },
        { awayTeam: 'St. Louis Blues' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(bluesGames)
})

app.get('/api/lightning/games', async (request, response) => {
  const lightningGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Tampa Bay Lightning' },
        { awayTeam: 'Tampa Bay Lightning' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(lightningGames)
})

app.get('/api/mapleleafs/games', async (request, response) => {
  const mapleLeafsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Toronto Maple Leafs' },
        { awayTeam: 'Toronto Maple Leafs' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(mapleLeafsGames)
})

app.get('/api/canucks/games', async (request, response) => {
  const canucksGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Vancouver Canucks' },
        { awayTeam: 'Vancouver Canucks' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(canucksGames)
})

app.get('/api/goldenknights/games', async (request, response) => {
  const goldenKnightsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Vegas Golden Knights' },
        { awayTeam: 'Vegas Golden Knights' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(goldenKnightsGames)
})

app.get('/api/capitals/games', async (request, response) => {
  const capitalsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Washington Capitals' },
        { awayTeam: 'Washington Capitals' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(capitalsGames)
})

app.get('/api/jets/games', async (request, response) => {
  const jetsGames = await Game.findAll({
    where: {
      $or: [
        { homeTeam: 'Winnipeg Jets' },
        { awayTeam: 'Winnipeg Jets' }
      ]
    },
    order: [
      ['date', 'ASC']
    ]
  });
  response.json(jetsGames)
})


// GAMESLIST END




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



app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
