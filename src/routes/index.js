const express = require("express");
const userRoute = require("./user.route");
const apiRoute = require("./api");
// const apiAuthendicate = require("../middlewares/apiAuth");
const router = express.Router();

const defaultRoutes = [
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/api',
        route: apiRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
});

module.exports = router;