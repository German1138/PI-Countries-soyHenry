const { Router, response } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");
const { Country, Activity, CountryActivity } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getData = async () => {
  const dbInfo = await Country.findAll();
  if (dbInfo.length >= 250) {
    console.log("Returning info from the dataBase");
    return dbInfo;
  } else {
    const apiInfo = await axios
      .get("https://restcountries.com/v3/all")
      .then((response) =>
        response.data?.map((el) => {
          return {
            id: el.cca3,
            name: el.name.common,
            image: el.flags[1],
            continents: el.continents[0],
            capital: el.capital ? el.capital[0] : "Not found",
            subregion: el.subregion ? el.subregion : "Not found",
            area: el.area,
            population: el.population,
          };
        })
      );

    apiInfo.forEach((el) => {
      Country.findOrCreate({
        where: {
          id: el.id,
          name: el.name,
          image: el.image,
          continents: el.continents,
          capital: el.capital,
          subregion: el.subregion,
          area: el.area,
          population: el.population,
        },
      });
    });
    const dbInfo = await Country.findAll();

    return dbInfo;
  }
};

router.get("/countries", async (req, res) => {
  if (req.query.state && req.query.state.length) {
    const aux = req.query.state;
    const selectedCountries = await Country.findAll({
      where: { continents: aux },
    });
    if (selectedCountries && selectedCountries.length) {
      res.status(200).send(selectedCountries);
    } else {
      let selectedActivity = await Country.findAll({
        include: { model: Activity, where: { name: aux } },
      });
      res.status(200).send(selectedActivity);
    }
  } else if (req.query.name && req.query.name.length) {
    try {
      const name = req.query.name;
      let countryFound = await axios
        .get(`https://restcountries.com/v3/name/${name}`)
        .then((response) =>
          response.data.map((el) => {
            return {
              id: el.cca3,
              name: el.name.common,
              image: el.flags[1],
              continents: el.continents[0],
            };
          })
        );

      countryFound && res.status(200).send(countryFound);
    } catch (error) {
      res.status(404).send("Country not found");
    }
  } else {
    const allCountries = await getData();
    res.status(200).send(allCountries);
  }
});

router.get("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // FORMA 1 con EndPoint
    /* const dataCountry = await axios
      .get(`https://restcountries.com/v3/alpha/${id}`)
      .then((response) =>
        response.data.map((el) => {
          return {
            id: el.cca3,
            name: el.name.common,
            image: el.flags[0],
            continents: el.continents[0],
            capital: el.capital ? el.capital[0] : "Not found",
            subregion: el.subregion ? el.subregion : "Not found",
            area: el.area,
            population: el.population,
          };
        })
      );

    const countryActivities = await Activity.findAll({
      include: {
        model: Country,
        where: { id: dataCountry[0].id },
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const allCountryData = dataCountry.concat(countryActivities);
 */
    // Forma 2, sin codear a las tres de la mañana
    let buscado = await Country.findOne({
      where: { id: id },
      include: Activity,
    });

    res.status(200).send(buscado);
  } catch (error) {
    res.status(404).send("Country not found");
  }
});

router.post("/activities", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    let newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    const dbCountries = await Country.findAll({
      where: {
        id: countries,
      },
    });

    console.log(dbCountries);
    await newActivity.addCountry(dbCountries);

    //await dbCountries.addActivity(newActivity);

    res.send(newActivity);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/activities", async (req, res) => {
  const dbActivities = await Activity.findAll({ include: Country });
  res.status(200).send(dbActivities);
});

module.exports = router;
