
import React, { useState } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

import Product from './Product';
import EditProduct from './EditProduct';
import NewProductSlideOver from './NewProductSlideOver';


function ProductList() {

    const { products, onUpdateProduct, user, slideOpen, onShowNewProduct, deleteProduct } = useOutletContext();

    // console.log(user.id);

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        id: "",
        product_name: "",
        manufacturer: "",
        customer_id: "",
        orders: ""
    })








    // This is filtering the products by the customer_id______________________
    let customersProducts = []

    if (user) {
        customersProducts = products.filter((product) => {
            return (product.customer_id === user.id)
        })
    }
    else {
        customersProducts = []
    }


    function stopEditingAfterDelete() {
        setIsEditing(false)
    }





    // when PATCH request happens this automatically hides the form, and pushes the changes to display
    function handleProductUpdate(updatedProduct) {
        setIsEditing(false);
        onUpdateProduct(updatedProduct)
    };


    // capture user input in edit form inputs
    function handleChange(event) {
        setEditForm({
            ...editForm, [event.target.name]: event.target.value
        })
    }


    // needed logic for conditional rendering of the form - shows the customer you want when you want them and hides it when you donts
    function changeEditState(product) {
        if (product.id === editForm.id) {
            setIsEditing(isEditing => !isEditing)
        }
        else if (isEditing === false) {
            setIsEditing(isEditing => !isEditing)
        }
    }


    // capture the customer you wish to edit, set to state
    function captureEdit(clickedProduct) {
        let filtered = products.filter(product => product.id === clickedProduct.id)
        setEditForm(filtered[0])
    }


    // const people = [
    //     { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    //     // More people...
    // ]


    return (
        <>
            {isEditing ? (
                <div className='m-4 grid gap-4 sm:grid-cols-12'>

                    <div className='min-h-[30px] shadown col-span-7'>
                        <EditProduct stopEditingAfterDelete={stopEditingAfterDelete} deleteProduct={deleteProduct} editForm={editForm} handleChange={handleChange} handleProductUpdate={handleProductUpdate} />
                    </div>

                </div>
            ) :
                <div>

                    <NewProductSlideOver onShowNewProduct={onShowNewProduct} slideOpen={slideOpen} />

                    {/* <div className='m-4 grid gap-4 grid-cols-12'>

                        <div className='col-span-11'>

                            <table className='min-w-full divide-y divide-gray-300'>
                                <thead >
                                    <tr >
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Manufacturer</th>
                                        <th>Edit Product</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300 bg-gray-100">

                                    {customersProducts.map(product =>

                                        <Product
                                            className='text-center'
                                            key={product.id}
                                            product={product}
                                            captureEdit={captureEdit}
                                            changeEditState={changeEditState}
                                        />
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div> */}





                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">Products</h1>
                                {/* <p className="mt-2 text-sm text-gray-700">
                                    A list of all the users in your account including their name, title, email and role.
                                </p> */}
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                {/* <button
                                    type="button"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add user
                                </button> */}
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Product ID
                                                    </th>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Product Name
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Manufacturer
                                                    </th>
                                                    {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Role
                                                    </th> */}
                                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                        <span className="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {customersProducts.map((product) => (
                                                    <tr key={product.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {product.id}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.product_name}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.manufacturer}</td>
                                                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td> */}
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <a href="#"
                                                                onClick={() => {
                                                                    captureEdit(product);
                                                                    changeEditState(product)
                                                                }}
                                                                className="text-indigo-600 hover:text-indigo-900">
                                                                Edit<span className="sr-only">, {product.id}</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>



            }



        </>
    )
}

export default ProductList;













