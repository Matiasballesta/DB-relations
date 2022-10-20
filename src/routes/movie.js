const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");

const { PersonRoleMovie, Movie, Role, Person } = require("../db");

router.get("/", async (req, res) => {
  try {
    const { movie } = req.query;
    const movieData = await Movie.findAll({
      where: { title: { [Op.iLike]: `%${movie}%` } },
      include: [
        {
          model: PersonRoleMovie,
          include: [{ model: Person }, { model: Role }],
        },
      ],
    });
    const movieClean = movieData.map((data) => {
      return {
        title: data.title,
        yearMovie: data.year,
        personName: data.personRoleMovies.map((e) => e.person.name),
        personLastname: data.personRoleMovies.map((e) => e.person.lastname),
        role: data.personRoleMovies.map((e) => e.role.role),
      };
    });
    res.send(movieClean);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

/* Realizando la consulta sin limpiar la data.
 http://localhost:3000/movie?movie=Batman  */

 [
    {
        "id": 1,
        "title": "Batman",
        "year": 2006,
        "personRoleMovies": [
            {
                "id": 1,
                "personId": 1,
                "movieId": 1,
                "roleId": 1,
                "person": {
                    "id": 1,
                    "name": "Jose",
                    "lastname": "Perez",
                    "age": 2001
                },
                "role": {
                    "id": 1,
                    "role": "Actor"
                }
            },
            {
                "id": 2,
                "personId": 1,
                "movieId": 1,
                "roleId": 2,
                "person": {
                    "id": 1,
                    "name": "Jose",
                    "lastname": "Perez",
                    "age": 2001
                },
                "role": {
                    "id": 2,
                    "role": "Director"
                }
            },
            {
                "id": 3,
                "personId": 2,
                "movieId": 1,
                "roleId": 3,
                "person": {
                    "id": 2,
                    "name": "Matias",
                    "lastname": "Ballesta",
                    "age": 1993
                },
                "role": {
                    "id": 3,
                    "role": "Actor"
                }
            },
            {
                "id": 6,
                "personId": 2,
                "movieId": 1,
                "roleId": 5,
                "person": {
                    "id": 2,
                    "name": "Matias",
                    "lastname": "Ballesta",
                    "age": 1993
                },
                "role": {
                    "id": 5,
                    "role": "Productor"
                }
            }
        ]
    }
]

//Realizando la consulta con la data mas clean!

[
    {
        "title": "Batman",
        "yearMovie": 2006,
        "personName": [
            "Jose",
            "Jose",
            "Matias",
            "Matias"
        ],
        "personLastname": [
            "Perez",
            "Perez",
            "Ballesta",
            "Ballesta"
        ],
        "role": [
            "Actor",
            "Director",
            "Actor",
            "Productor"
        ]
    }
]
