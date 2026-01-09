#!/bin/bash
set -e  # exit on any error

# -----------------------------
# CONFIG
# -----------------------------
UI_DIR="ui"
SERVER_DIR="server"
DIST_DIR="dist"
JAR_NAME="hippo-bpm.jar"
TAR_NAME="hippo-bpm-v0.3.tar"
DOCKERFILE="Dockerfile"

# -----------------------------
# STEP 1: Build UI
# -----------------------------
echo "Building UI..."
cd "$UI_DIR"
npm run build

# Ensure static folder exists in server
echo "Copying built UI to server static resources..."
mkdir -p "../$SERVER_DIR/src/main/java/resources/static"
cp -r dist/* "../$SERVER_DIR/src/main/java/resources/static"

# -----------------------------
# STEP 2: Build Server
# -----------------------------
cd "../$SERVER_DIR"
echo "Building Java project..."
mvn clean package

# Ensure dist folder exists
mkdir -p "../$DIST_DIR"

# Copy JAR to dist folder
cp "./target/$JAR_NAME" "../$DIST_DIR/"

# -----------------------------
# STEP 3: Copy Dockerfile
# -----------------------------
cd "../$DIST_DIR"
if [ -f "../$DOCKERFILE" ]; then
  echo "Copying Dockerfile to dist..."
  cp "../$DOCKERFILE" .
else
  echo "Warning: Dockerfile not found in project root, skipping copy."
fi

# -----------------------------
# STEP 4: Create tar archive
# -----------------------------
echo "Creating tar archive..."
if [ -f "$DOCKERFILE" ]; then
  tar -cvf "$TAR_NAME" "$DOCKERFILE" "$JAR_NAME"
else
  tar -cvf "$TAR_NAME" "$JAR_NAME"
fi

echo "Build and packaging complete! Archive created: $DIST_DIR/$TAR_NAME"
