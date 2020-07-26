#! /bin/sh
yum update -y
amazon-linux-extras install docker
service docker start
usermod -a -G docker ec2-user
chkconfig docker on
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

wget https://raw.githubusercontent.com/Ajinkya-Dhote/Dhruv/dev/infra/docker-compose.yml?token=ACUB6MRKROMTDP35RV2KZ2S7DQ3LK > docker-compose.yml
docker login -u ajinkyadhote -p me@ajinkya16

for project in disocvery gateway product
do
        docker pull ajinkyadhote/dhruv-$project
done



