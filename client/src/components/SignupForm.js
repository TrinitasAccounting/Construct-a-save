
import React from "react";
import { useState } from 'react';

import { useOutletContext } from "react-router-dom";



function SignupForm() {

    // const [username, setUsername] = useState("");
    const [formData, setFormData] = useState({
        company_name: "",
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: ""

    })

    const { signupUser } = useOutletContext();



    // function updateUsername(event) {
    //     setUsername(event.target.value)
    // };
    function updateFormData(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }


    function handleSubmit(event) {
        event.preventDefault()

        signupUser(formData)


    }





    return (
        <div className='pl-4'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={updateFormData} type="text" name="company_name" placeholder="Company Name" value={formData.company_name} required />
                <input onChange={updateFormData} type="text" name="username" placeholder="Username" value={formData.username} required />
                <input onChange={updateFormData} type="password" name="password" placeholder="Password" value={formData.password} required />
                <input onChange={updateFormData} type="text" name="first_name" placeholder="First Name" value={formData.first_name} required />
                <input onChange={updateFormData} type="text" name="last_name" placeholder="Last Name" value={formData.last_name} required />
                <input onChange={updateFormData} type="text" name="email" placeholder="Email" value={formData.email} required />
                <button type="submit" className='rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
            </form>

        </div>
    )
}


export default SignupForm;