const { Router } = require("express");
const { userInfo } = require("os");
const User = require("../models/User");
const router = Router();

//Store User Data
router.post("/", (request, response) => {
  const newUser = new User(request.body);
  newUser.save((error, record) => {
    if (error) {
      console.log("ERROR:", error);
      return response.status(500).json(error);
    }
    return response.json(record);
  });
});

//Grab user by IP
router.get("/ip/:ip", (request, response) => {
  console.log("REQUEST BY IP:", request.headers);
  User.find({ ip: request.params.ip }, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

//Grab user by Name
router.get("/name/:name", (request, response) => {
  User.find({ name: request.params.name }, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.put("/:name", (request, response) => {
  const body = request.body.data;
  console.log(request.params.name, body);
  User.findOneAndUpdate(
    { name: request.params.name },
    {
      lat: body.lat,
      lon: body.lon,
      ip: body.ip,
      avatar: body.avatar
    },
    {
      new: true,
      upsert: true
    },
    (error, record) => {
      if (error) return response.status(500).json(error);
      return response.json(record);
    }
  );
});
module.exports = router;
