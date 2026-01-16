# Git Setup Guide

## Quick Setup

The repository is configured with git user name: **Akash Masih**

### Windows (PowerShell)
```powershell
.\setup-git.ps1
```

### Linux/Mac (Bash)
```bash
chmod +x setup-git.sh
./setup-git.sh
```

### Manual Setup

If you prefer to set it up manually:

```bash
# Set user name
git config user.name "Akash Masih"

# Set email (required for commits)
git config user.email "dev.akashmasih@gmail.com"

# Initialize repository (if not already done)
git init
```

## Verify Configuration

Check your git configuration:
```bash
git config user.name
git config user.email
```

Or view all local config:
```bash
git config --list --local
```

## Global vs Local Configuration

- **Local (Repository)**: Settings in `.git/config` apply only to this repository
- **Global**: Use `git config --global user.name "Akash Masih"` to set for all repositories

## Current Configuration

- **User Name**: Akash Masih
- **Email**: dev.akashmasih@gmail.com

## Next Steps

1. Run setup script: `.\setup-git.ps1` (Windows) or `./setup-git.sh` (Linux/Mac)
2. Initialize repository: `git init` (if not already done)
3. Add files: `git add .`
4. Make your first commit: `git commit -m "Initial commit: E-boo microservices platform"`
