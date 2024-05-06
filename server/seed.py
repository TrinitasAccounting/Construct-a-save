#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app, bcrypt
from models import db, Users_Customers, Users_Distributors, Customer_Products, Customer_Orders_Placed, Customers_Distributors, Distributor_Prices

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        # Delete data from the tables first
        # Users_Customers.query.delete()
        # Users_Distributors.query.delete()
        # Customer_Products.query.delete()
        Customer_Orders_Placed.query.delete()
        Customers_Distributors.query.delete()
        Distributor_Prices.query.delete()
        db.session.commit()



        # password_1 = "123"
        # pw_hash_1 = bcrypt.generate_password_hash(password_1).decode('utf-8')

        # password_2 = "123"
        # pw_hash_2 = bcrypt.generate_password_hash(password_2).decode('utf-8')

        # password_3 = "123"
        # pw_hash_3 = bcrypt.generate_password_hash(password_3).decode('utf-8')

        # password_4 = "123"
        # pw_hash_4 = bcrypt.generate_password_hash(password_4).decode('utf-8')






        # customer1 = Users_Customers(company_name='Smith Construction', user_type='customer', first_name='John', last_name='Smith', email='john@smith.com', username='Smith', password_hash=pw_hash_1)
        # customer2 = Users_Customers(company_name="Bob's Builders", user_type='customer', first_name='Bob', last_name='Strongman', email='bob@famous.com', username='BobBuilder', password_hash=pw_hash_2)

        # distributor1 = Users_Distributors(company_name="Massive Supplies", user_type='distributor', first_name='Bill', last_name='Supplies', email='bill@supplies.com', username='BillSupplies', password_hash=pw_hash_3)
        # distributor2 = Users_Distributors(company_name="VPS Warehouse", user_type='distributor', first_name='Vince', last_name='Denton', email='vince@denton.com', username='VPSWarehouse', password_hash=pw_hash_4)

        # db.session.add_all([customer1, customer2])
        # db.session.add_all([distributor1,distributor2])


        # db.session.commit()


        # product1 = Customer_Products(product_name='2x4 Plywood', manufacturer='ABS Lumber', customer_id=1)
        # product5 = Customer_Products(product_name='Stone Brick', manufacturer='Brick Warehouse', customer_id=1)
        # product2 = Customer_Products(product_name='2x6 Plywood', manufacturer='ABS Lumber', customer_id=1)
        # product3 = Customer_Products(product_name='2x10 Plywood', manufacturer='ABS Lumber', customer_id=1)
        # product4 = Customer_Products(product_name='4x10 Plywood', manufacturer='Home Depot', customer_id=1)
        # product6 = Customer_Products(product_name='Stone Brick', manufacturer='Brick Warehouse', customer_id=2)
        # product7 = Customer_Products(product_name='2x10 Plywood', manufacturer='ABS Lumber', customer_id=2)

        # db.session.add_all([product1, product2, product3, product4, product5, product6, product7])
        # db.session.commit()


        customer_distributor1 = Customers_Distributors(distributor_name='Lumber Supplier', customer_id=1, distributor_id=3)
        customer_distributor2 = Customers_Distributors(distributor_name='Massive Supplies', customer_id=1, distributor_id=1)
        db.session.add_all([customer_distributor1, customer_distributor2])
        db.session.commit()



        # Users_Customers.query.filter(Users_Customers.id == 8).delete()
        # Users_Customers.query.filter(Users_Customers.id == 9).delete()
        # Users_Customers.query.filter(Users_Customers.id == 10).delete()
        # Users_Customers.query.filter(Users_Customers.id == 11).delete()
        # Users_Customers.query.filter(Users_Customers.id == 12).delete()
        # Users_Customers.query.filter(Users_Customers.id == 13).delete()
        # db.session.commit()

        













        print("Completed seeding")
























