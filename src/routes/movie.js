const { Router } = require("express");
const router = Router();
const {movieController} = require('../controllers/movieController')


router.get("/", movieController);

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