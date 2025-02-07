const express = require("express");
const router = express.Router();
const {
  adminMiddleware,
  requireSignIn,
  authMiddleware,
} = require("../controllers/auth.controllers");
const {
  create,
  photo,
  list,
  remove,
  read,
  readForCreators,
  update,
  listForHomePage,
} = require("../controllers/mobileCategory.controller");

router.post("/mobile-category", requireSignIn, authMiddleware, create);
router.get("/mobile-category", list); //done(mobile>index,Mobile>brands>slug)
router.get("/mobile-category-list-home-page", listForHomePage);
router.get("/single-mobile-category/:slug", read); //done(mobile>index,Mobile>brands>slug)
router.get("/single-mobile-category-for-creators/:slug", readForCreators); //done(mobile>index,Mobile>brands>slug)
router.get("/mobile-category/photo/:slug", photo);
router.delete("/mobile-category/:slug", requireSignIn, adminMiddleware, remove);
router.put("/mobile-category/:slug", requireSignIn, adminMiddleware, update);

module.exports = router;
