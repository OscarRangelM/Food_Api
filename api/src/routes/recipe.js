const { Router } = require('express');
const { getRecipe, postRecipe, getRecipeById } = require('../handlers/recipeHandler.js');

const router = Router();

router.get("/", getRecipe);
router.get("/:id", getRecipeById);
router.post("/", postRecipe);

module.exports = router;