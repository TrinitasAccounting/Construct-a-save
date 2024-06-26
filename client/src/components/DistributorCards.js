

import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import DeleteButton from './ButtonForDelete';



function handleDeleteClick(distributor) {
    console.log(distributor.id)
}




export default function DistributorCards({ distributors, deleteDistributorRelationship }) {

    // console.log(distributors[0]['distributor'])


    // const distributorInformationArray = distributors.map((distributor) => {
    //     return (distributor['distributor'])

    // })

    // console.log(distributorInformationArray);

    // console.log(distributors);


    // The goal would be to change the "distributorInformationArray" to map and show distributor only. Then in the table map to do distributor['distributor'].company_name









    return (
        <div className='flex justify-center '>

            {(distributors.length === 0) ? <h1>No distributor information</h1>

                :

                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {distributors.map((distributor) => (
                        <li key={distributor['distributor'].id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                            <div className="flex w-full items-center justify-between space-x-6 p-6">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="truncate text-lg font-medium text-gray-900">{distributor['distributor'].company_name}</h3>
                                        <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            {distributor['distributor'].user_type}
                                        </span>
                                    </div>
                                    <p className="mt-1 truncate text-sm text-gray-500">{distributor['distributor'].first_name} {distributor['distributor'].last_name}</p>
                                </div>

                                <div >
                                    <DeleteButton distributor={distributor} deleteDistributorRelationship={deleteDistributorRelationship} />
                                </div>
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200">
                                    {/* <div className="flex w-0 flex-1">
                                        <a
                                            href={`mailto:${person.email}`}
                                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                        >
                                            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            Email
                                        </a>
                                    </div> */}
                                    {/* <div className="-ml-px flex w-0 flex-1">
                                        <a
                                            onClick={handleDeleteClick(distributor)}
                                            // href={`tel:${distributor.telephone}`}
                                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                        >
                                            <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            Delete
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            }



        </div>
    )
}