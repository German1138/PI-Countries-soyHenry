const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getActivities,
  getCountries,
  getCountryId,
  postActivities,
} = require("../controllers/Countries.controller");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", getCountries);
router.get("/countries/:id", getCountryId);

router.post("/activities", postActivities);
router.get("/activities", getActivities);

module.exports = router;
