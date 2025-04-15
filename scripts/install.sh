echo "Starting install script"

# install in server/api

cd server/api/scripts && bash ./install.sh
cd -

# install in uis/main

cd uis/main/scripts && bash ./install.sh
cd -


echo "End of Install Script"