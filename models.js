const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'fanstar_db',
  dialect: 'postgres'
});


const User = sequelize.define('user', {
  email: Sequelize.TEXT,
  passwordDigest: { type: Sequelize.STRING, unique: true }
});

const Game = sequelize.define('event', {
  date: Sequelize.DATEONLY,
  location: Sequelize.TEXT
});

const Team = sequelize.define('team', {
  name: Sequelize.TEXT
});

const UserGame = sequelize.define('userGame');

const GameTeam = sequelize.define('gameTeam');

User.belongsToMany(Game, { through: UserGame });
Team.belongsToMany(Game, { through: GameTeam });

module.exports = {
  User,
  Game,
  Team,
  UserGame,
  GameTeam,
  sequelize: sequelize
};
