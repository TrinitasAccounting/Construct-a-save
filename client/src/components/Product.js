

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
                <div>

                    <button

                        className="bg-slate-700 w-10 roundedpx-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                        onClick={() => {
                            captureEdit(product);
                            changeEditState(product)
                        }}
                    >
                        Edit
                    </button>
                </div>
            </td>
        </tr>
    )
}
export default Product;










