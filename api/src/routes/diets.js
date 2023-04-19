const { Router } = require('express');
const { getDiets } = require('../handlers/dietsHandler.js');

const router = Router();

router.get("/", getDiets);

module.exports = router;