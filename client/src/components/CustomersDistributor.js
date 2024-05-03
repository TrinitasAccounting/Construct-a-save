
import { useOutletContext, Link } from "react-router-dom";

import DistributorCards from "./DistributorCards";
import DropdownSelect from "./DropdownSelect";
import { useState } from "react";

import NewDistributorSlideOver from "./NewDistributorSlideOver";



function CustomersDistributors() {

    const { distributors, user, allDistributors } = useOutletContext();

    const [distributorSlide, setDistributorSlide] = useState(false);


    // console.log(distributors);

    // const distributorsComponent = distributors.map(distributor => {
    //     return (
    //         <div key={distributor.id}>
    //             <li>{distributor.company_name}</li>
    //         </div>
    //     )
    // })


    // Example of an admin and customer changing function:__________________________________
    // ____Then you put it into a ternary operator in the return statement ===>  {user ? displayDistributorInfor() : null}
    // function displayDistributorInfo() {
    //     if (user.user_type === 'customer' && distributors.length > 0) {
    //         return <h1>Here are the distributors</h1>
    //     }
    //     else if(user.user_type === 'customer' && distributors.length === 0) {
    //         return <h1>You have no selected/partners with any distributors yet</h1>
    //     }
    //     else if (user.user_type === 'distributor') {
    //         return <h1>Here are the customers you work with</h1>
    //     }
    // }

    function openCloseDistributorSlide() {
        return (
            setDistributorSlide(distributorSlide => !distributorSlide)
        )
    }



    return (
        <div>
            {/* <ul>
                {distributorsComponent}
            </ul> */}
            <div className='m-4 grid gap-4 grid-cols-12'>
                <div className='col-span-11'></div>
                <div >
                    {/* <button
                        onClick={openCloseDistributorSlide}
                        type="button"
                        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        + Add New Distributor
                    </button> */}
                </div>
            </div>
            <NewDistributorSlideOver distributorSlide={distributorSlide} openCloseDistributorSlide={openCloseDistributorSlide} allDistributors={allDistributors} />
            <DropdownSelect allDistributors={allDistributors} />
            <DistributorCards distributors={distributors} />
            {/* <h1 className='text-4xl'>DistributorCards</h1> */}
        </div>
    )
}

export default CustomersDistributors;








