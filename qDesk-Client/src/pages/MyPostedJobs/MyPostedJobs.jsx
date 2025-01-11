import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const myPostedJobs = () => {

  const axiosSecureInstance = useAxiosSecure()
  const { user } = useAuth()
  const [jobs, setJobs] = useState([])

  const getData = async () => {
    const { data } = await axiosSecureInstance.get(`/jobs/${user?.email}`)
    setJobs(data);
  }

  useEffect(() => {
    getData()
  }, [user])

  // console.log(jobs);

  const handleDeleteJob = async (_id) => {
    try {
      const { data } = await axiosSecureInstance.delete(`/job/${_id}`)
      toast.success('Job Deleted Successfully!')
      getData()
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='container mx-auto min-h-[calc(100vh-307px)] flex items-center py-20'>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">My Posted Jobs</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">{jobs.length} Jobs</span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>

                      <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Title</th>

                      <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"> Description </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"> Category </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"> Price Range </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"> Deadline </th>

                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"> Action </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                    {
                      jobs.map(job => <tr key={job._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <div>
                                <h2 className="font-medium text-gray-500 dark:text-gray-300">{job.job_title}</h2>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <h2 className="text-sm font-normal text-gray-500 dark:text-gray-300" title={job.description}>{job.description.slice(0, 80)}</h2>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            {
                              job.category === "Web Development" && <p className="px-3 py-1 text-xs text-cyan-500 rounded-full dark:bg-gray-800 bg-cyan-100/60">{job.category}</p>
                            }

                            {
                              job.category === "Graphics Design" && <p className="px-3 py-1 text-xs text-purple-500 rounded-full dark:bg-gray-800 bg-purple-100/60">{job.category}</p>
                            }

                            {
                              job.category === "Digital Marketing" && <p className="px-3 py-1 text-xs text-lime-500 rounded-full dark:bg-gray-800 bg-lime-100/60">{job.category}</p>
                            }
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">${job.min_price} - {job.max_price}</td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">{new Date(job.deadline).toLocaleDateString()}</td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button onClick={() => handleDeleteJob(job._id)} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </button>

                            <Link to={`/update-job/${job._id}`} className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </Link>
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

export default myPostedJobs;