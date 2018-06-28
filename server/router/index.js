var routes = [
    require("./routes/employees"),
    require("./routes/departments")
];

module.exports = function router(app, db, checkJwt, jwtAuthz) {
    return routes.forEach((route) => {
        route(app, db, checkJwt, jwtAuthz);
    });
};