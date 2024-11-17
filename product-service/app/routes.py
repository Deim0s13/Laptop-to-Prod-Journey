from flask import Blueprint, jsonify
from app.models import get_all_products  # Use absolute import

product_bp = Blueprint('products', __name__)

@product_bp.route('/', methods=['GET'])
def fetch_products():
    products = get_all_products()
    return jsonify(products)