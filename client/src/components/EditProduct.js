

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
            <h2>Edit Product {product_name}:</h2>
            <form onSubmit={handleEditForm}>
                <input className='p-1 m-5' type='text' name='product_name' value={product_name} onChange={handleChange} />
                <input className='p-1 m-5' type='text' name='manufacturer' value={manufacturer} onChange={handleChange} />
                {/* <input type='text' name='product_name' value={product_name} onChange={handleChange} /> */}
                <button className='p-1 m-5 h-[30px] bg-slate-700 w-40 roundedpx-2 py-1 text-base font-semibold text-white shadow-sm hover:bg-blue-700' type="submit">Submit Changes</button>
                <button className='p-1 m-5 h-[30px] bg-red-600 w-40 roundedpx-2 py-1 text-base font-semibold text-white shadow-sm hover:bg-red-900' onClick={handleDeleteButtonClick}>Delete</button>

            </form>

        </div >
    )
}

export default EditProduct;











