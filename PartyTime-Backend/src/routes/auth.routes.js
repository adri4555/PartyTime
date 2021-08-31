const router = require("express").Router();
import AuthControllers from "../controllers/rest/auth.controllers";
// import {authenticationToken} from "./../controllers/rest/auth.controllers";

//Import Controllers
//const { default as AuthControllers } = require("./../controllers/rest/auth.controllers");


const auth = "/auth"
router.post(auth + "/login" , AuthControllers.login );
// router.post(auth + "/register", AuthControllers.register);
// router.get(auth + '/whoami', authenticationToken, AuthControllers.whoIam);

module.exports = router;
