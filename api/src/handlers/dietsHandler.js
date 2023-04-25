const { getDietsController } = require('../controllers/dietsController.js');

const getDiets = async (req, res) => {
    try {
        const getAllDiets = await getDietsController();
        return res.status(200).send(getAllDiets);
    } catch (error) {
        res.status(404).json({ error: `Error getDiets ${error.message}` });
    }
}

module.exports = { getDiets };



