import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


import NavBar from './NavBar';
import TailwindExample from "./TailwindExample";
import DistributorCards from "./DistributorCards";



function App() {

  const [distributors, setDistributors] = useState([])


  // Getting all of the distributors for all customers__________________
  useEffect(() => {
    fetch('/distributors')
      .then(res => res.json())
      .then(data => setDistributors(data))
  }, [])

  console.log(distributors);




  return (
    <div>
      <NavBar />
      <Outlet context={{ distributors: distributors }} />

    </div>)
};

export default App;
