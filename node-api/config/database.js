var databaseConfig = { 
    user: process.env['DB_USER'] || "root",
    password: process.env['DB_PASS'] || "",
    database: process.env['DB_NAME'] || "coolestprojects",
    host: process.env['DB_HOST'] || "localhost",
    port: 3306
};

module.exports = databaseConfig;