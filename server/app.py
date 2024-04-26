#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Users_Customers, Users_Distributors, Customer_Products, Customer_Orders_Placed, Customers_Distributors, Distributor_Prices


app.secret_key = b'\xea\xfb\xedQ\xf5-r/0g\x9d@^\xd4^l'

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



class Login(Resource):

    def post(self):
        username = request.json.get('username')
        customer_user = Users_Customers.query.filter(Users_Customers.username == username).first()

        if(customer_user):
            # Check the below line, this may be wrong and not called "customer_id"
            session['customer_id'] = customer_user.id
            response_body = customer_user.to_dict()
            response_body['distributors'] = [distributor.to_dict(only=('id', 'company_name')) for distributor in list(set(customer_user.distributors))]
            return make_response(response_body, 201)
        else:
            response_body = {
                'error': 'Invalid Username'
            }
            return make_response(response_body, 401)


api.add_resource(Login, '/login')


class CheckSession(Resource):
    
    def get(self):

        # Debugging Line
        # del(session['customer_id'])



        # the line below might also need to be checked as it is connected to line 75___________________
        customer_user = db.session.get(Users_Customers, session.get('customer_id'))

        if(customer_user):
            response_body = customer_user.to_dict()

            # Check these serializations and lines to make sure they work properly once more data is in the seed.py
            response_body['distributors'] = [distributor.to_dict() for distributor in list(set(customer_user.distributors))]

            return make_response(response_body, 200)
        else:
            response_body = {
                'error': 'Please Log In!'
            }
            return make_response(response_body, 401)


api.add_resource(CheckSession, '/check_session')



class Logout(Resource):

    def delete(self):
        if(session.get('customer_id')): 
            del(session['customer_id'])
        
        response_body = {}
        return make_response(response_body, 204)


api.add_resource(Logout, '/logout')
        
        


















if __name__ == '__main__':
    app.run(port=5555, debug=True)

