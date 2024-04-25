#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Users_Customers, Users_Distributors, Customer_Products, Customer_Orders_Placed, Customers_Distributors, Distributor_Prices


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'




class AllCustomers(Resource):

    def get(self):

        customers = Users_Customers.query.all()

        response_body = [customer.to_dict() for customer in customers]
        return make_response(response_body, 200)

    def post(self):
        try:
            new_customer = Users_Customers(company_name=request.json.get('company_name'), user_type=request.json.get('user_type'), first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), email=request.json.get('email'), username=request.json.get('username'))
            db.session.add(new_customer)
            db.session.commit()

            response_body = new_customer.to_dict()
            return make_response(response_body, 201)
        except:
            response_body = {
                'error': 'Customer must have a company name, username, and a password'
            }
            return make_response(response_body, 400)


api.add_resource(AllCustomers, '/customers')


class AllDistributors(Resource):

    def get(self):

        distributors = Users_Distributors.query.all()

        response_body = [distributor.to_dict() for distributor in distributors]
        return make_response(response_body, 200)


api.add_resource(AllDistributors, '/distributors')



















if __name__ == '__main__':
    app.run(port=5555, debug=True)

