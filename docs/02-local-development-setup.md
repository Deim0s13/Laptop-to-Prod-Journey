# 2. Local Development Setup

## 2.1 Overview
This section will guide you through setting up a local development environment on your Apple silicon Mac. The setup will enable you to develop and test a containerized application locally while also ensuring compatibility with x86 architecture. This approach allows you to seamlessly transition the application across different environments, from your Mac to cloud-based x86 systems.

Before starting, you should be familiar with basic command-line operations. We’ll be using tools like VS Code, Podman, and Git, and this guide will provide step-by-step instructions for installing and configuring these tools specifically for an Apple silicon environment.

-----------------------------------------------------------------------------------------------------------------------------------------

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

-----------------------------------------------------------------------------------------------------------------------------------------

## 2.3 Code Structure and Version Control
- Set up GitHub for version control and introduce environment tagging for local, staging (single-node), and production environments.

### 2.3.1 Setup GitHub for Version Control

#### 2.3.1.1 Create a New GitHub Repository
- Go to GitHub and create a new repository called `my-demo-webstore`.
- Optionally, initialize the repository with a `README.md` file and a `.gitignore` file, selecting Python and Node.js as base templates (you can further customize this later).

#### 2.3.1.2 Clone the Repository Locally
- In your terminal, navigate to the root directory of your project (where `my-demo-webstore` is located) and clone your GitHub repository.
```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

#### 2.3.1.3 Add Project Files to Git
- Add the entire project structure (folders and files you created earlier) to Git.
```bash
git add .
git commit -m "Initial commit with project structure"
```

#### 2.3.1.4 Push the Project to GitHub
- Push your local commits to the GitHub repository.
```bash
git push origin main
```

#### 2.3.1.5 Setting up Git Branches for Environments
- Set up branches in GitHub to represent different environments:
  - `main`: Represents the production environment.
  - `staging`: Represents the staging environment (Single Node OpenShift).
  - `dev`: Represents the local development environment.

To create branches, use the following commands:
```bash
git checkout -b staging
git push -u origin staging

git checkout -b dev
git push -u origin dev
```
Now, you have a branch structure that matches your deployment environments, making it easier to manage updates across local, staging, and production.

### 2.3.2 Environment Tagging for Local, Staging, and Production

#### 2.3.2.1 Using Git Tags for Versioning
- As you progress, you’ll use Git tags to mark specific versions. Tags help you keep track of major milestones in the codebase, especially when you’re ready to deploy to staging or production.
  - For example, you could use a format like `v0.1.0` for initial local development, `v1.0.0-staging` when deploying to staging, and `v1.0.0` for production.

Create a tag with the following command:
```bash
git tag -a v0.1.0 -m "Initial version for local development"
git push origin v0.1.0
```

#### 2.3.2.2 Enviornment-Specific Files
- Use an `.env` file to handle environment variables, ensuring each environment (local, staging, production) has its own `.env` configuration.
- For security, make sure the `.env` file is included in your `.gitignore` file, so sensitive information like API keys and passwords are not tracked in Git.

Example `.env.example` file:
```bash
# Database
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Redis (for cart service)
REDIS_HOST=localhost
```

#### 2.3.2.3 Environment-Specific Tags and Branches
- As you progress through development, use branches to isolate work for each environment and tags to mark stable versions ready for deployment.
  - **Local Development (`dev` branch)**: Work here for initial testing and building.
  - **Staging (`staging` branch)**: Push stable features or bug fixes ready for testing on SNO.
  - **Production (`main` branch)**: Deploy final, production-ready versions, ensuring this branch is always stable.

This structure provides a clean way to track your codebase across environments, making version control a powerful tool in your development process.

-----------------------------------------------------------------------------------------------------------------------------------------

## 2.4 Database Setup
- Instructions for setting up a local instance of the database within a container.
- Documentation of environment-specific variables, including secrets management.

### 2.4.1 Setting Up a Local PostgreSQL Database in a Container

#### 2.4.1.1 Using the PostgreSQL Official Image
We’ll use the official PostgreSQL image to create a local instance. For a straightforward setup, define environment variables directly when running the container to set up the initial database configuration.

#### Command to Start PostgreSQL Container:
```bash
podman run --name mywebstore-db \
  -e POSTGRES_DB=mywebstore_db \
  -e POSTGRES_USER=mywebstore_user \
  -e POSTGRES_PASSWORD=mywebstore_password \
  -p 5432:5432 \
  -d postgres:13
  ```

#### Flags Explained:
- `--name`: Names the container (`mywebstore-db`).
- `-e`: Sets environment variables for initial setup, including database name, user, and password.
- `-p`: Maps the container’s internal port (5432) to the same port on your local machine for easy access.
- `-d`: Runs the container in detached mode, allowing it to run in the background.

#### 2.4.1.2 Verify the PostgreSQL Container
After starting the container, ensure it’s running by listing active containers:
```bash
podman ps
```

You should see `mywebstore-db` listed. You can also check the logs to confirm that PostgreSQL started correctly:
```bash
podman logs mywebstore-db
```

#### 2.4.1.3 Connect to PostgreSQL
You can connect to the PostgreSQL instance using the `psql` command-line tool or a GUI client like pgAdmin. For example:
```bash
psql -h localhost -p 5432 -U mywebstore_user -d mywebstore_db
```

Enter the password `mywebstore_password` when prompted to access the database.

### 2.4.2 Environment-Specific Variables and Secrets Management

#### 2.4.2.1 Using a .env File

To manage sensitive information such as database credentials, create a `.env` file in the project’s root directory. This file will store environment-specific variables for local development and future deployments in staging and production environments.

#### Example `.env` file:
```plaintext
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mywebstore_db
DB_USER=mywebstore_user
DB_PASSWORD=mywebstore_password
```

**Note**: Never commit your `.env` file to Git, as it contains sensitive information. Instead, add it to `.gitignore` to ensure it’s not tracked.

#### Example `.env.example` file:
```plaintext
# .env.example
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

#### 2.4.2.2 Environment-Specific .env Files

For each environment (local, staging, production), you can create separate `.env` files to tailor the configuration. For example:

- **Local**: `DB_HOST=localhost`, with credentials stored locally.
- **Staging**: Configure credentials specific to the staging database.
- **Production**: Use secure credentials tailored to your production database.

### 2.4.3 Connecting to PostgreSQL from Code

#### Python (Flask) Example using `psycopg2`:
```python
import os
import psycopg2

conn = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD")
)
```

#### Node.js (Express) Example using `pg`:
```javascript
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

client.connect();
```

#### 2.4.3.1 Loadming Environment Variables
In both examples, make sure to load the environment variables using a library like `dotenv`.

#### Python Example:
```python
from dotenv import load_dotenv
load_dotenv()
```

#### Node.js Example:
```javascript
require('dotenv').config();
```

### 2.4.4 Summary of Database Setup

- **Containerized Database**: You have a local PostgreSQL instance running in a container, with configuration managed via environment variables.
- **Environment Variables**: Use a `.env` file for sensitive data, with an `.env.example` template for easier setup in different environments.
- **Environment-Specific Configuration**: Separate configurations for local, staging, and production, supporting a consistent and secure deployment pipeline.

This setup ensures that your database is ready for local development while also making it easy to adapt configurations for staging and production.