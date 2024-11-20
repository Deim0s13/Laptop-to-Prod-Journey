from flask import Blueprint, jsonify
from app.models import get_all_products

product_bp = Blueprint('products', __name__)

@product_bp.route('', methods=['GET'], strict_slashes=False) #Allow both /products and /products/
def fetch_products():
    """Fetch all products."""
    products = get_all_products()
    return jsonify(products)