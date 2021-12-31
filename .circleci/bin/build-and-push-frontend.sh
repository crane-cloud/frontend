#!/bin/bash


set -e

# env variables
REACT_APP_BASE_URL=${REACT_APP_API_BASE_URL:-}
REACT_APP_GITHUB_CLEINT_ID_STAGING=${REACT_APP_GITHUB_CLEINT_ID_STAGING:-}
REACT_APP_GITHUB_CLEINT_ID_PROD=${REACT_APP_GITHUB_CLEINT_ID_PRODUCTION:-}
IMG_TAG=$(echo $CIRCLE_SHA1 | cut -c -7)
GCLOUD_SERVICE_KEY=${GCLOUD_SERVICE_KEY:-}
GCP_PROJECT_ID=${GCP_PROJECT_ID:-}
branch=${CIRCLE_BRANCH:-}

function create_env_file
{
    echo REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL >> .env

    if [ $branch == 'master' ]
    then
        echo REACT_APP_GITHUB_CLEINT_ID=$REACT_APP_GITHUB_CLEINT_ID_PROD >> .env
    else
        echo REACT_APP_GITHUB_CLEINT_ID=$REACT_APP_GITHUB_CLEINT_ID_STAGING >> .env
    fi
}

function docker_login
{
    docker login -u _json_key -p "$(echo $GCLOUD_SERVICE_KEY)" https://gcr.io
}

function build_image
{
    docker build -f docker/prod/Dockerfile -t gcr.io/$GCP_PROJECT_ID/cranecloud-frontend:$IMG_TAG .
}

function push_image
{
    docker push gcr.io/$GCP_PROJECT_ID/cranecloud-frontend:$IMG_TAG
}

function run
{
    create_env_file
    docker_login
    build_image
    push_image
}

run
