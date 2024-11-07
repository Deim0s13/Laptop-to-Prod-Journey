# 2. Local Development Setup
This section will guide you through setting up a local development environment on your Apple silicon Mac. The setup will enable you to develop and test a containerized application locally while also ensuring compatibility with x86 architecture. This approach allows you to seamlessly transition the application across different environments, from your Mac to cloud-based x86 systems.

Before starting, you should be familiar with basic command-line operations. We’ll be using tools like VS Code, Podman, and Git, and this guide will provide step-by-step instructions for installing and configuring these tools specifically for an Apple silicon environment.

## 2.2 Environment Setup
- Installation of development tools on Apple silicon (VS Code, Podman, Git, etc.).
- Configuration details specific to Apple silicon, with considerations for x86 compatibility.

### 2.2.1 Install Development Tools

#### 2.2.1.1 Homebrew
Homebrew is a package manager that makes installing tools on macOS easy, especially for development.
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 2.2.1.2 VS Code (Visual Studio Code)
VS Code is a popular editor with excellent support for extensions and integrated development.
```bash
brew install --cask visual-studio-code
```

#### 2.2.1.3 Git
Git is essential for version control and working with GitHub.
```bash
brew install git
```

#### 2.2.1.4 Podman
Podman is a container engine complatible with Docker commands. It's ideal for local development on Apple silicon, as it has good compatibility and performance on this architecture.
```bash
brew install podman
```

### 2.2.2 Configure Podman for Apple Silicon

#### 2.2.2.1 Set up Podman for Local Containers
Since Podman uses a virtualized environment to run containers on macOS, it requires some additional setup to mimic Docker functionality.
```bash
podman machine init
podman machine start
```
This initializes and starts a Podman virtual machine, allowing you to run containers on your Apple silicon Mac.

#### 2.2.2.2 Build x86-Compatible Images
To ensure compatibility with x86 environments, configure Podman to build multi-architecture images using buildx. This lets you specify the platform (linux/amd64 for x86 and linux/arm64 for Apple silicon).
```bash
podman build --platform linux/amd64 -t my-image:latest .
```
For development, you’ll likely want to default to arm64 images to match your Apple silicon, but building for amd64 will be essential for testing cross-platform compatibility before deploying to x86 environments.

### 2.2.3 Set up Git Configuration

#### 2.2.3.1 Basic Git Configuration
Configuring Git with your name and email will make it easier to commit code changes consistently.
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

#### 2.2.3.2 Generate an SSH Key
To simplify pushing code to GitHub, set up SSH authentication.
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```
Then add the SSH key to your GitHub account by copying the key:
```bash
pbcopy < ~/.ssh/id_ed25519.pub
```
Paste it into GitHub under **Settings > SSH and GPG keys**.

### 2.2.4 Configure VS Code for Development

#### 2.2.4.1 Install Essential Extensions
VS Code offers extensions that enhance the development experience, especially for containerization and version control.
	•	Docker Extension (for Podman compatibility)
	•	Python Extension (for backend services)
	•	ESLint (for JavaScript/Node.js code quality in the frontend)
	•	GitLens (for enhanced Git capabilities)

#### 2.2.4.2 Configure VS Code Settings for Podman
You may need to point the Docker extension to Podman’s socket, which can be done in VS Code settings.
```json
// settings.json in VS Code
{
  "docker.dockerPath": "podman"
}
```

### 2.2.5 Verify Environment Compatibility for Cross-Platform Testing

#### 2.2.5.1 Testing for x86 Compatibility
After setting up your environment, you can begin testing your application using linux/amd64 builds to verify compatibility with x86 architecture. Building images with this platform flag will simulate the application’s behavior on x86 servers.
```bash
podman build --platform linux/amd64 -t my-webstore-image:latest .
```

#### 2.2.5.2 Run a Test Container
Run a basic container to ensure everything is working as expected. This verifies both Podman’s configuration and cross-platform compatibility if you’ve built an amd64 image.
```bash
podman run -d --name test-container my-webstore-image:latest
```
This setup should give you a robust local development environment ready for both Apple silicon and x86 compatibility testing. 

## Code Structure and Version Control
- Set up GitHub for version control and introduce environment tagging for local, staging (single-node), and production environments.

## Database Setup
- Instructions for setting up a local instance of the database within a container.
- Documentation of environment-specific variables, including secrets management.

make a change