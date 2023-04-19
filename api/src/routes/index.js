const { Router } = require('express');

const dietsRouter = require("./diets.js");
const recipeRouter = require("./recipe.js");


const router = Router();

router.use("/diets", dietsRouter);
router.use("/recipes", recipeRouter);

module.exports = router;
