

echo "Starting Dev Script"
# run api server

cd ..
cd server/api/scripts
bash ./dev.sh
cd -



#run supabase
cd server/supabase/docker/scripts
bash ./dev.sh
cd -


# start of ui scripts


# run ui main
cd uis/main/scripts
bash ./dev.sh
cd -


### @BRO-NEW-UI-SCRIPT-START





### @BRO-NEW-UI-SCRIPT-END


echo "End of Dev Script"






