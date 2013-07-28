#!/bin/sh
command -v node >/dev/null 2>&1 || { echo >&2 "NodeJS isn't installed. Please try installing node. For instructions take a look at this page: http://howtonode.org/how-to-install-nodejs"; exit 1; }
npm install
echo "Enter your database host name:"
read CPB_SQL_HOST
echo "Enter your database user name:"
read CPB_SQL_USER
echo "Enter your database password:"
read CPB_SQL_PASS
echo "Enter your database name:"
read CPB_SQL_NAME
cat > runDevScript.sh <<DELIM
#!/bin/bash
MYSQL_HOST = $CPB_SQL_HOST
MYSQL_USER = $CPB_SQL_USER
MYSQL_PASS = $CPB_SQL_PASS
MYSQL_NAME = $CPB_SQL_NAME
node app.js
DELIM
echo <<DELIM
We've created a file so that you can run the node server easily and
automatically