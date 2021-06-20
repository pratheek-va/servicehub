const express = require("express");
const router = express.Router();
const scholorshipController = require("./../controllers/scholorshipController");

// router.param("id", scholorshipController.checkID);
router
  .route("/latest")
  .get(
    scholorshipController.aliasScholorship,
    scholorshipController.getScholorships
  );

router
  .route("/")
  .post(scholorshipController.createScholorship)
  .get(scholorshipController.getScholorships);
router
  .route("/:id")
  .get(scholorshipController.getScholorship)
  .patch(scholorshipController.updateScholorship)
  .delete(scholorshipController.deleteScholorship);

module.exports = router;
