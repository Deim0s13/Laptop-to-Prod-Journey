import psycopg2
from app.config import DATABASE_URI  # Use absolute import

def get_all_products():
    """
    Fetch all products from the PostgreSQL database.
    """
    try:
        conn = psycopg2.connect(DATABASE_URI)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, price FROM products;")
        products = cursor.fetchall()
        conn.close()
        return [{"id": row[0], "name": row[1], "price": row[2]} for row in products]
    except Exception as e:
        print(f"Error fetching products: {e}")
        return []