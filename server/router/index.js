var routes = [  
    require("./routes/employees"),
    require("./routes/departments")
];

module.exports = function router(app, db) {
    return routes.forEach((route) => {
      route(app, db);
    });
};