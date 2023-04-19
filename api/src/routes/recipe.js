const { Router } = require('express');
const { getRecipe, postRecipe } = require('../handlers/recipeHandler.js');

const router = Router();

router.get("/", getRecipe);
router.post("/", postRecipe);

module.exports = router;