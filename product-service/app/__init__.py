from flask import Flask
from flask_cors import CORS
from .routes import product_bp

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all routes
    app.register_blueprint(product_bp, url_prefix='/products')  # This defines the /products route

    # Debugging: Print all registered routes
    with app.app_context():
        print(app.url_map)
        
    return app