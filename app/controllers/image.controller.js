const Image = require("../models/image.model.js");

exports.create = (req, res) => {
  if (!(req.body.src && req.body.author && req.body.comments)) {
    return res.status(400).send({
      message: "Image content can not be empty",
    });
  }

  const image = new Image({
    src: req.body.src,
    author: req.body.author,
    comments: req.body.comments,
  });
  image
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the image.",
      });
    });
};

exports.findAll = (req, res) => {
  Image.find()
    .then((images) => {
      res.send(images);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving images.",
      });
    });
};

exports.findOne = (req, res) => {
  Image.findById(req.params.id)
    .then((image) => {
      if (!image) {
        return res.status(404).send({
          message: "Image not found with id " + req.params.id,
        });
      }
      res.send(image);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Image not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving image with id " + req.params.id,
      });
    });
};

exports.update = (req, res) => {
  if (!(req.body.src && req.body.author)) {
    return res.status(400).send({
      message: "Image content can not be empty",
    });
  }

  Image.findByIdAndUpdate(
    req.params.id,
    {
      src: req.body.src,
      author: req.body.author,
      comments: req.body.comments,
    },
    { new: true }
  )
    .then((image) => {
      if (!image) {
        return res.status(404).send({
          message: "Image not found with id " + req.params.id,
        });
      }
      res.send(image);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Image not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating image with id " + req.params.id,
      });
    });
};

exports.delete = (req, res) => {
  Image.findByIdAndRemove(req.params.id)
    .then((image) => {
      if (!image) {
        return res.status(404).send({
          message: "Image not found with id " + req.params.id,
        });
      }
      res.send({ message: "Image deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Image not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete image with id " + req.params.id,
      });
    });
};
