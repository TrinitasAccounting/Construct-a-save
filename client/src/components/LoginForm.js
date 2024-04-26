import React from "react";
import { useState } from 'react';

import { useOutletContext } from "react-router-dom";



function LoginForm() {

    const [username, setUsername] = useState("");

    const { loginUser } = useOutletContext();


    function updateUsername(event) {
        setUsername(event.target.value)
    };


    function handleSubmit(event) {
        event.preventDefault()
        const loginData = { username: username }
        loginUser(loginData)


    }





    return (
        <div className='pl-4'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={updateUsername} type="text" name="username" placeholder="Username" value={username} required />
                {/* <input type="password" name="password" placeholder="Password" required /> */}
                <button type="submit" className='rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
            </form>

        </div>
    )
}


export default LoginForm;