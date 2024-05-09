


import React from "react";
import { useState } from 'react';

import { useOutletContext, useNavigate } from "react-router-dom";

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon } from '@heroicons/react/20/solid'



function SignupFormDistributor() {

    const navigate = useNavigate();


    // const [username, setUsername] = useState("");
    const [formData, setFormData] = useState({
        company_name: "",
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: ""

    })

    const { signupUserDistributor } = useOutletContext();



    // function updateUsername(event) {
    //     setUsername(event.target.value)
    // };
    function updateFormData(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }


    function handleSubmit(event) {
        event.preventDefault()

        signupUserDistributor(formData)
        // setFormData({
        //     company_name: "",
        //     username: "",
        //     password: "",
        //     first_name: "",
        //     last_name: "",
        //     email: ""
        // })


    }







    return (
        <div className='pl-4'>
            {/* <form onSubmit={handleSubmit}>
                <input onChange={updateFormData} type="text" name="company_name" placeholder="Company Name" value={formData.company_name} required />
                <input onChange={updateFormData} type="text" name="username" placeholder="Username" value={formData.username} required />
                <input onChange={updateFormData} type="password" name="password" placeholder="Password" value={formData.password} required />
                <input onChange={updateFormData} type="text" name="first_name" placeholder="First Name" value={formData.first_name} required />
                <input onChange={updateFormData} type="text" name="last_name" placeholder="Last Name" value={formData.last_name} required />
                <input onChange={updateFormData} type="text" name="email" placeholder="Email" value={formData.email} required />
                <button type="submit" className='rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
            </form> */}


            <div className='pl-4'>
                <h2>You are signing up as a distributor that sells construction supplies</h2>
                <br />
                {/* <form onSubmit={handleSubmit}>
                <input onChange={updateFormData} type="text" name="company_name" placeholder="Company Name" value={formData.company_name} required />
                <input onChange={updateFormData} type="text" name="username" placeholder="Username" value={formData.username} required />
                <input onChange={updateFormData} type="password" name="password" placeholder="Password" value={formData.password} required />
                <input onChange={updateFormData} type="text" name="first_name" placeholder="First Name" value={formData.first_name} required />
                <input onChange={updateFormData} type="text" name="last_name" placeholder="Last Name" value={formData.last_name} required />
                <input onChange={updateFormData} type="text" name="email" placeholder="Email" value={formData.email} required />
                <button type="submit" className='rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
            </form> */}



                {/* ____________________________________________________________________________ */}
                <div className='absolute inset-x-20 top-00 h-16 '>

                    <span className="isolate inline-flex rounded-md shadow-sm left-10">
                        <button
                            type="button"
                            className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                            onClick={() => { navigate('/customers/signup') }}
                        >
                            Sign Up as a Customer
                        </button>
                        <button
                            type="button"
                            className="bg-orange-400 relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10"

                        >
                            Sign Up as a Distributor
                        </button>

                    </span>

                </div>

                {/* _____________________________________________________________________________________ */}


                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">

                        <div className="border-b border-gray-900/10 pb-12">
                            <br />
                            <br />
                            {/* <h2 className="text-base font-semibold leading-7 text-gray-900">User Information</h2> */}

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={updateFormData}
                                            value={formData.first_name}
                                            name="first_name"
                                            type="text"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={updateFormData}
                                            value={formData.last_name}
                                            name="last_name"
                                            type="text"

                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Company Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={updateFormData}
                                            value={formData.company_name}
                                            name="company_name"
                                            type="text"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={updateFormData}
                                            value={formData.email}
                                            name="email"
                                            id="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={updateFormData}
                                            value={formData.username}
                                            name="username"
                                            type="text"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={updateFormData}
                                            value={formData.password}
                                            name="password"
                                            type="password"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6 pr-7">
                        {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button> */}
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

            </div>

        </div>








    )
}


export default SignupFormDistributor;