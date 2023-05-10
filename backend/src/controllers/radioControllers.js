const browse = (req, res) => {
  const { name } = req.query;

  if (!name) {
    fetch("http://91.132.145.114/json/stations/topclick?limit=20")
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    fetch(`http://91.132.145.114/json/stations/search?name=${name}&limit=20`)
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

module.exports = {
  browse,
};
