#!/bin/bash
# Exit immediately if a command exits with a non-zero status.
set -e

# Define the base name for your docker images
REGISTRY_BASE="ghcr.io/corentingosselin"

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
  local version_tag=$3
  local image_name="${REGISTRY_BASE}/${service}:${version_tag}"
  echo "Building ${image_name}..."
  docker build -t "${image_name}" -f $dockerfile .
  echo "${service} built successfully."
}

# Function to push a Docker image
push_image() {
  local service=$1
  local version_tag=$2
  local image_name="${REGISTRY_BASE}/${service}:${version_tag}"
  echo "Pushing ${image_name} to registry..."
  docker push "${image_name}"
  echo "${service} pushed successfully."
}

# The version or tag for the images, could be set dynamically or passed into the script
VERSION_TAG="latest"

# Build all Docker images
for service in "${!services[@]}"; do
  build_image "$service" "${services[$service]}" "$VERSION_TAG"
done

# Push all Docker images
for service in "${!services[@]}"; do
  push_image "$service" "$VERSION_TAG"
done
