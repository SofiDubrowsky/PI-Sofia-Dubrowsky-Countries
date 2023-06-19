const { Router } = require("express");

const countries = require('./countries'); 
const activities = require('./activities');

const router = Router();

router.use('/countries', countries);
router.use('/activities', activities);

module.exports = router;
