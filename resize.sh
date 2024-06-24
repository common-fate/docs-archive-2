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

# Maximum width for the resized images
MAX_WIDTH=1920

# Find and loop through all image files in the directory and subdirectories
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read IMAGE; do
    # Get the image width
    WIDTH=$(sips -g pixelWidth "$IMAGE" | grep pixelWidth | awk '{print $2}')

    # Check if the image width is greater than the maximum width
    if [ "$WIDTH" -gt "$MAX_WIDTH" ]; then
        # Resize the image
        sips --resampleWidth $MAX_WIDTH "$IMAGE" --out "$IMAGE.tmp"
        mv "$IMAGE.tmp" "$IMAGE"
        echo "Resized $IMAGE"
    else
        echo "Skipped $IMAGE (no resizing needed)"
    fi
done

echo "All images have been processed."
