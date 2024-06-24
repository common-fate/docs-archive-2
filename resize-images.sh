#!/bin/bash

# Directory containing the images
IMAGE_DIR="$1"

# Check if the directory is provided
if [ -z "$IMAGE_DIR" ]; then
    echo "Please provide the directory containing the images."
    exit 1
fi

# Check if the directory exists
if [ ! -d "$IMAGE_DIR" ]; then
    echo "The directory does not exist."
    exit 1
fi

# Create a directory for resized images
RESIZED_DIR="$IMAGE_DIR/resized"
mkdir -p "$RESIZED_DIR"

# Maximum width for the resized images
MAX_WIDTH=1920

# Find and loop through all image files in the directory and subdirectories
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read IMAGE; do
    # Get the file name without the directory
    FILENAME=$(basename "$IMAGE")

    # Get the relative path of the image from the root directory
    REL_PATH=$(dirname "${IMAGE#$IMAGE_DIR/}")

    # Create the corresponding directory structure in the resized directory
    mkdir -p "$RESIZED_DIR/$REL_PATH"

    # Resize the image
    sips --resampleWidth $MAX_WIDTH "$IMAGE" --out "$RESIZED_DIR/$REL_PATH/$FILENAME"

    echo "Resized $IMAGE to $RESIZED_DIR/$REL_PATH/$FILENAME"
done

echo "All images have been resized and saved to $RESIZED_DIR."
