const express = require("express");
const uuid = require("uuid/v4");
const bookmarkRouter = express.Router();
const bodyParser = express.json();

const logger = require("../logger");
const store = require("../dataStore");

bookmarkRouter
  .route("/")
  .get((req, res) => {
    res.json(store.bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating } = req.body;

    if (!title || title.trim().length < 1) {
      logger.error("Title is required");
      return res.status(400).send("'title' is required");
    }

    if (!url || url.trim().length < 5 || !url.includes("http")) {
      logger.error("'url' must be a valid URL");
      return res
        .status(400)
        .send(
          "'url' must be a valid URL"
        );
    }

    if (description && description.trim().length < 1) {
      logger.error("If description provided, must have at least one character");
      return res
        .status(400)
        .send("If description provided, must have at least one character");
    }

    if ((rating && rating < 1) || rating > 5) {
      logger.error("Rating should be number between 1 and 5, if provided");
      return res
        .status(400)
        .send("Rating should be number between 1 and 5, if provided");
    }

    const id = uuid();

    const bookmark = {
      id,
      title,
      url,
      description,
      rating
    };

    store.bookmarks.push(bookmark);

    logger.info(`Bookmark with id ${id} created.`);
    res
      .status(201)
      .location(`http://localhost:8080/bookmarks/${id}`)
      .json({ id });
  });

bookmarkRouter
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = store.bookmarks.find(bm => bm.id == id);

    if (!bookmark) {
      logger.error(`Bookmark with ${id} not found.`);
      return res.status(404).send("Bookmark Not Found");
    }
    res.json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bmIndex = store.bookmarks.findIndex(bm => bm.id == id);

    if (bmIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send("Bookmark Not Found");
    }

    store.bookmarks.splice(bmIndex, 1);
    logger.info(`Bookmark with id ${id} deleted.`);
    res.status(204).end();
  });

module.exports = bookmarkRouter;