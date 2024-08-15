const express = require("express");
const router = express.Router();
const { subjectController, userController } = require("../controllers/index");
const apiAuth = require("../middlewares/apiAuth");

//= ===============================
// API routes
//= ===============================

//** user endpoint */
router.get('/singleUser/:userId', apiAuth, userController.singleUserData);
router.put('/updateUser/:userId', apiAuth, userController.updateUserData);

//** search endpoint */
router.get('/search', userController.searchFilter);
router.get('/searchData', userController.searchFilterDetails);

//** subject endpoint */
router.get("/subject", apiAuth, subjectController.getAllSubject);
router.post("/createSubject", apiAuth, subjectController.createSubject);

//** subjectMapping endPoint */
router.get("/subjectMapping", apiAuth, subjectController.getAllSubjectMapping);
module.exports = router