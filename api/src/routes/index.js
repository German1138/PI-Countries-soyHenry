const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getActivities,
  getCountries,
  getCountryId,
  postActivities,
  getSearchedCountry,
} = require("../controllers/Countries.controller");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", getCountries);
router.get("/countries/filter/:filter", getCountries);
//router.get("/countries/:continents/:activity", getCountries);
router.get("/countries/:id", getCountryId);
router.get("/countriesSearch", getSearchedCountry);

router.post("/activities", postActivities);
router.get("/activities", getActivities);

module.exports = router;
