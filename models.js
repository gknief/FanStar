const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'fanstar_db',
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  firstName: Sequelize.TEXT,
  lastName: Sequelize.TEXT,
  favoriteTeam: Sequelize.TEXT,
  email: Sequelize.TEXT,
  passwordDigest: { type: Sequelize.STRING, unique: true }
});

const Game = sequelize.define('game', {
  date: Sequelize.DATEONLY,
  time: Sequelize.TIME,
  location: Sequelize.TEXT,
  awayTeam: Sequelize.TEXT,
  homeTeam: Sequelize.TEXT,
});

const Team = sequelize.define('team', {
  name: Sequelize.TEXT,
  arena: Sequelize.TEXT,
  location: Sequelize.TEXT,
  capacity: Sequelize.INTEGER,
  opened: Sequelize.INTEGER,
});

const UserGame = sequelize.define('userGame');

const GameTeam = sequelize.define('gameTeam');

User.belongsToMany(Game, { through: UserGame });
Game.belongsToMany(User, { through: UserGame });
Team.belongsToMany(Game, { through: GameTeam });
Game.belongsToMany(Team, { through: GameTeam });

module.exports = {
  User,
  Game,
  Team,
  UserGame,
  GameTeam,
  sequelize: sequelize
};
