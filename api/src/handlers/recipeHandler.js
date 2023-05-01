const { getRecipeController, getIdRecipe, getRecipeName, createRecipe } = require('../controllers/recipeController.js');

const getRecipe = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const recipeByName = await getRecipeName(name);
            return res.status(200).send(recipeByName);
        }
        const allRecipe = await getRecipeController();
        return res.status(200).send(allRecipe);
    } catch (error) {
        res.status(404).json({ error: `Error getRecipe ${error.message}` });
    }
}

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "api";

    try {
        const recipeId = await getIdRecipe(id, source);
        res.status(200).send(recipeId);
    } catch (error) {
        res.status(404).json({ error: `Error getRecipeById ${error.message}` });
    }

}

const postRecipe = async (req, res) => {
    const { name, image, summary, healthScore, instructions, diets } = req.body;
    try {
        if (!name || !image || !summary || !healthScore || !instructions || !diets) return res.status(401).json(`Data are needed for create this recipe`);
        const newRecipe = await createRecipe({ name, image, summary, healthScore, instructions, diets });
        res.status(200).send(newRecipe);
    } catch (error) {
        res.status(404).json({ error: `Error postRecipe ${error.message}` });
    }
}

module.exports = { getRecipe, postRecipe, getRecipeById };