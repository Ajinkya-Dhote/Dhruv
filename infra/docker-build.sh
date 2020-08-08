#! /bin/sh

for project in disocvery gateway product mills ui ui5-admin files-mgr
do
        docker build --tag ajinkyadhote/dhruv-$project ../$project/ && docker push ajinkyadhote/dhruv-$project &
done
