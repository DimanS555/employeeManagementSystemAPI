module.exports=(sequalize, DataTypes) => {
    const department = sequalize.define('department',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        depName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return department;
};