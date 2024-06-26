#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

from flask_bcrypt import Bcrypt

# Local imports
from config import app, db, api
# Add your model imports
from models import Users_Customers, Users_Distributors, Customer_Products, Customer_Orders_Placed, Customers_Distributors, Distributor_Prices



app.secret_key = b'\xea\xfb\xedQ\xf5-r/0g\x9d@^\xd4^l'

bcrypt = Bcrypt(app)

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



class AllProducts(Resource):

    def get(self):

        products = Customer_Products.query.all()

        response_body = [product.to_dict() for product in products]
        return make_response(response_body, 200)

    
    def post(self):
        # user_is_a_customer = Users_Customers.query.filter(Users_Customers.id == session.get(''))
        customer_user = db.session.get(Users_Customers, session.get('customer_id'))
        distributor_user = db.session.get(Users_Distributors, session.get('distributor_id'))

        if (customer_user or distributor_user):
            try:
                new_product = Customer_Products(product_name=request.json.get('product_name'), manufacturer=request.json.get('manufacturer'), customer_id=customer_user.id)
                db.session.add(new_product)
                db.session.commit()
                response_body = new_product.to_dict()
                return make_response(response_body, 201)

            except:
                response_body = {
                    "error": "Product must have a name and a manufacturer"
                }
                return make_response(response_body, 400)

        else:
            response_body = {
                "error": "You are not authorized to add a new product"
            }
            return make_response(response_body, 401)




api.add_resource(AllProducts, '/customers/products')






class ProductsByID(Resource):


    # This is incorrect, it is fetching by customer id instead of by product id___________________________
    def get(self, id):

        customer = Users_Customers.query.filter(Users_Customers.id == id).first()

        if customer:
            response_body = customer.to_dict()
            return make_response(response_body, 200)

        else:
            response_body = {
                "error": "Customer not found"
            }
            return make_response(response_body, 404)

    
    def patch(self, id):
        product = db.session.get(Customer_Products, id)

        if product:
            try:
                for attr in request.json:
                    setattr(product, attr, request.json[attr])

                db.session.commit()
                response_body = product.to_dict()
                return make_response(response_body, 200)

            except:
                response_body = {
                    "error": "Product must have a name and a manufacturer"
                }
                return make_response(response_body, 400)

        else:
            response_body = {
                'error': "Product Not Found"
            }
            return make_response(response_body, 404)



    def delete(self,id):
        # product = Customer_Products.query.filter(Customer_Products.id == id)
        product = db.session.get(Customer_Products, id)

        if product:
            db.session.delete(product)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)

        else: 
            response_body = {
                'error': "Product Not Found"
            }
            return make_response(response_body, 404)




api.add_resource(ProductsByID, '/customers/products/<int:id>')











class CustomersDistributors(Resource):

    def get(self):

        # 'customer_id' is what matches the session['------']
        user = Users_Customers.query.filter(Users_Customers.id == session.get('customer_id')).first()

        if user and user.user_type == 'customer':
            # distributors = Users_Distributors.query.all()

            response_body = [distributor.to_dict() for distributor in list(set(user.distributors))]
            return make_response(response_body, 200)

            # This is how we can filter to only show the users connected distributors__________________________
            # user_distributors = [distributor.to_dict(only=('id',)) for distributor in list(set(user.distributors))]
        
        # elif user and user.type != 'customer':
        #     pass
        else:
            response_body = {
                "error" : "You are not authorized to view the distributors for this customer"
            }
            return make_response(response_body, 401)


    # def post(self):
    #     # 'customer_id' is what matches the session['------']
    #     user = Users_Customers.query.filter(Users_Customers.id == session.get('customer_id')).first()


    #     # You can make this show different things as well depending on the customer type. Look back at the lecture code_____
    #     if user and user.user_type == 'customer':
    #         try:
    #             pass
    #         except:
    #             pass


    def post(self):
        # user_is_a_customer = Users_Customers.query.filter(Users_Customers.id == session.get(''))
        # customer_user = db.session.get(Users_Customers, session.get('customer_id'))
        # distributor_user = db.session.get(Users_Distributors, session.get('distributor_id'))
        user = Users_Customers.query.filter(Users_Customers.id == session.get('customer_id')).first()

        if (user):
            try:
                new_customer_distributor_relationship = Customers_Distributors(distributor_name=request.json.get('distributor_name'), customer_id=user.id, distributor_id=request.json.get('distributor_id'))
                db.session.add(new_customer_distributor_relationship)
                db.session.commit()
                response_body = new_customer_distributor_relationship.to_dict()
                return make_response(response_body, 201)

            except:
                response_body = {
                    "error": "This distributor cannot be added yet"
                }
                return make_response(response_body, 400)

        else:
            response_body = {
                "error": "You are not authorized to add a new distributor relationship"
            }
            return make_response(response_body, 401)




