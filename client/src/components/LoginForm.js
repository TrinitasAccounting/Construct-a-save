import React from "react";
import { useState } from 'react';

import { useOutletContext } from "react-router-dom";



function LoginForm() {

    // const [username, setUsername] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const { loginUser } = useOutletContext();


    // function updateUsername(event) {
    //     setUsername(event.target.value)
    // };
    function updateFormData(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }


    function handleSubmit(event) {
        event.preventDefault()
        // const loginData = { username: username }
        loginUser(formData)




    }





    return (
        <div className='pl-4'>
            <div className='grid gap-4 sm:grid-cols-12'>
                <div className='col-span-5 pl-10'><h1 className='text-3xl'>Login with Username and Password</h1></div>
                <div className='col-span-1'></div>
            </div>
            <form className='p-1 m-5' onSubmit={handleSubmit}>
                <input className='p-1 m-5' onChange={updateFormData} type="text" name="username" placeholder="Username" value={formData.username} required />
                <input className='p-1 m-5' onChange={updateFormData} type="password" name="password" placeholder="Password" value={formData.password} required />
                <button type="submit" className='p-1 m-5 rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
            </form>

        </div>
    )
}


export default LoginForm;