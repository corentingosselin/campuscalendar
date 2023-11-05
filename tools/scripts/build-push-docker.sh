#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

# Define the base name for Docker images
DOCKER_IMAGE_BASE="prodigyman/campuscalendar"

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
  local tag="$DOCKER_IMAGE_BASE/$service:latest"
  echo "Building $service..."
  docker build -t "$tag" -f "$dockerfile" .
  echo "$service built successfully."
}

# Function to push a Docker image
push_image() {
  local service=$1
  local tag="$DOCKER_IMAGE_BASE/$service:latest"
  echo "Pushing $service to registry..."
  docker push "$tag"
  echo "$service pushed successfully."
}

# Build and Push all Docker images
for service in "${!services[@]}"; do
  build_image "$service" "${services[$service]}"
  push_image "$service"
done
