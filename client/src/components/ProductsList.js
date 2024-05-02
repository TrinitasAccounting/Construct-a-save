
import React, { useState } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";

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




    return (
        <>
            {isEditing ? (
                <div>
                    <EditProduct stopEditingAfterDelete={stopEditingAfterDelete} deleteProduct={deleteProduct} editForm={editForm} handleChange={handleChange} handleProductUpdate={handleProductUpdate} />
                </div>
            ) :
                <div>


                    <table>
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Modify Customer</th>
                            </tr>
                        </thead>
                        <tbody>

                            {customersProducts.map(product =>

                                <Product
                                    key={product.id}
                                    product={product}
                                    captureEdit={captureEdit}
                                    changeEditState={changeEditState}
                                />
                            )}

                        </tbody>
                    </table>
                    <NewProductSlideOver onShowNewProduct={onShowNewProduct} slideOpen={slideOpen} />




                </div>



            }



        </>
    )
}

export default ProductList;