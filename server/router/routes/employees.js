const { check, validationResult } = require('express-validator/check');

module.exports = (app, db) => {
    // GET all employees
    app.get('/employees', (req, res) => {
        let pageNo = parseInt(req.query.pageNo, 10);
        let limit = parseInt(req.query.limit, 10);
        if (pageNo < 0 || pageNo === 0) {
            let response = { error: true, message: "invalid page number, should start with 1" };
            return res.json(response);
        }
        let offset = limit * (pageNo - 1);
        db.employee.count({
            attributes: ['id']
        })
            .then(count => {
                let totalPages = Math.ceil(count / limit);
                db.employee.findAll({
                    attributes: ['id', 'firstName', 'lastName', 'isActive', 'emp_depID'],
                    limit: limit,
                    offset: offset,
                })
                    .then(employees => {
                        let pagination = {
                            currentPage: pageNo,
                            itemsPerPage: limit,
                            totalItems: count,
                            totalPages: totalPages
                        }
                        let response = {
                            result: employees,
                            pagingData: pagination
                        }
                        res.json(response);
                    });
            });

    });

    // POST single employee
    app.post('/employees', [
        check('firstName').exists().isAlpha(),
        check('lastName').exists().isAlpha(),
        check('emp_depID').isInt()
    ], (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let isActive = req.body.isActive;
        let emp_depID = req.body.emp_depID;
        if (!isActive) {
            isActive = 0;
        }
        db.employee.create({
            firstName: firstName,
            lastName: lastName,
            isActive: isActive,
            emp_depID: emp_depID
        })
            .then(newEmployee => {
                res.json(newEmployee);
            });
    });

    // PUT single employee
    app.put('/employees/:id', [
        check('firstName').exists().isAlpha(),
        check('lastName').exists().isAlpha(),
        check('emp_depID').isInt()
    ], (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let employeeId = req.params.id;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let isActive = req.body.isActive;
        let emp_depID = req.body.emp_depID;
        if (!isActive) {
            isActive = 0;
        }
        let updateAttributes = {
            firstName: firstName,
            lastName: lastName,
            isActive: isActive,
            emp_depID: emp_depID
        }
        let options = {
            where: {
                id: employeeId
            }
        }
        db.employee.update(updateAttributes, options)
            .then((updatedEmployee) => {
                res.json(updatedEmployee);
            });
    });

    // DELETE single employee
    app.delete('/employees/:id', (req, res) => {
        let employeeId = req.params.id;
        db.employee.destroy({
            where: {
                id: employeeId
            }
        })
            .then(deletedEmployee => {
                res.json(deletedEmployee);
            });
    });

    // GET single employee by id
    app.get('/employees/:id', (req, res) => {
        let employeeId = req.params.id;
        db.employee.find({
            where: {
                id: employeeId
            }
        })
            .then(employee => {
                res.json(employee);
            });
    });

    // SEARCH employees by name    
    app.get('/search', (req, res) => {
        let query = req.query.name;
        console.log(query.length);
        let empName;
        if (query.length > 0 && query.length <= 3) {
            empName = query;
        } else {
            empName = query.substring(0, 3);
        }
        db.employee.findAll({
            attributes: ['id', 'firstName', 'lastName', 'isActive', 'emp_depID'],
            where: {
                firstName: {
                    $like: empName + '%'
                }
            }
        })
            .then(searchedEmployees => {
                res.json(searchedEmployees);
            });
    });
};



