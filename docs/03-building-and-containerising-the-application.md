# 3. Building and Containerizing the Application

## Application Development
- Building the MVP version of the microservices application with a database connection.
- Documenting environment variables in `.env` for secure access.

## Containerization
- Creating Dockerfiles for each service and the database.
- Testing the containerized application locally on Apple silicon and preparing for x86 compatibility.

## 3.1 Frontend Overview

### 3.1.1 Frontend Setup

#### 3.1.1.1 Project Initialisation
- We initialized the frontend using Vite:
```bash
npm create vite@latest .
```

- **Framework**: React
- **Dependencies installed**:
```bash
npm install axios react-router-dom bootstrap
```

#### 3.1.1.2 Project Structure
The folder structure for the frontend is organized as follows:
```plaintext
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── mockProducts.js
├── package.json
└── vite.config.js
```

#### 3.1.1.3 Environment Variables
We set up an `.env` file to store environment variables:
```
VITE_API_URL=http://localhost:5000
```

### 3.1.2 Frontend Implementation Details

#### 3.1.2.1 Home Page
- The `Home.jsx` component was set up to fetch and display a list of products.
- For now, we are using mock data until the backend is ready.

#### 3.1.2.2 Mock Data Setup
- We created a `mockProducts.js` file to simulate an API response:
```javascript
const mockProducts = [
  { id: 1, name: 'Product A', price: 10 },
  { id: 2, name: 'Product B', price: 15 },
  { id: 3, name: 'Product C', price: 20 }
];

export default mockProducts;
```

- The `Home.jsx` component was updated to use this mock data.

#### 3.1.2.3 Challenges Encountered
- Initially, the site displayed a blank page due to misconfigurations with React Router and state management.
- After troubleshooting, we resolved the issues by simplifying the routing and using mock data for product listings.

#### 3.1.2.4 Current Status
- The frontend is now successfully displaying static data using mock products.
- We are ready to proceed with backend development to provide actual product data.

### 3.1.3 Next Steps
### Backend Development
- We will create a backend service using Flask (or Node.js) to serve product data.
- Once the backend is ready, we will update the frontend to fetch real data.

### Containerization
- After the backend is integrated, we will containerize both the frontend and backend services using Podman.

### 3.1.4 Version Control & Tags
- We’ve committed the current state of the frontend code:
```bash
git add .
git commit -m "Initial frontend setup with mock data"
git push origin dev
git tag -a v0.1.0-dev -m "Frontend MVP setup"
git push origin v0.1.0-dev
```

