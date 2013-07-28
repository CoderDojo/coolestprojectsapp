var databaseConfig = { 
    user: process.env['MYSQL_USER'] || "root",
    password: process.env['MYSQL_PASS'] || "",
    database: process.env['MYSQL_NAME'] || "coolestprojects",
    host: process.env['MYSQL_HOST'] || "localhost",
    port: 3306
};

module.exports = databaseConfig;