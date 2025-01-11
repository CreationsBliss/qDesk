import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const MyBids = () => {

  const { user } = useContext(AuthContext)
  const [bids, setBids] = useState([])
  const axiosSecureInstance = useAxiosSecure()

  const getData = async () => {
    const { data } = await axiosSecureInstance.get(`/my-bids/${user?.email}`)
    setBids(data);
  }

  useEffect(() => {
    getData()
  }, [])

  const handleStatus = async (id, previousStatus, currentStatus) => {
    if (previousStatus === currentStatus) {
      return toast.error("Bid status already updated!")
    }
    const { data } = await axiosSecureInstance.patch(`/bid/${id}`, { status: currentStatus })

    if (data.modifiedCount > 0) {
      toast.success("Bid status updated!")
      getData()
    };
  }

  return (
    <div className='container mx-auto min-h-[calc(100vh-307px)] flex items-center py-20'>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">My Bids</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">{bids.length} Bids</span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>

                      <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Title</th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"> Category </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"> Price </th>

                      <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"> Status </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"> Deadline </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"> Action </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                    {
                      bids.map(bid => <tr key={bid._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <div>
                                <h2 className="font-medium text-gray-500 dark:text-gray-300">{bid.job_title}</h2>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            {
                              bid.category === "Web Development" && <p className="px-3 py-1 text-xs text-cyan-500 rounded-full dark:bg-gray-800 bg-cyan-100/60">{bid.category}</p>
                            }

                            {
                              bid.category === "Graphics Design" && <p className="px-3 py-1 text-xs text-purple-500 rounded-full dark:bg-gray-800 bg-purple-100/60">{bid.category}</p>
                            }

                            {
                              bid.category === "Digital Marketing" && <p className="px-3 py-1 text-xs text-lime-500 rounded-full dark:bg-gray-800 bg-lime-100/60">{bid.category}</p>
                            }
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">${bid.price}</td>

                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {
                            bid.status === "Pending" && <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                              <h2 className="text-sm font-normal text-emerald-500">{bid.status}</h2>
                            </div>
                          }

                          {
                            bid.status === "In Progress" && <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-sky-100/60 dark:bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>

                              <h2 className="text-sm font-normal text-sky-500">{bid.status}</h2>
                            </div>
                          }

                          {
                            bid.status === "Completed" && <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>

                              <h2 className="text-sm font-normal">{bid.status}</h2>
                            </div>
                          }

                          {
                            bid.status === "Rejected" && <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>

                              <h2 className="text-sm font-normal">{bid.status}</h2>
                            </div>
                          }
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">{new Date(bid.deadline).toLocaleDateString()}</td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">

                            {/* Order Completed Button */}
                            <button onClick={() => handleStatus(bid._id, bid.status, "Completed")} disabled={bid.status !== "In Progress"}
                              title='Completed'
                              className='text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none disabled:cursor-not-allowed'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-5 h-5'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75'
                                />
                              </svg>
                            </button>
                          </div>
                        </td>

                      </tr>)
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyBids;