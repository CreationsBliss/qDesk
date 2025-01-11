import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const JobDetail = () => {

  const [startDate, setStartDate] = useState(new Date());
  const job = useLoaderData()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosSecureInstance = useAxiosSecure()

  const { _id, category, deadline, description, job_title, max_price, min_price, buyer } = job;

  const handlePlaceBid = async (e) => {
    e.preventDefault()

    if (user?.email === buyer?.email) {
      return toast.error("Action not permitted!")
    }

    const form = e.target;
    const price = parseFloat(form.price.value);
    if (price < parseFloat(min_price)) {
      return toast.error("Price must be equal or more than min price!")
    }
    const email = form.email.value;
    const comment = form.comment.value;
    const deadline = startDate;

    const jobId = _id;
    const status = "Pending";
    const buyer_email = buyer?.email;

    const bidData = {
      jobId,
      price,
      email,
      deadline,
      comment,
      job_title,
      category,
      status,
      buyer_email
    }

    try {
      const { data } = await axiosSecureInstance.post(`/bids`, bidData)
      if (data.insertedId) {
        toast.success("Order placed successfully!")
        navigate("/my-bids")
      };
    }
    catch (err) {
      toast.error(err.response.data.message);
      e.target.reset()
    }
  }

  return (
    <div className='container mx-auto min-h-[calc(100vh-307px)] flex items-center justify-center'>
      <div className='grid gap-5 sm:grid-cols-1 md:grid-cols-2'>

        <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-600 dark:text-gray-400">Deadline: {new Date(deadline).toLocaleDateString()} </span>
            <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" role="button"> {category} </a>
          </div>

          <div className="mt-2 text-left">
            <h1 className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200" role="link"> {job_title} </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300"> {description} </p>
          </div>

          <div className='mt-4'>
            <h3 className='font-semibold text-gray-700 dark:text-white'>Buyer Details:</h3>
            <div className='flex justify-between'>
              <div>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>Name: {buyer?.name}</p>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>Email: {buyer?.email}</p>
              </div>
              <div>
                <img src={buyer?.photo} alt="buyer_photo" className='w-16 h-16 rounded-full' />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p href="#" className="text-blue-600 dark:text-blue-400" role="link">Range: ${min_price} - ${max_price}</p>
          </div>
        </div>

        <div>
          <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Place A Bid</h2>

            <form onSubmit={handlePlaceBid}>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="price">Price</label>
                  <input id="price" type="text" name="price" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required />
                </div>

                <div>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                  <input id="emailAddress" type="email" name="email" defaultValue={user?.email} disabled className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>

                <div>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="comment">Comment</label>
                  <input id="comment" type="text" name="comment" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>

                <div>
                  <label className="text-gray-700 dark:text-gray-200 block" htmlFor="deadline">Deadline</label>
                  <div className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'>
                    <DatePicker className='block w-full text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 focus:outline-none' selected={startDate} onChange={(date) => setStartDate(date)} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Place Bid</button>
              </div>
            </form>
          </section>
        </div>

      </div>
    </div>
  );
};

export default JobDetail;