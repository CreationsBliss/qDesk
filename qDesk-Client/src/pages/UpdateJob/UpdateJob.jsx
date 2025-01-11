import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateJob = () => {

  const { user } = useContext(AuthContext)
  const job = useLoaderData()
  const navigate = useNavigate()
  const axiosSecureInstance = useAxiosSecure()

  const { _id, category, deadline, description, job_title, max_price, min_price, buyer } = job;

  const [startDate, setStartDate] = useState(new Date(deadline) || new Date());

  const handleUpdateJob = async (e) => {
    e.preventDefault()

    const form = e.target;
    const job_title = form.job_title.value;
    const email = form.email.value;
    const deadline = startDate;
    const min_price = parseFloat(form.min_price.value);
    const max_price = parseFloat(form.max_price.value);
    const category = form.category.value;
    const description = form.description.value;

    const jobData = {
      job_title,
      category,
      description,
      min_price,
      max_price,
      deadline,
      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      }
    }

    try {
      const { data } = await axiosSecureInstance.put(`/job/${_id}`, jobData)
      toast.success('Job Data Updated Successfully!')
      navigate("/my-posted-jobs")
    }
    catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }

  return (
    <div className='container mx-auto min-h-[calc(100vh-307px)] flex items-center'>
      <section className="max-w-7xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Update A Job</h2>

        <form onSubmit={handleUpdateJob}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="job-title">Job Title</label>
              <input id="job-title" type="text" name="job_title" defaultValue={job_title} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
              <input id="emailAddress" type="email" name="email" defaultValue={user?.email} disabled className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200 block" htmlFor="deadline">Deadline</label>
              <div className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'>
                <DatePicker className='block w-full text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 focus:outline-none' selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="comment">Comment</label>
              <select name="category" defaultValue={category} className="select select-bordered block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>

            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="min-price">Minimum Price</label>
              <input id="min-price" type="number" name="min_price" defaultValue={min_price} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="max-price">Maximum Price</label>
              <input id="max-price" type="number" name="max_price" defaultValue={max_price} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

          </div>

          <div className="mt-4">
            <label className="text-gray-700 dark:text-gray-200" htmlFor="description">Description</label>
            <textarea id="description" type="text" name="description" defaultValue={description} style={{ height: '150px' }} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update Job</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UpdateJob