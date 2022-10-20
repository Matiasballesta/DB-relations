const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");

const { PersonRoleMovie, Movie, Role, Person } = require("../db");

router.get("/", async (req, res) => {
  try {
    const { person } = req.query;
    const personData = await Person.findAll({
      where: { name: { [Op.iLike]: `${person}` } },
      include: [
        {
          model: PersonRoleMovie,
          include: [{ model: Movie }, { model: Role }],
        },
      ],
    });
    const personClean = personData.map((data) => {
      return {
        name: data.name,
        lastname: data.lastname,
        age: data.age,
        movie: data.personRoleMovies.map((e) => e.movie.title),
        role: data.personRoleMovies.map((e) => e.role.role),
      };
    });
    res.send(personClean);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

/* Realizando la consulta sin limpiar la data.
 http://localhost:3000/person?person=Matias  */

 [
  {
      "id": 2,
      "name": "Matias",
      "lastname": "Ballesta",
      "age": 1993,
      "personRoleMovies": [
          {
              "id": 3,
              "personId": 2,
              "movieId": 1,
              "roleId": 3,
              "movie": {
                  "id": 1,
                  "title": "Batman",
                  "year": 2006
              },
              "role": {
                  "id": 3,
                  "role": "Actor"
              }
          },
          {
              "id": 4,
              "personId": 2,
              "movieId": 2,
              "roleId": 5,
              "movie": {
                  "id": 2,
                  "title": "Spiderman",
                  "year": 2004
              },
              "role": {
                  "id": 5,
                  "role": "Productor"
              }
          },
          {
              "id": 5,
              "personId": 2,
              "movieId": 2,
              "roleId": 3,
              "movie": {
                  "id": 2,
                  "title": "Spiderman",
                  "year": 2004
              },
              "role": {
                  "id": 3,
                  "role": "Actor"
              }
          }
      ]
  }
]

//Realizando la consulta con la data mas clean!
[
  {
      "name": "Matias",
      "lastname": "Ballesta",
      "age": 1993,
      "movie": [
          "Batman",
          "Spiderman",
          "Spiderman"
      ],
      "role": [
          "Actor",
          "Productor",
          "Actor"
      ]
  }
]

//Las posiciones de los arreglos en movie corresponden al role de cada pelicula en su misma posicion :). 