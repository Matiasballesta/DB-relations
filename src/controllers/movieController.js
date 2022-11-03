const { Op } = require("sequelize");

const { Movie, Role, Person } = require("../db");


const movieController = async (req, res) => {
  try {
    const { movie } = req.query;
    const movieData = await Movie.findAll({
      where: { title: { [Op.iLike]: `%${movie}%` } },
      include: {
        model: Role,
        include: Person
      }
    });
    const movieCleaner = movieData.map((data) => {
      return {
        title: data.title,
        yearMovie: data.year,
        personName: data.roles.map((e) => e.person.name),
        personLastname: data.roles.map((e) => e.person.lastname),
        role: data.roles.map((e) => e.role),
      };
    });
    res.send(movieData);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {movieController};