#!/bin/bash

echo "Running prebuild script..."

# Check if public directory exists
if [ -d "public" ]; then
  echo "✅ Public directory exists"
  
  # Check for models directory
  if [ -d "public/models" ]; then
    echo "✅ Models directory exists"
    echo "Models found:"
    ls -la public/models
  else
    echo "❌ Models directory not found"
  fi
  
  # Check for images directory
  if [ -d "public/images" ]; then
    echo "✅ Images directory exists"
    echo "Images found:"
    ls -la public/images
  else
    echo "❌ Images directory not found"
  fi
  
else
  echo "❌ Public directory not found"
fi

echo "Prebuild script completed" 