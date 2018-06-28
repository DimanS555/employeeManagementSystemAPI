module.exports = (app, db, checkIfAuthenticated, jwtAuthz) => {
    // GET all departments
    app.get('/departments', checkIfAuthenticated, (req, res) => {
        db.department.findAll({
            attributes: ['id', 'depName']
        })
            .then(departments => {
                res.send(departments);
            });
    });
    // GET single employee by id
    app.get('/departments/:id', checkIfAuthenticated, (req, res) => {
        let depId = req.params.id;
        db.department.find({
            where: {
                id: depId
            }
        })
            .then(department => {
                res.json(department);
            });
    });
};