api.add_resource(CustomersDistributors, '/customers/distributors')




class CustomerDistributorByID(Resource):

    def delete(self,id):
        # product = Customer_Products.query.filter(Customer_Products.id == id)
        distributor_relationship = db.session.get(Customers_Distributors, id)

        if distributor_relationship:
            db.session.delete(distributor_relationship)
            db.session.commit()
            response_body = {}
            return make_response(response_body, 204)

        else: 
            response_body = {
                'error': "Customer Distributor Relationship Not Found"
            }
            return make_response(response_body, 404)


api.add_resource(CustomerDistributorByID, '/customers/distributors/<int:id>')


        









# class CustomerInviteToANewDistributor(Resource):


#     def get(self):

#         # 'customer_id' is what matches the session['------']
#         # user = Users_Customers.query.filter(Users_Customers.id == session.get('customer_id')).first()
#         customer_user = db.session.get(Users_Customers, session.get('customer_id'))

#         if customer_user.user_type == 'customer':
#             distributors = Customers_Distributors.query.filter(Customers_Distributors.customer_id == customer_user.id).all()

#             response_body = [distributor.to_dict(rules=('-customer.distributors', '-distributor.customers')) for distributor in list(set(distributors))]
#             return make_response(response_body, 200)

#             # This is how we can filter to only show the users connected distributors__________________________
#             # user_distributors = [distributor.to_dict(only=('id', 'company_name')) for distributor in list(set(user.distributors))]
        
#         # elif user and user.type != 'customer':
#         #     pass
#         else:
#             response_body = {
#                 "error" : "You are not authorized to view the distributors for this customer"
#             }
#             return make_response(response_body, 401)






    # def post(self):
    #     # user_is_a_customer = Users_Customers.query.filter(Users_Customers.id == session.get(''))
    #     customer_user = db.session.get(Users_Customers, session.get('customer_id'))
    #     # distributor_user = db.session.get(Users_Distributors, session.get('distributor_id'))

    #     if (customer_user):
    #         try:
    #             new_customer_distributor = Customers_Distributors(distributor_name=request.json.get('distributor_name'), customer_id=customer_user.id, distributor_id=request.json.get('distributor_id'))
    #             db.session.add(new_customer_distributor)
    #             db.session.commit()
    #             response_body = new_customer_distributor.to_dict(rules=('-customer.distributors', '-distributor.customers'))
    #             return make_response(response_body, 201)

    #         except:
    #             response_body = {
    #                 "error": "Did not select a valid Distributor"
    #             }
    #             return make_response(response_body, 400)

    #     else:
    #         response_body = {
    #             "error": "You are not authorized to add a new distributor"
    #         }
    #         return make_response(response_body, 401)


# api.add_resource(CustomerInviteToANewDistributor, '/customers/distributors/addrelationship')
















