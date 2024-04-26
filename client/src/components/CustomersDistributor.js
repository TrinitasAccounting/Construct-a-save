
import { useOutletContext, Link } from "react-router-dom";

import DistributorCards from "./DistributorCards";



function CustomersDistributors() {

    const { distributors } = useOutletContext();

    // console.log(distributors);

    // const distributorsComponent = distributors.map(distributor => {
    //     return (
    //         <div key={distributor.id}>
    //             <li>{distributor.company_name}</li>
    //         </div>
    //     )
    // })

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








