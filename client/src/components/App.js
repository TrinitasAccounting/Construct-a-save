import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";


import NavBar from './NavBar';
import DistributorCards from "./CustomersDistributor";



function App() {

  const navigate = useNavigate();

  const [distributors, setDistributors] = useState([])
  const [user, setUser] = useState(null)
  const [allDistributors, setAllDistributors] = useState([])
  // const [customersProducts, setCustomersProducts] = useState([])
  const [slideOpen, setSlideOpen] = useState(false)
  const [customersDistributorRelationships, setCustomersDistributorRelationships] = useState([]);



  // Trying to build out the pop up for customers products
  const [products, setProducts] = useState([]);



  // console.log(user);


  //   useEffect(() => {
  //     fetch(`/customers/products/${user.id}`)
  //       .then(res => {
  //         if (res.ok) {
  //           res.json().then(productData => {
  //             setProducts(productData)
  //           })
  //         }
  //         else if (res.status == 404) {
  //           res.json().then(errorData => alert(`Error: ${errorData.error}`))
  //         }
  //         else {
  //           res.json().then(() => alert("Error: Something went wrong"))
  //         }
  //       })
  //   }, [])
  // }


  useEffect(() => {
    fetch('/customers/products')
      .then(res => {
        if (res.ok) {
          res.json().then(data => setProducts(data))
        }
      })
  }, [user])



  // let productsArray = []

  // if (user) {
  //   productsArray = products.map((product) => {
  //     if (product.customer_id === user.id) {
  //       return product
  //     }
  //   })
  //   setCustomersProducts(customersProducts => productsArray)
  // }
  // // else {
  // //   customers_products = []
  // // }


  // console.log(customersProducts);



  //  Also make sure that we pass this down as an outlet context_______________
  function onUpdateProduct(updatedProduct) {
    const updatedProducts = products.map(
      product => {
        if (product.id === updatedProduct.id) {
          return updatedProduct
        } else { return product }
      }
    )
    setProducts(updatedProducts)
  }



  // New Product Slide open and hide function
  function onShowNewProduct() {
    setSlideOpen(slideOpen => !slideOpen)
  }



  // Add a new product on their My Products page (POST)
  function addNewProduct(newProduct) {
    fetch('/customers/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then(res => {
        if (res.ok) {
          res.json().then(newProductData => {
            setProducts([...products, newProductData])

          })
        }
        else if (res.status === 400) {
          res.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
        else if (res.status === 401) {
          res.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
        else {
          res.json().then(() => alert("Error: Something went wrong"))
        }
      })
  }


  // Deleting a product from the My Products Page
  function deleteProduct(id) {
    fetch(`/customers/products/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          setProducts(products => products.filter(product => {
            return product.id !== id
          }))
        }
        else if (res.status === 404) {
          res.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
      })
  }























  // Getting all of the distributors for all single customer__________________
  useEffect(() => {
    fetch('/customers/distributors')
      .then(res => {
        if (res.ok) {
          res.json().then(data => setDistributors(data))
        }
      })
  }, [user])


  useEffect(() => {
    fetch('/distributors')
      .then(res => {
        if (res.ok) {
          res.json().then(data => setAllDistributors(data))
        }
      })
  }, [])


  // fetch request to get the products by customer id
  // function productsByCustomerID(id) {
  //   fetch(`/customers/products/${id}`)
  //     .then(res => {
  //       if (res.ok) {
  //         res.json().then(data => setProducts(data))
  //       }
  //     })
  // }






  // Getting all of the distributors for all single customer__________________I beleive the correct version
  // useEffect(() => {
  //   fetch('/customers/distributors/addrelationship')
  //     .then(res => {
  //       if (res.ok) {
  //         res.json().then(data => setCustomersDistributorRelationships(data))
  //       }
  //     })
  // }, [user])

  // console.log(customersDistributorRelationships);





  // Add a new customer distributor relationship from the my distributors page (POST)
  function addNewDistributor(newDistributor) {
    fetch('/customers/distributors', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newDistributor)
    })
      .then(res => {
        if (res.ok) {
          res.json().then(newDistributorData => {
            setDistributors([...distributors, newDistributorData])
            // console.log(newDistributorData)

          })
        }
        else if (res.status === 400) {
          res.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
        else if (res.status === 401) {
          res.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
        else {
          res.json().then(() => alert("Error: Something went wrong"))
        }
      })
  }




  // Deleting a Customer Distributor Relationship from the Customers_Distributors Table (DELETE)
  function deleteDistributorRelationship(id) {
    fetch(`/customers/distributors/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          setDistributors(distributor => distributor.filter(distributor => {
            return distributor.id !== id
          }))
        }
        else if (res.status === 404) {
          res.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
      })
  }

























  // All login fetch request below______________________________________________________________________________________________________

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


  // Signing Up a new user (Customer version)
  function signupUserCustomer(signupData, setFormData) {
    fetch('/customers/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(signupData)
    })
      .then(res => {
        if (res.ok) {
          res.json().then(userData => {
            setUser(userData)
            navigate('/')
          })
        }
        else if (res.status === 400) {
          res.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
      })
  }

  // Signing Up a new user (distributor version)
  function signupUserDistributor(signupData) {
    fetch('/distributors/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(signupData)
    })
      .then(res => {
        if (res.ok) {
          res.json().then(userData => {
            setUser(userData)
            navigate('/')
          })
        }
        else if (res.status === 400) {
          res.json().then(errorData => alert('Did not work'))
        }
      })

  }


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
      {/* {user ? <h1 className='text-10'>Welcome {user.username}</h1> : null} */}
      {/* <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600"></p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Coming Soon</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, the home page isn't completed yet. Please try another page.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/mydistributors"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Check Out another Page
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main> */}
      {/* <h1>Is this the correct page sections</h1> */}
      {/* {user ? null : <Navigate to='/login' />} */}
      {/* <Navigate to='/login' /> */}
      <Outlet context={{
        products: products,
        addNewProduct: addNewProduct,
        deleteProduct: deleteProduct,
        onUpdateProduct: onUpdateProduct,
        distributors: distributors,
        loginUser: loginUser,
        user: user,
        signupUserCustomer: signupUserCustomer,
        signupUserDistributor: signupUserDistributor,
        allDistributors: allDistributors,
        slideOpen: slideOpen,
        onShowNewProduct: onShowNewProduct,
        addNewDistributor: addNewDistributor,
        deleteDistributorRelationship: deleteDistributorRelationship
      }} />

    </div>)
};

export default App;
