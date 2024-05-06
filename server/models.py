from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!


class Users_Customers(db.Model, SerializerMixin):
    __tablename__ = 'users_customers'

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String)
    user_type = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    username = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String)


    # 1 to many with Customer_Products
    products = db.relationship('Customer_Products', back_populates='customer')

    # Many to Many with Customers_Distributors
    distributors = db.relationship('Customers_Distributors', back_populates='customer')


    # serialize_rules = ('-products.customer','-products.orders', '-distributors',)
    serialize_only = ('id', 'company_name', 'user_type', 'first_name', 'last_name', 'email', 'username', 'password_hash')


    @validates('first_name', 'last_name', 'company_name', 'password_hash', 'user_type')
    def validate_columns(self, attr, value):
        if (not isinstance(value, str)) or len(value) < 1:
            raise ValueError(f"{attr} must be a string that is at least 2 characters long!")
        return value

    @validates('username')
    def validate_username(self, attr, value):
        username_taken_distributor = Users_Distributors.query.filter(Users_Distributors.username == value).first()
        username_taken_customer = Users_Customers.query.filter(Users_Customers.username == value).first()

        if (username_taken_distributor or username_taken_customer):
            raise ValueError(f"{attr} is already taken, please pick a new username")
        return value

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError("Email is not valid")
        return address


    __table_args__ = (db.CheckConstraint('(username != password_hash)'),)

    







class Users_Distributors(db.Model, SerializerMixin):
    __tablename__ = 'users_distributors'

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String)
    user_type = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    username = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String)


    # 1 to many with Distributor_Prices
    distributor_prices = db.relationship('Distributor_Prices', back_populates='distributor')


    # Many to Many with Customers_Distributors
    customers = db.relationship('Customers_Distributors', back_populates='distributor')



    @validates('first_name', 'last_name', 'company_name','password_hash', 'user_type')
    def validate_columns(self, attr, value):
        if (not isinstance(value, str)) or len(value) < 1:
            raise ValueError(f"{attr} must be a string that is at least 2 characters long!")
        return value

    @validates('username')
    def validate_username(self, attr, value):
        username_taken_distributor = Users_Distributors.query.filter(Users_Distributors.username == value).first()
        username_taken_customer = Users_Customers.query.filter(Users_Customers.username == value).first()
        if (username_taken_customer or username_taken_distributor):
            raise ValueError(f"{attr} is already taken, please pick a new username")
        return value

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError("Email is not valid")
        return address

    __table_args__ = (db.CheckConstraint('(username != password_hash)'),)
    # __table_args__ = (db.CheckConstraint('username != password_hash '),)




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


    serialize_rules = ('-customer','-orders.products')



    @validates('product_name', 'manufacturer')
    def validate_columns(self, attr, value):
        if (not isinstance(value, str)) or len(value) < 1:
            raise ValueError(f"{attr} must be a string that is at least 2 characters long!")
        return value





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


    @validates('product_id', 'price')
    def validate_columns(self, attr, value):
        if (not isinstance(value, (int, float))):
            raise ValueError(f"{attr} must be a number")
        return value




# Many to Many table___________________________________________________________________
class Customers_Distributors(db.Model, SerializerMixin):
    __tablename__ = 'customers_distributors'

    id = db.Column(db.Integer, primary_key=True)
    distributor_name = db.Column(db.String)


    # Many to Many foreign keys
    customer_id = db.Column(db.Integer, db.ForeignKey('users_customers.id'))
    distributor_id = db.Column(db.Integer, db.ForeignKey('users_distributors.id'))


# _________
    customer = db.relationship('Users_Customers', back_populates='distributors')
    distributor = db.relationship('Users_Distributors', back_populates='customers')


    # If I change this back to '-distributor.customers' then it will show me all of the distributors information
    serialize_rules = ('-customer.distributors','-distributor.customers')
    # serialize_only = ('id', 'distributor_name')









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


    @validates('qty_ordered')
    def validate_columns(self, attr, value):
        if (not isinstance(value, (int, float))):
            raise ValueError(f"{attr} must be a number")
        return value

    @validates('customer_product_name')
    def validate_columns(self, attr, value):
        if (not isinstance(value, str)) or len(value) < 1:
            raise ValueError(f"{attr} must be a string that is at least 2 characters long!")
        return value





