const { Router } = require("express");

const countries = require('./countries'); 
const activities = require('./activities');

const router = Router();

router.use('/countries', countries);  //indico que mis rutas de countries van a ser todas /countries... 
router.use('/activities', activities); //lo mismo pero con activities -> /activities...

module.exports = router;
