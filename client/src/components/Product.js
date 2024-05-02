

import React from 'react'


function Product({ product, product: { id, product_name, manufacturer, customer_id, orders }, captureEdit, changeEditState }) {

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{product_name}</td>
            <td>{manufacturer}</td>
            {/* <td>{customer_id}</td>
            <td>{orders}</td> */}
            <td>
                <button
                    onClick={() => {
                        captureEdit(product);
                        changeEditState(product)
                    }}
                >
                    Edit
                </button>
            </td>
        </tr>
    )
}
export default Product;










