const Album = require("../models/album.model.js");

exports.create = (req, res) => {
  if (!(req.body.author && req.body.images)) {
    return res.status(400).send({
      message: "Album content can not be empty",
    });
  }

  const album = new Album({
    author: req.body.author,
    images: req.body.images,
  });

  album
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the album.",
      });
    });
};

exports.findAll = (req, res) => {
  Album.find()
    .then((albums) => {
      res.send(albums);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving albums.",
      });
    });
};

exports.findOne = (req, res) => {
  Album.findById(req.params.id)
    .then((album) => {
      if (!album) {
        return res.status(404).send({
          message: "Album not found with id " + req.params.id,
        });
      }
      res.send(album);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Album not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving album with id " + req.params.id,
      });
    });
};

exports.update = (req, res) => {
  if (!(req.body.author && req.body.images)) {
    return res.status(400).send({
      message: "Album content can not be empty",
    });
  }

  Album.findByIdAndUpdate(
    req.params.id,
    {
      author: req.body.author,
      images: req.body.images,
    },
    { new: true }
  )
    .then((album) => {
      if (!album) {
        return res.status(404).send({
          message: "Album not found with id " + req.params.id,
        });
      }
      res.send(album);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Album not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating album with id " + req.params.id,
      });
    });
};

exports.delete = (req, res) => {
  Album.findByIdAndRemove(req.params.id)
    .then((album) => {
      if (!album) {
        return res.status(404).send({
          message: "Album not found with id " + req.params.id,
        });
      }
      res.send({ message: "Album deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Album not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete album with id " + req.params.id,
      });
    });
};
