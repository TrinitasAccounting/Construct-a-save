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



  // Trying to build out the pop up for customers products
  const [products, setProducts] = useState([]);


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
      {user ? <h1 className='text-10'>Welcome {user.username}</h1> : null}
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
        onShowNewProduct: onShowNewProduct
      }} />

    </div>)
};

export default App;
