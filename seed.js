// Require model file here
const csvTeamPath = './public/data/teams.csv'
const csvGamePath = './public/data/game.csv'
const csvUserPath = './public/data/user.csv'
const csv = require('csvtojson')
const { User, Game, Team, UserGame, GameTeam, } = require('./models');

const main = async () => {
  const jsonArrayTeams = await csv().fromFile(csvTeamPath);
  const jsonArrayGame = await csv().fromFile(csvGamePath);
  const jsonArrayUser = await csv().fromFile(csvUserPath);

  // console.log(jsonArrayTeams);
  // console.log(jsonArrayGame);
  // console.log(jsonArrayTeams.length);
  // console.log(jsonArrayGame.length);
  // console.log(jsonArrayUser.length);

  for (let i = 0; i < jsonArrayTeams.length; i++) {
    var Teams = await Team.create({
      name: jsonArrayTeams[i].Teams,
      arena: jsonArrayTeams[i].Arena,
      location: jsonArrayTeams[i].Location,
      capacity: jsonArrayTeams[i].Capacity,
      opened: jsonArrayTeams[i].Opened,
    });
  }

  for (let i = 0; i < jsonArrayGame.length; i++) {
    var Games = await Game.create({
      date: jsonArrayGame[i].Date,
      time: jsonArrayGame[i].Time,
      location: jsonArrayGame[i].Location,
      awayTeam: jsonArrayGame[i].Away_Team,
      homeTeam: jsonArrayGame[i].Home_Team,
    });
    await Games.addTeam(Teams);
  }

  for (let i = 0; i < jsonArrayUser.length; i++) {
    var Users = await User.create({
      firstName: jsonArrayUser[i].First_Name,
      lastName: jsonArrayUser[i].Last_Name,
      favoriteTeam: jsonArrayUser[i].Favorite_Team,
      email: jsonArrayUser[i].Email,
      // passwordDigest: jsonArrayUser[i].Password,
    });
    await Users.addGame(Games);
  }

      

  process.exit();
}


main();