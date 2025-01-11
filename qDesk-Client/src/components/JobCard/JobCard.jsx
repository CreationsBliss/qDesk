import { Link } from "react-router-dom";

const JobCard = ({ job }) => {

  const { _id, category, deadline, description, job_title, max_price, min_price } = job;

  return (
    <Link to={`/job/${_id}`} className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">Deadline: {new Date(deadline).toLocaleDateString()} </span>
        <button className={`px-3 py-1 text-sm transition-colors duration-300 transform rounded cursor-pointer ${category === "Web Development" && "text-cyan-500 dark:bg-gray-700 bg-cyan-100/60"}  ${category === "Graphics Design" && "text-purple-500 dark:bg-gray-700 bg-purple-100/60"} ${category === "Digital Marketing" && "text-lime-500 dark:bg-gray-700 bg-lime-100/60"}`} role="button"> {category} </button>
      </div>

      <div className="mt-2 text-left">
        <h1 className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200" role="link"> {job_title} </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300"> {description.slice(0, 70)}... </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p href="#" className="text-blue-600 dark:text-blue-400" role="link">Range: ${min_price} - ${max_price}</p>
      </div>
    </Link>
  );
};

export default JobCard;