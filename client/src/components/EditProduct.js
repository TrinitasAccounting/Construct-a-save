

import React from 'react'

function EditProduct({ editForm, handleProductUpdate, handleChange, deleteProduct, stopEditingAfterDelete }) {
    let { id, product_name, manufacturer, customer_id, orders } = editForm




    function handleEditForm(event) {
        event.preventDefault();
        fetch(`/customers/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editForm)
        })
            .then(res => res.json())
            .then(updatedProduct => handleProductUpdate(updatedProduct))
    }


    function handleDeleteButtonClick() {

        // console.log(editForm.id)
        deleteProduct(editForm.id)
        stopEditingAfterDelete()

    }







    return (
        <div>
            <h4>Edit Product</h4>
            <form onSubmit={handleEditForm}>
                <input type='text' name='product_name' value={product_name} onChange={handleChange} />
                <input type='text' name='manufacturer' value={manufacturer} onChange={handleChange} />
                {/* <input type='text' name='product_name' value={product_name} onChange={handleChange} /> */}
                <button type="submit">Submit Changes</button>
                <button onClick={handleDeleteButtonClick}>Delete</button>

            </form>

        </div>
    )
}

export default EditProduct;











