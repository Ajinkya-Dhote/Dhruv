#! /bin/sh

for project in disocvery gateway product ui ui5-admin
do
        docker build --tag ajinkyadhote/dhruv-$project ../$project/ && docker push ajinkyadhote/dhruv-$project &
done





