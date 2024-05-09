
import React from 'react'

function DeleteButton({ distributor, deleteDistributorRelationship }) {


    // console.log(distributor);

    function handleDeleteButtonClick() {

        deleteDistributorRelationship(distributor.id)


    }






    return (
        <button onClick={handleDeleteButtonClick} className=' border-solid text-red-700'>Delete</button>

    )
}

export default DeleteButton;