class Login(Resource):

    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        customer_user = Users_Customers.query.filter(Users_Customers.username == username).first()
        distributor_user = Users_Distributors.query.filter(Users_Distributors.username == username).first()

        if(customer_user and bcrypt.check_password_hash(customer_user.password_hash, password)):
            # Check the below line, this may be wrong and not called "customer_id"
            session['customer_id'] = customer_user.id
            response_body = customer_user.to_dict()
            response_body['distributors'] = [distributor.to_dict() for distributor in list(set(customer_user.distributors))]
            return make_response(response_body, 201)

        # This must have a validation or constraint to make sure usernames in the customer and distributor tables do not match. Otherwise, we will have to create a separate route for the distributor login
        elif(distributor_user and bcrypt.check_password_hash(distributor_user.password_hash, password)):
            # Check the below line, this may be wrong and not called "customer_id"
            session['distributor_id'] = distributor_user.id
            response_body = distributor_user.to_dict()
            response_body['customers'] = [customer.to_dict() for customer in list(set(distributor_user.customers))]
            return make_response(response_body, 201)

        else:
            response_body = {
                'error': 'Invalid Username or Password'
            }
            return make_response(response_body, 401)


api.add_resource(Login, '/login')


class CheckSession(Resource):
    
    def get(self):

        # Debugging Line
        # del(session['customer_id'])



        # the line below might also need to be checked as it is connected to line 75___________________
        customer_user = db.session.get(Users_Customers, session.get('customer_id'))
        distributor_user = db.session.get(Users_Distributors, session.get('distributor_id'))

        if(customer_user):
            response_body = customer_user.to_dict()

            # Check these serializations and lines to make sure they work properly once more data is in the seed.py
            response_body['distributors'] = [distributor.to_dict() for distributor in list(set(customer_user.distributors))]

            return make_response(response_body, 200)

        elif(distributor_user):
            response_body = distributor_user.to_dict()

            # Check these serializations and lines to make sure they work properly once more data is in the seed.py
            response_body['customers'] = [customer.to_dict() for customer in list(set(distributor_user.customers))]

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

        elif(session.get('distributor_id')): 
            del(session['distributor_id'])
        
        response_body = {}
        return make_response(response_body, 204)


api.add_resource(Logout, '/logout')
        



class Signup_Customer(Resource):

    def post(self):
        try:
            password = request.json.get('password')
            pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            new_customer = Users_Customers(company_name=request.json.get('company_name'), user_type='customer', first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), username=request.json.get('username'), email=request.json.get('email'), password_hash=pw_hash)
            db.session.add(new_customer)
            db.session.commit()
            session['customer_id'] = new_customer.id

            response_body = new_customer.to_dict()

            response_body['distributors'] = [distributor.to_dict() for distributor in list(set(new_customer.distributors))]

            return make_response(response_body, 201)

        # except:
        #     response_body = {
        #         "error": "User's company name and email address must be filled in"
        #     }
        #     return make_response(response_body, 400)

        except ValueError as value_error:
            value_error_string = str(value_error)
            response_body = {
                "error": value_error_string
            }
            return make_response(response_body, 400)


api.add_resource(Signup_Customer, '/customers/signup')



class Signup_Distributor(Resource):

    def post(self):
        try:
            password = request.json.get('password')
            pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            new_distributor = Users_Distributors(company_name=request.json.get('company_name'), user_type='distributor', first_name=request.json.get('first_name'), last_name=request.json.get('last_name'), username=request.json.get('username'), email=request.json.get('email'), password_hash=pw_hash)
            db.session.add(new_distributor)
            db.session.commit()
            session['distributor_id'] = new_distributor.id

            response_body = new_distributor.to_dict()

            response_body['customers'] = [customer.to_dict(only=('id','name')) for customer in list(set(new_distributor.customers))]

            return make_response(response_body, 201)

        # except:
        #     response_body = {
        #         "error" : "User's company name and email address must be filled in"
        #     }
        #     return make_response(response_body, 400)

        except ValueError as value_error:
            value_error_string = str(value_error)
            response_body = {
                "error": value_error_string
            }
            return make_response(response_body, 400)


api.add_resource(Signup_Distributor, '/distributors/signup')


















if __name__ == '__main__':
    app.run(port=5555, debug=True)

