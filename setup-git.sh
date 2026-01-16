#!/bin/bash
# Git Setup Script for E-boo Platform
# Run this script to configure git for the repository

echo "Setting up Git configuration..."

# Set user name
git config user.name "Akash Masih"
if [ $? -eq 0 ]; then
    echo "✓ Git user name set to: Akash Masih"
else
    echo "✗ Failed to set git user name. Is git installed?"
    exit 1
fi

# Set user email
git config user.email "dev.akashmasih@gmail.com"
if [ $? -eq 0 ]; then
    echo "✓ Git email set to: dev.akashmasih@gmail.com"
else
    echo "✗ Failed to set git email. Is git installed?"
    exit 1
fi

# Initialize git repository if not already initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    if [ $? -eq 0 ]; then
        echo "✓ Git repository initialized"
    fi
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo "Creating .gitignore..."
    cp .gitignore.example .gitignore 2>/dev/null || true
fi

echo ""
echo "Git configuration complete!"
echo "Current git config:"
git config --list --local | grep "user\."
