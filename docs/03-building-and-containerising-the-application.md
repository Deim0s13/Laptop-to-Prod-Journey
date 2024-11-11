# 3. Building and Containerizing the Application

-----------------------------------------------------------------------------------------------------------------------------------------

## 3.1 Frontend Overview

### 3.1.1 Project Initialisation
- We initialized the frontend using Vite:
```bash
npm create vite@latest .
```

- **Framework**: React
- **Dependencies installed**:
```bash
npm install axios react-router-dom bootstrap
```

### 3.1.2 Project Structure
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

### 3.1.3 Environment Variables
We set up an `.env` file to store environment variables:
```
VITE_API_URL=http://localhost:5000
```

### 3.1.4 Frontend Implementation Details

#### 3.1.4.1 Home Page
- The `Home.jsx` component was set up to fetch and display a list of products.
- For now, we are using mock data until the backend is ready.

#### 3.1.4.2 Mock Data Setup
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

### 3.1.5 Challenges Encountered
- Initially, the site displayed a blank page due to misconfigurations with React Router and state management.
- After troubleshooting, we resolved the issues by simplifying the routing and using mock data for product listings.

### 3.1.6 Current Status
- The frontend is now successfully displaying static data using mock products.
- We are ready to proceed with backend development to provide actual product data.

### 3.1.7 Next Steps
#### 3.1.7.1 Backend Development
- We will create a backend service using Flask (or Node.js) to serve product data.
- Once the backend is ready, we will update the frontend to fetch real data.

#### 3.1.7.2 Containerization
- After the backend is integrated, we will containerize both the frontend and backend services using Podman.

### 3.1.8 Version Control & Tags
- We’ve committed the current state of the frontend code:
```bash
git add .
git commit -m "Initial frontend setup with mock data"
git push origin dev
git tag -a v0.1.0-dev -m "Frontend MVP setup"
git push origin v0.1.0-dev
```

-----------------------------------------------------------------------------------------------------------------------------------------

## 3.2 Product-Service (Backend) Overview
The first step in building our microservices architecture was to create the `product-service`, which provides product data for the webstore frontend. This service was implemented using Flask, and it exposes an API endpoint to fetch product data.

### 3.2.1 Project Structure
- The `product-service` microservice is structured as follows:
```plaintext
my-demo-webstore/
├── product-service/
│   ├── app/
│   │   ├── __init__.py          # App initialization
│   │   ├── models.py            # Product data models
│   │   ├── routes.py            # API route definitions
│   │   └── config.py            # Configuration settings
│   ├── requirements.txt         # Python dependencies
│   └── Dockerfile               # Dockerfile for containerizing the service
```

### 3.2.2 Setting Up Flask Application
- We created the following files:

  - `app/__init__.py`:
```python
from flask import Blueprint, jsonify
from .models import get_all_products

product_bp = Blueprint('products', __name__)

@product_bp.route('/', methods=['GET'])
def fetch_products():
    products = get_all_products()
    return jsonify(products)
```

### 3.2.3 Dependencies
- The required dependencies were added to `requirements.txt`:
```plaintext
flask
flask-cors
```

### 3.2.3 Running the Product Service
- We set up a Python virtual environment and install dependencies:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

- The service was started using:
```bash
python -m app.__init__
```

- The API was successfully tested at `http://localhost:5001/products`.

-----------------------------------------------------------------------------------------------------------------------------------------

## 3.3 Integrating the Product Service with the Frontend
Now that the `product-service` was up and running, we connected it to the frontend. Here’s a summary:

### 3.3.1 Updated the Frontend Code
- Updated `Home.jsx` to fetch product data using the API URL defined in the `.env` file:
```jsx
axios.get(`${import.meta.env.VITE_API_URL}/products`)
  .then(response => setProducts(response.data))
  .catch(error => console.error("Error fetching products:", error));
```

### 3.3.2 Environment Variable Setup
- We created a `.env` file in the frontend:
```plaintext
VITE_API_URL=http://localhost:5001
```

### 3.3.3 Testing and Integration
- Verified that the frontend successfully fetched products from the backend API.

### 3.3.4 Version Control & Tagging

After completing these updates, we committed the code and tagged the current state:
```bash
git add .
git commit -m "Set up product-service and connected frontend"
git push origin dev
git tag -a v0.2.0-dev -m "Product service setup and frontend integration"
git push origin v0.2.0-dev
```

**Note:** Due to a minor error, we did create and push v0.2.1-dev.

### 3.3.5 Next Steps
- Document this stage and commit the documentation updates.
- Proceed to containerise both the frontend and backend services.