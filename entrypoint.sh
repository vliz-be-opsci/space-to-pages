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
echo "checking if the following files are present in ./github/workspace : [./src/data/contacts.json, ./src/data/main_data.json, ./src/data/project_crates.json, ./src/data/project_profiles.json, ./src/data/tabular_data.json]"
if [ -f ./github/workspace/data/contacts.json ] && [ -f ./github/workspace/data/main_data.json ] && [ -f ./github/workspace/data/project_crates.json ] && [ -f ./github/workspace/data/project_profiles.json ] && [ -f ./github/workspace/data/tabular_data.json ];
then
    echo "all files are present"
    #copy the files over into ./src/data
    echo "copying the files over into ./src/data"
    cp ./github/workspace/data/contacts.json ./src/data/contacts.json
    cp ./github/workspace/data/main_data.json ./src/data/main_data.json
    cp ./github/workspace/data/project_crates.json ./src/data/project_crates.json
    cp ./github/workspace/data/project_profiles.json ./src/data/project_profiles.json
    cp ./github/workspace/data/tabular_data.json ./src/data/tabular_data.json
else
    echo "one or more files of the data folder are missing"
    exit 1
fi

#check if there is a img folder in ./github/workspace, if so copy it over to ./src/img recursively with force overwrite
echo "checking if there is a img folder in ./github/workspace"
if [ -d ./github/workspace/img ];
then
    echo "img folder is present"
    echo "copying the img folder over to ./src/img"
    cp -r ./github/workspace/img ./src/img
else
    echo "img folder is not present"
fi

#check if there is a readme.md file in ./github/workspace, if so thencopy it over , else throw an error
echo "checking if there is a readme.md or README.md file in ./github/workspace"
if [ -f ./github/workspace/readme.md ] || [ -f ./github/workspace/README.md ];
then
    echo "readme.md file is present"
    echo "copying the readme.md file over to ./src/readme.md"
    cp -f ./github/workspace/readme.md ./public/README.md
    cp -f ./github/workspace/README.md ./public/README.md 
else
    echo "readme.md file is not present"
    exit 1
fi

echo "installing dependencies for building react app"
npm install
echo "npm run build"
npm run build
echo "copying over scr files to build folder"
rsync --recursive --progress ./build/* ./github/workspace/unicornpages
ls -a ./github/workspace/unicornpages