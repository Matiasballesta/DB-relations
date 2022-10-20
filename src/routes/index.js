const { Router } = require("express");
const router = Router();

const personRoute = require("./person");
const movieRoute = require("./movie");

router.use("/person", personRoute);
router.use("/movie", movieRoute);

module.exports = router;
