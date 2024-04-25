
import { useOutletContext, Link } from "react-router-dom";

import DistributorCardsBetter from "./DistributorCardsBetter";



function DistributorCards() {

    const { distributors } = useOutletContext();

    console.log(distributors);

    const distributorsComponent = distributors.map(distributor => {
        return (
            <div key={distributor.id}>
                <li>{distributor.company_name}</li>
            </div>
        )
    })

    return (
        <div>
            <ul>
                {distributorsComponent}
            </ul>
            <DistributorCardsBetter />
            {/* <h1 className='text-4xl'>DistributorCards</h1> */}
        </div>
    )
}

export default DistributorCards;








