

echo "Starting Kill Script"
# run api server

cd ..
cd server/api/scripts
bash ./kill.sh
cd -



#run supabase
cd server/supabase/docker/scripts
bash ./kill.sh
cd -


# run ui main
cd uis/main/scripts
bash ./kill.sh
cd -



### @BRO-NEW-UI-SCRIPT-START
### @BRO-NEW-UI-SCRIPT-END


echo "End of Kill Script"






