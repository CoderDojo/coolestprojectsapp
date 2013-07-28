#!/bin/sh

# Check if Node & NPM is installed
command -v node >/dev/null 2>&1 || { echo >&2 "NodeJS isn't installed. Please try installing node. For instructions take a look at this page: http://howtonode.org/how-to-install-nodejs"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 "NPM isn't installed."; exit 1; }

# Install node modules
npm install

# Get MySQL credentials
echo "Enter your database host name:"
read CPB_SQL_HOST
echo "Enter your database user name:"
read CPB_SQL_USER
echo "Enter your database password:"
read CPB_SQL_PASS
echo "Enter your database name:"
read CPB_SQL_NAME

# Create runscript and load all the env variables
cat > runDevScript.sh <<DELIM
#!/bin/bash
DB_HOST=$CPB_SQL_HOST
DB_USER=$CPB_SQL_USER
DB_PASS=$CPB_SQL_PASS
DB_NAME=$CPB_SQL_NAME
export DB_HOST DB_USER DB_PASS DB_NAME
node app.js
DELIM

# Set execute on runDevScript.sh
chmod +x runDevScript.sh

# YAY!
echo <<DELIM
We've created a file so that you can run the node server easily and
automatically
