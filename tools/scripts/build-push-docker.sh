#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

# Declare an associative array of services and their Dockerfile locations
declare -A services=(
  ["api-gateway"]="apps/api-gateway/docker/Dockerfile.prod"
  ["auth-service"]="apps/auth-service/docker/Dockerfile.prod"
  ["school-service"]="apps/school-service/docker/Dockerfile.prod"
  ["user-service"]="apps/user-service/docker/Dockerfile.prod"
  ["frontend"]="apps/frontend/docker/Dockerfile.prod"
)

# Function to build a Docker image
build_image() {
  local service=$1
  local dockerfile=$2
  echo "Building $service..."
  docker build -t "campuscalendar/$service:latest" -f $dockerfile .
  echo "$service built successfully."
}

# Function to push a Docker image
push_image() {
  local service=$1
  echo "Pushing $service to registry..."
  docker push "prodigyman/campuscalendar/$service:latest"
  
  echo "$service pushed successfully."
}

# Build all Docker images
for service in "${!services[@]}"; do
  build_image "$service" "${services[$service]}"
done

# Push all Docker images
for service in "${!services[@]}"; do
  push_image "$service"
done
