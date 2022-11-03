const { Op } = require("sequelize");

const { Person, Movie, Role } = require("../db");

const personController = async (req, res) => {
  try {
    const { person } = req.query;
    const personData = await Person.findAll({
      where: { name: { [Op.iLike]: `${person}` } },
      include: {
        model: Role,
        include: Movie
      }
    });
    const personCleaner = personData.map((data) => {
      return {
        name: data.name,
        lastname: data.lastname,
        age: data.age,
        movie: data.roles.map((e) => e.movie.title),
        role: data.roles.map((e) => e.role),
      };
    });
    res.send(personCleaner);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {personController};

