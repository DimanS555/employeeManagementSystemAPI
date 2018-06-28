module.exports=(sequalize, DataTypes) => {
    const employee = sequalize.define('employee',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        emp_depID: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        }
    });
    return employee;
}