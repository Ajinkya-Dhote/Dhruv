#! /bin/sh

for project in disocvery gateway product mills ui ui5-admin
do
        docker pull ajinkyadhote/dhruv-$project
done
