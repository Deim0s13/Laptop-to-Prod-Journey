# 1. Introduction

## 1.2 Project Goals

### 1.2.1 Create a Cloud-Native, Microservices-Based MVP Application
- **Objective**: Develop a basic but functional application that follows a microservices architecture, with each service containerized individually.
- **Purpose**: Enable the demonstration of microservices concepts, containerization, and deployment practices in a realistic but simplified setup.

### 1.2.2 Replicate the Development Lifecycle from Laptop to Production
- **Objective**: Build the application locally on Apple silicon, then deploy it to a Single Node OpenShift (SNO) instance for staging, and finally to a ROSA instance as a production environment.
- **Purpose**: Show the process of moving code through various environments, addressing architecture-specific challenges, and maintaining consistency across setups.

### 1.2.3 Establish CI/CD Pipelines to Automate Deployment
- **Objective**: Implement CI/CD pipelines to streamline application deployment from development to production.
- **Purpose**: Introduce continuous integration and continuous deployment practices, enhancing workflow efficiency and minimizing manual intervention.

### 1.2.4 Incorporate GitOps Practices for Environment Management
- **Objective**: Use GitOps (with Argo CD) for version control-based deployments, automating application state management across environments.
- **Purpose**: Demonstrate GitOps methodology, where configuration files stored in Git serve as the single source of truth, facilitating declarative deployments.

### 1.2.5 Implement Environment-Specific Tagging and Versioning
- **Objective**: Introduce environment tagging (e.g., local, staging, production) and versioning for the application, aligning with the stages of deployment.
- **Purpose**: Track the application’s state at each stage, document version history, and set up consistent deployment practices that mimic real-world processes.

### 1.2.6 Demonstrate Best Practices for Cross-Architecture Compatibility
- **Objective**: Ensure that the application is compatible with both Apple silicon and x86 architectures.
- **Purpose**: Highlight best practices for developing cross-architecture applications, especially around building and testing in diverse environments.

### 1.2.7 Create Documentation for Learning and Reusability
- **Objective**: Document each step thoroughly to create a learning resource that can help beginners understand cloud-native development and deployment.
- **Purpose**: Provide a clear, accessible guide for those without a software background to follow along, understand the concepts, and apply them to their own projects.

## 1.3 Architecture Overview
Briefly describe the microservices architecture, including the database setup and interactions.

### 1.3.1 Application Concept: Simple Webstore
- **Goal**: Develop a basic online store where users can browse products, add items to their cart, and make purchases.
- **Focus**: Emphasis on the development, containerization, and deployment process, with each component showcasing the advantages of a microservices architecture.

### 1.3.2 Key Microservices and Components

#### 1.3.2.1 Frontend Service
- **Description**: Provides the user interface, allowing customers to browse products, manage their shopping cart, and place orders.
- **Technology**:
  - **Framework**: React (for building a responsive, interactive frontend interface).
  - **UI Styling**: Bootstrap (for quick, mobile-friendly, and consistent design).
  - **Build Tool**: Vite (for efficient, fast development and build processes).
  - **Communication**: Communicates with backend services via REST APIs.

#### 1.3.2.2 Product Service
- **Description**: Manages product catalog, including product names, descriptions, prices, and stock levels.
- **Technology**:
  - **Backend Framework**: Flask (a lightweight Python framework ideal for simple REST APIs).
  - **Database**: PostgreSQL (for managing structured product data).
  - **API Format**: RESTful API (for fetching product information, accessible to both the frontend and other services).
  - **Communication**: Exposes REST API endpoints to provide product details to the frontend and other services.

#### 1.3.2.3 Cart Service
- **Description**: Manages the shopping cart, allowing users to add or remove items and view cart contents.
- **Technology**:
  - **Backend Framework**: Express.js (a Node.js framework suitable for fast and scalable REST API development).
  - **Data Store**: Redis (an in-memory data store ideal for temporary session-like data, ensuring quick access to cart information).
  - **API Format**: RESTful API (for managing cart interactions).
  - **Communication**: Interacts with the frontend to manage cart contents and supports quick data retrieval through Redis.

#### 1.3.2.4 Order Service
- **Description**: Handles order processing, calculating totals, and storing order history.
- **Technology**:
  - **Backend Framework**: Flask (keeps backend components consistent and efficient for order processing).
  - **Database**: PostgreSQL (for persistent storage of completed orders, enabling historical queries and reporting).
  - **API Format**: RESTful API (for processing orders and storing order history).
  - **Communication**: Connects with the Cart and Product services to validate and finalize purchases.

#### 1.3.2.5 Database
- **Primary Database**: PostgreSQL (used by Product and Order services to store structured, persistent data).
- **Temporary/In-Memory Store**: Redis (used by the Cart service for fast access to non-persistent cart data).

### 1.3.3 Communication Patterns
- **Internal REST APIs**: Each microservice exposes its own REST API, allowing services to interact through HTTP requests while maintaining independence.
- **Service Connections**:
  - Frontend interacts with Product, Cart, and Order services through REST API calls.
  - Cart interacts with the Order service during checkout to finalize purchases.

### 1.3.4 Containerization Strategy
- Each service (Frontend, Product, Cart, and Order) will be containerized to showcase modular, scalable deployment.
- Database services (PostgreSQL and Redis) will also be containerized separately, highlighting independent management and scalability of data storage.

### 1.3.5 Environment Setup and Scalability
- **Stateless services** (Frontend, Cart, and Product) allow for horizontal scaling as needed.
- **Database persistence** is configured for environments like ROSA with persistent volumes for reliable data storage across deployments.


## Tech Stack
List the tools and platforms you’ll use (e.g., GitHub, Podman/Docker, OpenShift, ROSA, GitOps, CI/CD pipelines).

## Target Audience
Explain that this document is designed for beginners who want to learn about containerized applications and CI/CD practices.