#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Users_Customers, Users_Distributors, Customer_Products, Customer_Orders_Placed, Customers_Distributors, Distributor_Prices

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        # Delete data from the tables first
        Users_Customers.query.delete()
        Users_Distributors.query.delete()
        Customer_Products.query.delete()
        Customer_Orders_Placed.query.delete()
        Customers_Distributors.query.delete()
        Distributor_Prices.query.delete()
        db.session.commit()


        customer1 = Users_Customers(company_name='Smith Construction', user_type='customer', first_name='John', last_name='Smith', username='Smith')
        customer2 = Users_Customers(company_name="Bob's Builders", user_type='customer', first_name='Bob', last_name='Strongman', username='BobBuilder')


        db.session.add_all([customer1, customer2])


        db.session.commit()









        print("Completed seeding")
























