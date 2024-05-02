
import React, { useEffect } from "react";
import { useState } from 'react';

import { useOutletContext, useNavigate } from "react-router-dom";

// import ProductEditPopUp from "./ProductEditPopUp";

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'



function CustomerProducts() {


    const { user } = useOutletContext();

    // console.log(user);


    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     fetch(`/customers/products/${id}`)
    //     .then(res => {
    //         if(res.ok) {
    //             res.json().then(productData => {
    //                 setProducts(productData)
    //             })
    //         }
    //         else if (res.status == 404) {
    //             res.json().then(errorData => alert(`Error: ${errorData.error}`))
    //         }
    //         else {
    //             res.json().then(() => alert("Error: Something went wrong"))
    //         }
    //     })
    // }, [])


    // console.log(products);

    let productsArray = []

    console.log(productsArray);

    if (user) {
        productsArray = user.products
    }
    else {
        productsArray = []
    }






    const transactions = [
        {
            id: 'AAPS0L',
            company: 'Chase & Co.',
            share: 'CAC',
            commission: '+$4.37',
            price: '$3,509.00',
            quantity: '12.00',
            netAmount: '$4,397.00',
        },
        // More transactions...
    ]




    //   To open the popup box onClick of edit button
    function openOnClickOfEdit() {
        setOpen(open => !open)
    }








    return (
        <div>

            {open ?

                <h1>it is open currently</h1>




                // <Transition.Root show={open} as={Fragment}>
                //     <Dialog as="div" className="relative z-10" onClose={setOpen}>
                //         <Transition.Child
                //             as={Fragment}
                //             enter="ease-out duration-300"
                //             enterFrom="opacity-0"
                //             enterTo="opacity-100"
                //             leave="ease-in duration-200"
                //             leaveFrom="opacity-100"
                //             leaveTo="opacity-0"
                //         >
                //             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                //         </Transition.Child>

                //         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                //             <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                //                 <Transition.Child
                //                     as={Fragment}
                //                     enter="ease-out duration-300"
                //                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                //                     enterTo="opacity-100 translate-y-0 sm:scale-100"
                //                     leave="ease-in duration-200"
                //                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                //                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                //                 >

                //                     {/* this controls the size */}
                //                     <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                //                         <div>
                //                             {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                //                                 <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                //                             </div> */}
                //                             <div className="mt-3 text-center sm:mt-5">
                //                                 <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                //                                     Payment successful
                //                                 </Dialog.Title>
                //                                 <div className="mt-2">
                //                                     <p className="text-sm text-gray-500">
                //                                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                //                                     </p>
                //                                 </div>
                //                             </div>
                //                         </div>
                //                         <div className="mt-5 sm:mt-6">
                //                             <button
                //                                 type="button"
                //                                 className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                //                                 onClick={() => setOpen(false)}
                //                             >
                //                                 Go back to dashboard
                //                             </button>
                //                         </div>
                //                     </Dialog.Panel>
                //                 </Transition.Child>
                //             </div>
                //         </div>
                //     </Dialog>
                // </Transition.Root>









                :





                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">

                            <h1 className="mt-2 text-lg text-gray-700">
                                Products Table
                            </h1>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add New Product
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                            >
                                                Product ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Product Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Manufacturer
                                            </th>
                                            <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-10 sm:pr-0">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {productsArray.map((product) => (
                                            <tr key={product.id}>
                                                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{product.id}</td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                                    {product.product_name}
                                                </td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{product.manufacturer}</td>

                                                <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    <button onClick={openOnClickOfEdit} className="text-indigo-600 hover:text-indigo-900">
                                                        Edit<span className="sr-only">, {product.id}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}

export default CustomerProducts;


