const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Sequelize = require("sequelize");
const db = new Sequelize("postgres://postgres:secret@localhost:5432/postgres", {
  define: { timestamps: false }
});

const Movie = db.define("movie", {
  title: {
    type: Sequelize.TEXT
  },
  yearOfRelease: {
    type: Sequelize.INTEGER
  },
  synopsis: {
    type: Sequelize.TEXT
  }
});

db.sync()
  .then(() => console.log("Movies table created"))
  .then(() => {
    for (let i = 1; i < 4; i++) {
      Movie.create({
        title: "Gisaengchung",
        yearOfRelease: "2019",
        synopsis: "Ki-woo wakes up in the hospital"
      })
        .then(() => console.log(`Movie Nr.: ${i} added to DB.`))
        .catch(err => console.log(`Movie Nr.: ${i} was NOT added to DB.`, err));
    }
  })
  .catch(err => {
    console.error("Unable to create tables", err);
    process.exit(1);
  });

app.post("/movies", (req, res, next) => {
  const movie = req.body;
  Movie.create(movie)
    .then(newMovie => res.status(201).json(newMovie))
    .catch(next);
});

app.get("/movies", (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 50);
  const offset = req.query.offset || 0;

  Movie.findAndCountAll({
    limit,
    offset
  })
    .then(result => res.json({ data: result.rows, total: result.count }))
    .catch(error => next(error));
});

app.get("/movies/:movieId", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

app.put("/movies/:movieId", (req, res, next) => {
  Movie.findByPk(req.params.movieId)
    .then(movie => {
      if (movie) {
        return movie.update(req.body);
      } else {
        return res.status(404).end();
      }
    })
    .then(movie => res.json(movie))
    .catch(next);
});

app.delete("/movies/:movieId", (req, res, next) => {
  Movie.destroy({ where: { id: req.params.movieId } })
    .then(number => {
      if (number !== 0) {
        return res.json({ removed: number });
      } else {
        return res.status(404).end();
      }
    })
    .catch(next);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
