const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");

const { Movie, Role, Person } = require("../db");


router.get("/", async (req, res) => {
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
    res.send(movieCleaner);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

/* Realizando la consulta sin limpiar la data.
 http://localhost:3000/movie?movie=Rambo  */
 [
    {
        "id": 1,
        "title": "Rambo",
        "year": 2001,
        "roles": [
            {
                "id": 1,
                "role": "Actor",
                "personId": 1,
                "movieId": 1,
                "person": {
                    "id": 1,
                    "name": "Matias",
                    "lastname": "Ballesta",
                    "age": 28
                }
            },
            {
                "id": 2,
                "role": "Director",
                "personId": 1,
                "movieId": 1,
                "person": {
                    "id": 1,
                    "name": "Matias",
                    "lastname": "Ballesta",
                    "age": 28
                }
            },
            {
                "id": 6,
                "role": "Actor",
                "personId": 2,
                "movieId": 1,
                "person": {
                    "id": 2,
                    "name": "Valentin",
                    "lastname": "Dizeo",
                    "age": 25
                }
            }
        ]
    }
]

//Realizando la consulta con la data mas limpia!

[
    {
        "title": "Rambo",
        "yearMovie": 2001,
        "personName": [
            "Matias",
            "Matias",
            "Valentin"
        ],
        "personLastname": [
            "Ballesta",
            "Ballesta",
            "Dizeo"
        ],
        "role": [
            "Actor",
            "Director",
            "Actor"
        ]
    }
]