#!/bin/bash

# Clean up old docker containers and networks
docker rm $(docker ps --filter status=exited -q)
docker rm -f database
docker rm -f backend-test
docker rm -f frontend-test
docker network rm barber-network-test

exit 0
