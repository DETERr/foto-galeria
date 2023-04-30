module.exports = (app) => {
  const auth = require("../middlewares/auth.middleware.js");
  const images = require("../controllers/image.controller.js");
  const users = require("../controllers/user.controller.js");
  const albums = require("../controllers/album.controller.js");

  app.post("/new", auth, images.create);

  app.get("/", auth, images.findAll);

  app.get("/albums", auth, albums.findAll);

  app.get("/:id", auth, images.findOne);

  app.put("/:id/edit", auth, images.update);

  app.delete("/:id/delete", auth, images.delete);

  app.post("/albums/new", auth, albums.create);

  app.get("/albums/:id", auth, albums.findOne);

  app.put("/albums/:id/edit", auth, albums.update);

  app.delete("/albums/:id/delete", auth, albums.delete);

  app.post("/register", users.register);

  app.post("/login", users.login);
};
