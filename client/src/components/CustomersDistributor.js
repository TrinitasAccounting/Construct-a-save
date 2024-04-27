
import { useOutletContext, Link } from "react-router-dom";

import DistributorCards from "./DistributorCards";



function CustomersDistributors() {

    const { distributors, user } = useOutletContext();

    console.log(user);

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



    return (
        <div>
            {/* <ul>
                {distributorsComponent}
            </ul> */}
            <DistributorCards distributors={distributors} />
            {/* <h1 className='text-4xl'>DistributorCards</h1> */}
        </div>
    )
}

export default CustomersDistributors;







