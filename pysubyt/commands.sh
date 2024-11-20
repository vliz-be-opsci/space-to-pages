# file that will generate ttl output from the json files using pysubyt
#first remove the old output folder contents if they exist
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
       -n metadata.ttl -o outputs/metadata.ttl \
       -v base_uri "base_uri"