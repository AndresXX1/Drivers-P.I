const { Driver, Team } = require("../db");

const createDriverDB = async (params) => {
    const { name, surname, description, nationality, birthdate,wins, TeamId } = params;
  
    const newDriver = await Driver.create({
      name,
      surname,
      description,
      nationality,
      birthdate,
      wins
    });
  
    if (TeamId && Array.isArray(TeamId)) {
      // Itera a través de los IDs de los equipos y vincula al conductor con cada uno
      for (const teamId of TeamId) {
        const team = await Team.findByPk(teamId);
        if (team) {
          // Vincula al conductor con el equipo encontrado
          await newDriver.addTeam(team);
        }
      }
    }
  
    return newDriver;
  };
module.exports = {
  createDriverDB,
};