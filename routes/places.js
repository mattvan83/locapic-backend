var express = require("express");
var router = express.Router();

const Place = require("../models/places");
const { checkBody } = require("../modules/checkBody");

router.post("/", (req, res) => {
  if (!checkBody(req.body, ["nickname", "name", "latitude", "longitude"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const { nickname, name, latitude, longitude } = req.body;

  const newPlace = new Place({
    nickname,
    name,
    latitude,
    longitude,
  });

  newPlace.save().then((place) => {
    if (place) {
      res.json({
        result: true,
      });
    } else {
      res.json({
        result: false,
        error: "New place failed to be registered",
      });
    }
  });
});

router.get("/:nickname", (req, res) => {
  Place.find({ nickname: req.params.nickname }).then((places) => {
    // if (places.length) {
    res.json({
      result: true,
      places: places,
    });
    // } else {
    //   res.json({
    //     result: false,
    //     error: "No places found for this nickname",
    //   });
    // }
  });
});

router.delete("/", (req, res) => {
  if (!checkBody(req.body, ["nickname", "name"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const { nickname, name } = req.body;

  Place.deleteOne({
    nickname,
    name,
  }).then((data) => {
    if (data.deletedCount > 0) {
      res.json({
        result: true,
      });
    } else {
      res.json({
        result: false,
        error: "The place hasn't been found for this nickname",
      });
    }
  });
});

module.exports = router;
