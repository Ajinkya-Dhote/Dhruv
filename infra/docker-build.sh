#! /bin/sh

for project in disocvery gateway product
do
        docker build --tag ajinkyadhote/dhruv-$project ../$project/ && docker push ajinkyadhote/dhruv-$project &
done





