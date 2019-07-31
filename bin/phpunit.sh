#!/bin/bash

docker-compose exec wp-headless phpunit "$@"
