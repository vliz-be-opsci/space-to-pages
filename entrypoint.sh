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

echo "base_uri is" $2
#make a .env file with the crate_path variable
echo "REACT_APP_BASE_URI=$2" >> .env

#echo cat of the .env file
cat .env

#echo the repo name that called this action
echo "repo name is" $GITHUB_REPOSITORY

#setup here for making the build folder
#check if the following files are present in ./github/workspace : [./src/data/contact.json, ./src/data/main_data.json]
# if they are not present, then throw an error
echo "checking if the following files are present in ./github/workspace : [./src/data/contacts.json, ./src/data/main_data.json, ./src/data/project_crates.json, ./src/data/project_profiles.json, ./src/data/tabular_data.json]"
if [ -f ./github/workspace/data/contacts.json ] && [ -f ./github/workspace/data/main_data.json ] && [ -f ./github/workspace/data/project_crates.json ] && [ -f ./github/workspace/data/project_profiles.json ] && [ -f ./github/workspace/data/tabular_data.json ] && [ -f ./github/workspace/data/publications.json ];
then
    echo "all files are present"
    #copy the files over into ./src/data
    echo "copying the files over into ./src/data"
    cp ./github/workspace/data/contacts.json ./src/data/contacts.json
    cp ./github/workspace/data/main_data.json ./src/data/main_data.json
    cp ./github/workspace/data/project_crates.json ./src/data/project_crates.json
    cp ./github/workspace/data/project_profiles.json ./src/data/project_profiles.json
    cp ./github/workspace/data/tabular_data.json ./src/data/tabular_data.json
    cp ./github/workspace/data/publications.json ./src/data/publications.json
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

    #make a url from the repo name and user or organisation name followed by /blob/master/README.md
    echo "making a url from the repo name and user or organisation name followed by /blob/master/README.md"
    url="https://raw.githubusercontent.com/$GITHUB_REPOSITORY/main/README.md"

    #echo the url
    echo "url is" $url

    #open the ./src/data/main_data.json and change the value of the key "markdown_about_us" to the url
    echo "opening the ./src/data/main_data.json and changing the value of the key markdown_about_us to the url"
    sed -i "s|\"markdown_about_us\": \".*\"|\"markdown_about_us\": \"$url\"|g" ./src/data/main_data.json

else
    echo "readme.md file is not present"
    exit 1
fi

#install pip requirements from requirements.txt
echo "installing pip requirements from requirements.txt"
pip install -r requirements.txt --no-cache-dir
#run the commands.sh file located in the pysubyt folder
echo "running the commands.sh file located in the pysubyt folder"
cd pysubyt

echo "removing the old output folder contents if they exist"
rm -rf ./outputs/*
#then run the pysubyt command
echo "running the pysubyt commands"
python -m pysubyt -t ./templates/  \
       -s contact ../src/data/contacts.json \
       -s main ../src/data/main_data.json \
       -s project_crate ../src/data/project_crates.json \
       -s project_profile ../src/data/project_profiles.json \
       -n metadata.ttl -o outputs/metadata.ttl \
       -v base_uri $2

cd ..

#copy over the pysubyt/outputs/metadata.ttl file to ./github/workspace/unicornpages/metadata.ttl
echo "copying over the pysubyt/outputs/metadata.ttl file to ./github/workspace/unicornpages/metadata.ttl"
cp ./pysubyt/outputs/metadata.ttl ./public/metadata.ttl

echo "installing dependencies for building react app"
npm install
echo "npm run build"
npm run build
echo "copying over scr files to build folder"
#in the index.html add the following line <link href="./metadata.ttl" rel="describedby" type="	text/turtle"> to the head tag
echo "in the index.html add the following line <link href="./metadata.ttl" rel="describedby" type="text/turtle"> to the head tag"
sed -i "s|</head>|<link href="./metadata.ttl" rel="describedby" type="text/turtle"></head>|g" ./build/index.html
rsync --recursive --progress ./build/* ./github/workspace/unicornpages
ls -a ./github/workspace/unicornpages
#echo contents of the index.html file
echo "contents of the index.html file"
cat ./github/workspace/unicornpages/index.html
