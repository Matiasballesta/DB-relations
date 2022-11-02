const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");

const { Person, Movie, Role } = require("../db");

router.get("/", async (req, res) => {
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
});

module.exports = router;

/* Realizando la consulta sin limpiar la data.
 http://localhost:3000/person?person=Matias  */

 [
  {
      "id": 1,
      "name": "Matias",
      "lastname": "Ballesta",
      "age": 28,
      "roles": [
          {
              "id": 1,
              "role": "Actor",
              "personId": 1,
              "movieId": 1,
              "movie": {
                  "id": 1,
                  "title": "Rambo",
                  "year": 2001
              }
          },
          {
              "id": 2,
              "role": "Director",
              "personId": 1,
              "movieId": 1,
              "movie": {
                  "id": 1,
                  "title": "Rambo",
                  "year": 2001
              }
          },
          {
              "id": 3,
              "role": "Actor",
              "personId": 1,
              "movieId": 3,
              "movie": {
                  "id": 3,
                  "title": "Batman",
                  "year": 2003
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
      "age": 28,
      "movie": [
          "Rambo",
          "Rambo",
          "Batman"
      ],
      "role": [
          "Actor",
          "Director",
          "Actor"
      ]
  }
]

//Las posiciones de los arreglos en movie corresponden al role de cada pelicula en su misma posicion :). 