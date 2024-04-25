from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!


class Users_Customers(db.Model, SerializerMixin):
    __tablename__ = 'users_customers'

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String)
    user_type = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String, nullable=False)
    # password_hash = db.Column(db.String, nullable=False)


    # 1 to many with Customer_Products
    products = db.relationship('Customer_Products', back_populates='customer')

    # Many to Many with Customers_Distributors
    distributors = db.relationship('Customers_Distributors', back_populates='customer')







class Users_Distributors(db.Model, SerializerMixin):
    __tablename__ = 'users_distributors'

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String)
    user_type = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String, nullable=False)
    # password_hash = db.Column(db.String, nullable=False)


    # 1 to many with Distributor_Prices
    distributor_prices = db.relationship('Distributor_Prices', back_populates='distributor')


    # Many to Many with Customers_Distributors
    customers = db.relationship('Customers_Distributors', back_populates='distributor')




class Customer_Products(db.Model, SerializerMixin):
    __tablename__ = 'customer_products'

    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String)
    manufacturer = db.Column(db.String)

    # 1 to many with Users_Customers
    customer_id = db.Column(db.Integer, db.ForeignKey('users_customers.id'))
    customer = db.relationship('Users_Customers', back_populates='products')


    # 1 to many with Customer_Orders_Placed
    orders = db.relationship('Customer_Orders_Placed', back_populates='product')





class Distributor_Prices(db.Model, SerializerMixin):
    __tablename__ = 'distributor_prices'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer)
    price = db.Column(db.Integer)
    distributor_product_name = db.Column(db.String)
    distributor_product_size = db.Column(db.String)

    # 1 to many with Users_Distributors
    distributor_id = db.Column(db.Integer, db.ForeignKey('users_distributors.id'))
    distributor = db.relationship('Users_Distributors', back_populates='distributor_prices')



# Many to Many table___________________________________________________________________
class Customers_Distributors(db.Model, SerializerMixin):
    __tablename__ = 'customers_distributors'

    id = db.Column(db.Integer, primary_key=True)
    distributor_name = db.Column(db.String)


    # Many to Many foreign keys
    customer_id = db.Column(db.Integer, db.ForeignKey('users_customers.id'))
    distributor_id = db.Column(db.Integer, db.ForeignKey('users_distributors.id'))


# _________Missing Relationships
    customer = db.relationship('Users_Customers', back_populates='distributors')
    distributor = db.relationship('Users_Distributors', back_populates='customers')





class Customer_Orders_Placed(db.Model, SerializerMixin):
    __tablename__ = 'customer_orders_placed'

    id = db.Column(db.Integer, primary_key=True)
    customer_product_name = db.Column(db.String)
    date_ordered = db.Column(db.DateTime)
    qty_ordered = db.Column(db.Integer)
    ordered_from_distributor_name = db.Column(db.String)
    ordered_from_distributor_product_name = db.Column(db.String)
    

    #  1 to many with Customer_Products
    product_id = db.Column(db.Integer, db.ForeignKey('customer_products.id'))
    product = db.relationship('Customer_Products', back_populates='orders')





