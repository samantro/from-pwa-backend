const Sequelize = require('sequelize');
const { PORT, MYSQL_URI, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

// database connection details
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: MYSQL_URI,
    dialect: 'mysql'
});

// start server after successful connection with database
async function connect(app) {
    try {
        await sequelize.authenticate();
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
    }
    catch (error) {
        console.error("Unable to connect to database.", error)
    }
}

module.exports = { connect, sequelize }