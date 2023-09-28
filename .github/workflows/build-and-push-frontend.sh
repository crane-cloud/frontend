#!/bin/bash

set -e
# Set environment variables using GitHub Actions inputs and secrets
REACT_APP_API_BASE_URL=${{ secrets.REACT_APP_API_BASE_URL }}
REACT_APP_FLUTTERWAVE_PUBLIC_KEY_TESTING=${{ secrets.REACT_APP_FLUTTERWAVE_PUBLIC_KEY_TESTING }}
REACT_APP_GITHUB_CLEINT_ID_STAGING=${{ secrets.REACT_APP_GITHUB_CLEINT_ID_STAGING }}
REACT_APP_GITHUB_CLEINT_ID_PROD=${{ secrets.REACT_APP_GITHUB_CLEINT_ID_PRODUCTION }}
REACT_APP_EXCHANGE_RATE_KEY=${{ secrets.REACT_APP_EXCHANGE_RATE_KEY }}
REACT_APP_BLOG_URL=${{ secrets.REACT_APP_BLOG_URL }}
REACT_APP_DOCS_URL_PROD=${{ secrets.REACT_APP_DOCS_URL_PROD }}
REACT_APP_DOCS_URL_STAGING=${{ secrets.REACT_APP_DOCS_URL_STAGING }}
REACT_APP_MIRA_API_URL=${{ secrets.REACT_APP_MIRA_API_URL }}
REACT_APP_DOCKER_EMAIL=${{ secrets.REACT_APP_DOCKER_EMAIL }}
REACT_APP_DOCKER_PASSWORD=${{ secrets.REACT_APP_DOCKER_PASSWORD }}
REACT_APP_MONITORING_APP_PROD=${{ secrets.REACT_APP_MONITORING_APP_PROD }}
REACT_APP_MONITORING_APP_STAGING=${{ secrets.REACT_APP_MONITORING_APP_STAGING }}
GITHUB_SHA=${{ secrets.GITHUB_SHA }}
IMG_TAG=$(echo $GITHUB_SHA | cut -c -7)

function create_env_file
{
    echo REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL >> .env
    echo REACT_APP_EXCHANGE_RATE_KEY=$REACT_APP_EXCHANGE_RATE_KEY >> .env
    echo REACT_APP_BLOG_URL=$REACT_APP_BLOG_URL >> .env
    echo REACT_APP_MIRA_API_URL=$REACT_APP_MIRA_API_URL >> .env
    echo REACT_APP_DOCKER_EMAIL=$REACT_APP_DOCKER_EMAIL >> .env
    echo REACT_APP_DOCKER_PASSWORD=$REACT_APP_DOCKER_PASSWORD >> .env

    if [ $GITHUB_REF == 'refs/heads/master' ]
    then
        echo REACT_APP_GITHUB_CLEINT_ID=$REACT_APP_GITHUB_CLEINT_ID_PROD >> .env
        echo REACT_APP_DOCS_URL=$REACT_APP_DOCS_URL_PROD >> .env
        echo REACT_APP_MONITORING_APP=$REACT_APP_MONITORING_APP_PROD >> .env
    else
        echo REACT_APP_GITHUB_CLEINT_ID=$REACT_APP_GITHUB_CLEINT_ID_STAGING >> .env
        echo REACT_APP_FLUTTERWAVE_PUBLIC_KEY_TESTING=$REACT_APP_FLUTTERWAVE_PUBLIC_KEY_TESTING >> .env
        echo REACT_APP_DOCS_URL=$REACT_APP_DOCS_URL_STAGING >> .env
        echo REACT_APP_MONITORING_APP=$REACT_APP_MONITORING_APP_STAGING >> .env
    fi
}

function docker_login
{
    echo ${{ secrets.GCR_SERVICE_KEY }} | docker login -u _json_key --password-stdin https://gcr.io
}

function build_image
{
    docker build -f docker/prod/Dockerfile -t gcr.io/$GITHUB_REPOSITORY/cranecloud-frontend:$IMG_TAG .
}

function push_image
{
    docker push gcr.io/$GITHUB_REPOSITORY/cranecloud-frontend:$IMG_TAG
}

function run
{
    create_env_file
    docker_login
    build_image
    push_image
}

run
