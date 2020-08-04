#! /bin/sh

docker service create \
        --name dhruv-postgres \
        -e POSTGRES_DB=pratideen \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=postgres \
        --mount type=bind,source=/home/ec2-user/dhruv-data,destination=/var/lib/postgresql/data/ \
        --mount type=bind,source=/home/ec2-user/schema.sql,destination=/docker-entrypoint-initdb.d/schema.sql \
        --network=dhruv \
        -p 5432:5432 \
        postgres:12
        

docker service create \
        --name dhruv-disocvery \
        --network=dhruv \
        -p 8082:8082 \
        ajinkyadhote/dhruv-disocvery
        
docker service create \
        --name dhruv-gateway \
        --network=dhruv \
        -p 8081:8081 \
        ajinkyadhote/dhruv-gateway
        
docker service create \
        --name dhruv-product \
        --network=dhruv \
        -p 8084:8084 \
        ajinkyadhote/dhruv-product
        
docker service create \
        --name dhruv-mills \
        --network=dhruv \
        -p 8085:8085 \
        ajinkyadhote/dhruv-mills

docker service create \
        --name dhruv-ui \
        --network=dhruv \
        -p 80:80 \
        ajinkyadhote/dhruv-ui
