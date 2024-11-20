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
- 
-----------------------------------------------------------------------------------------------------------------------------------------

## 3.4 Testing the Backend
In this section, we document the initial testing setup and the steps taken to ensure that the backend services are functional and reliable.

### 3.4.1 Testing Overview
Testing ensures the robustness of the `product-service` by validating that the `/products` endpoint communicates correctly with the PostgreSQL database and returns the expected output.

### 3.4.2 Testing Setup

#### 3.4.2.1 Branch Setup
We created a dedicated branch named `add-testing` to add and test the initial unit tests for the backend service:
```bash
git checkout -b add-testing
```

#### 3.4.3.2 Dependencies
The following dependencies were installed to support testing:
- **pytest**: For running the tests.
- **python-dotenv**: To load environment variables.

#### 3.4.3.3 Flask App Configuration for Testing
We updated the `app/__init__.py` file to include a `create_app` function for testing purposes:
```python
def create_app(test_config=None):
    app = Flask(__name__)

    if test_config:
        app.config.update(test_config)

    from .routes import product_bp
    app.register_blueprint(product_bp, url_prefix='/products')

    return app
```

### 3.4.4 Writing the Test

#### 3.4.4.1 Test Structure
We created a tests folder in the product-service directory, with the following structure:
```plaintext
product-service/
├── tests/
│   └── test_routes.py  # Contains the test cases
```

#### 3.4.4.2 Test CAse for /products
The following test was implemented in test_routes.py:
```python
import pytest
from app.__init__ import create_app

@pytest.fixture
def client():
    app = create_app()
    with app.test_client() as client:
        yield client

def test_get_products(client):
    """Test the /products endpoint."""
    response = client.get('/products')
    assert response.status_code == 200
    assert isinstance(response.json, list)
```

### 3.4.5 Running the Tests
To execute the tests, the following command was used:
```bash
PYTHONPATH=$(pwd) pytest tests/
```

Output:
```plaintext
============================== test session starts ==============================
collected 1 item                                                              

tests/test_routes.py .                                                [100%]

=============================== 1 passed in 0.12s ===============================
```

### 3.4.6 Debugging the Application
To debug route-related issues, the app.url_map was printed to verify route registration:
```python
print(app.url_map)
```

### 3.4.7 Key Improvements Made
1. **Resolved 308 Redirects**: Adjusted the `Blueprint` to handle both `/products` and `/products/` by setting `strict_slashes=False` in the route or globally.

2. **Database Integration**: Ensured that the database container starts with `podman-compose` to avoid empty lists being returned.

### 3.4.8 Current Status
1. **The `add-testing` Branch Contains**:
   - A fully functional test for the `/products` endpoint.
   - Fixes for route definitions and database integration.

2. **Testing Process Confirmed**:
   - The `/products` endpoint returns a valid JSON array of products fetched from the database.
   - Testing works seamlessly in the development environment.
