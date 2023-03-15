#!/bin/sh -l
pwd
ls -a
echo "listing all the files that are in the ../.. directory"
cd ../..
pwd
ls -a
#echo the env variable inputs.crate_path from the actions.yml file
echo "repo_path is" $1
#make a .env file with the crate_path variable
echo "REACT_APP_CRATE=$1" > .env
#echo cat of the .env file
cat .env

#echo the repo name that called this action
echo "repo name is" $GITHUB_REPOSITORY

#setup here for making the build folder
#check if the following files are present in ./github/workspace : [./src/data/contact.json, ./src/data/main_data.json]
# if they are not present, then throw an error
echo "checking if the following files are present in ./github/workspace : [./src/data/contacts.json, ./src/data/main_data.json]"
if [ -f ./github/workspace/data/contacts.json ] && [ -f ./github/workspace/data/main_data.json ]
then
    echo "all files are present"
    #copy the files over into ./src/data
    echo "copying the files over into ./src/data"
    cp ./github/workspace/data/contacts.json ./src/data/contacts.json
    cp ./github/workspace/data/main_data.json ./src/data/main_data.json
else
    echo "one or more files are missing"
    exit 1
fi
echo "installing dependencies for building react app"
npm install
echo "npm run build"
npm run build
echo "copying over scr files to build folder"
rsync --recursive --progress ./build/* ./github/workspace/unicornpages
ls -a ./github/workspace/unicornpages