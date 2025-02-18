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
echo "checking if the following files are present in ./github/workspace : [./src/data/contacts.json, ./src/data/main_data.json, ./src/data/project_crates.json, ./src/data/project_profiles.json, ./src/data/tabular_data.json, ./src/data/publications.json, ./src/data/vocabularies.json, ./src/data/ontologies.json, ./src/data/books.json, ./src/data/results.json]"

check_and_copy() {
    if [ ! -f $1 ]; then
        echo "File $1 is missing, creating an empty JSON file"
        echo "[]" > $1
    else
        python -m json.tool $1
    fi
    cp $1 $2
}

check_and_copy ./github/workspace/data/contacts.json ./src/data/contacts.json
check_and_copy ./github/workspace/data/main_data.json ./src/data/main_data.json
check_and_copy ./github/workspace/data/project_crates.json ./src/data/project_crates.json
check_and_copy ./github/workspace/data/project_profiles.json ./src/data/project_profiles.json
check_and_copy ./github/workspace/data/tabular_data.json ./src/data/tabular_data.json
check_and_copy ./github/workspace/data/publications.json ./src/data/publications.json
check_and_copy ./github/workspace/data/vocabularies.json ./src/data/vocabularies.json
check_and_copy ./github/workspace/data/ontologies.json ./src/data/ontologies.json
check_and_copy ./github/workspace/data/books.json ./src/data/books.json
check_and_copy ./github/workspace/data/results.json ./src/data/results.json


echo "copying over the ./img folder to ./public/img"
cp -r ./github/workspace/img ./public



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
if [ -f ./github/workspace/readme.md ] || [ -f ./github/workspace/README.md ] || [ -f ./github/workspace/README.MD ] || [ -f ./github/workspace/readme.MD ] ;
then
    echo "readme.md file is present"
    echo "copying the readme.md file over to ./src/readme.md"
    cp -f ./github/workspace/README.MD ./public/README.md
    cp -f ./github/workspace/readme.md ./public/README.md
    cp -f ./github/workspace/readme.MD ./public/README.md
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

#check if CNAME file is present in ./github/workspace, if so then copy it over to ./public
echo "checking if CNAME file is present in ./github/workspace"
if [ -f ./github/workspace/CNAME ];
then
    echo "CNAME file is present"
    echo "copying the CNAME file over to ./public"
    cp ./github/workspace/CNAME ./public/CNAME
else
    echo "CNAME file is not present"
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
sema-subyt -t ./templates/  \
       -s contact ../src/data/contacts.json \
       -s main ../src/data/main_data.json \
       -s publications ../src/data/publications.json \
       -s project_crate ../src/data/project_crates.json \
       -s project_profile ../src/data/project_profiles.json \
       -s vocabulary ../src/data/vocabularies.json \
       -s ontology ../src/data/ontologies.json \
       -n metadata.ttl -o outputs/metadata.ttl \
       -v base_uri $2

cd ..

#copy over the pysubyt/outputs/metadata.ttl file to ./github/workspace/unicornpages/metadata.ttl
echo "copying over the pysubyt/outputs/metadata.ttl file to ./github/workspace/unicornpages/metadata.ttl"
cp ./pysubyt/outputs/metadata.ttl ./public/metadata.ttl
echo "REACT_APP_GH_REPO=$GITHUB_REPOSITORY" >> .env
echo "installing dependencies for building react app"
npm install
echo "npm run build"
npm run build
echo "copying over ./img files to build folder ./build/img"

#in the index.html add the following line <link href="./metadata.ttl" rel="describedby" type="	text/turtle"> to the head tag
echo "adding the following line <link href="./metadata.ttl" rel="describedby" type="text/turtle"> to the head tag of the index.html file"
sed -i "s|</head>|<link href=\"./metadata.ttl\" rel=\"describedby\" type=\"text/turtle\"></head>|g" ./build/index.html

#in the index.html add a script tag type="text/turtle" with as content the contents of the metadata.ttl file to the head tag
echo put the cat output of the metadata.ttl file in the index.html file as a script tag type="text/turtle" 
sed -i "s|</head>|<script type=\"text/turtle\">$(cat ./public/metadata.ttl)</script></head>|g" ./build/index.html

#in index.html change the <head><meta name="description"> to what was provided in ./src/data/main_data.json keys "description"
#echo "in index.html change the <head><meta name="description"> and <title> to what was provided in ./src/data/main_data.json keys "description" and "long_name""
#sed -i "s|<meta name=\"description\" content=\".*\">|<meta name=\"description\" content=\"$(jq -r '.description' ./src/data/main_data.json)\">|g" ./build/index.html

#add the title tag with the long_name from ./src/data/main_data.json
sed -i "s|<title>.*</title>|<title>$(jq -r '.long_name' ./src/data/main_data.json)</title>|g" ./build/index.html

#in index.html replace <body></body> with <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top"><div id="root"></div><script type="text/javascript" src="js/jquery.1.11.1.js"></script><script type="text/javascript" src="js/bootstrap.js"></script></body>
#sed -i "s|<body>|<body id=\"page-top\" data-spy=\"scroll\" data-target=\".navbar-fixed-top\"><div id=\"root\"></div><script type=\"text/javascript\" src=\"js/jquery.1.11.1.js\"></script><script type=\"text/javascript\" src=\"js/bootstrap.js\"></script>|g" ./build/index.html

rsync --recursive --progress ./build/* ./github/workspace/unicornpages
ls -a ./github/workspace/unicornpages
#echo contents of the index.html file
echo "contents of the index.html file"
cat ./github/workspace/unicornpages/index.html
