import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";


import NavBar from './NavBar';
import DistributorCards from "./CustomersDistributor";



function App() {

  const navigate = useNavigate();

  const [distributors, setDistributors] = useState([])
  const [user, setUser] = useState(null)


  // Getting all of the distributors for all customers__________________
  useEffect(() => {
    fetch('/distributors')
      .then(res => res.json())
      .then(data => setDistributors(data))
  }, [])


  // CheckSession useEffect to check for user on refreshes_______________
  useEffect(() => {
    fetch('/check_session')
      .then(res => {
        if (res.ok) {
          res.json().then(userData => {
            setUser(userData)
            // navigate('/')
          })
        }
        // else if (res.status === 401) {
        //   res.json().then(errorData => alert(`Error: ${errorData.error}`))
        // }
      })

  }, [])






  // Login Form Functions
  function loginUser(loginData) {
    fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(loginData)
    })
      .then(res => {
        if (res.ok) {
          res.json().then(userData => {
            setUser(userData)
            navigate('/')
          })
        }
        else if (res.status === 401) {
          res.json().then(errorData => alert(errorData.error))
        }
      })
  };


  // Logging Out a user
  function logOutUser() {
    fetch('/logout', {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          setUser(null)
        }
        else {
          alert("Error: Unable to log the user out")
        }
      })
  }






  return (
    <div>
      <NavBar userData={user} logOutUser={logOutUser} />
      {user ? <h1>Welcome {user.id} && {user.username}</h1> : null}

      {/* {user ? null : <Navigate to='/login' />} */}


      {/* <Navigate to='/login' /> */}


      <Outlet context={{ distributors: distributors, loginUser: loginUser }} />

    </div>)
};

export default App;
