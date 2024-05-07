
import React from 'react'

function DeleteButton({ distributor, deleteDistributorRelationship }) {


    // console.log(distributor);

    function handleDeleteButtonClick() {

        console.log(distributor.id)
        deleteDistributorRelationship(distributor.id)


    }






    return (
        <button onClick={handleDeleteButtonClick}>Delete</button>

    )
}

export default DeleteButton;