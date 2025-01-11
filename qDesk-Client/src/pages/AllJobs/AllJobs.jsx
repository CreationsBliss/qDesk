import { useEffect, useState } from "react"
import useAxiosPublic from "../../hooks/useAxiosPublic"
import JobCard from "../../components/JobCard/JobCard"


const AllJobs = () => {

  const axiosPublicInstance = useAxiosPublic()
  const [jobs, setJobs] = useState([])
  const [jobCount, setJobCount] = useState(0)
  const [jobPerPage, setJobPerPage] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState("")
  const [searchText, setSearchText] = useState("")

  // get total job for showing all jobs
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosPublicInstance.get(`/jobs-per-page?page=${currentPage}&size=${jobPerPage}&filter=${categoryFilter}&sort=${sort}&search=${search}`)

      setJobs(data);
    }
    getData()
  }, [currentPage, jobPerPage, categoryFilter, sort, search])

  // get total job count for pagination
  useEffect(() => {
    const getJobsCount = async () => {
      const totalJob = await axiosPublicInstance.get(`/job-count?filter=${categoryFilter}&search=${search}`)

      setJobCount(totalJob.data.count);
    }
    getJobsCount()
  }, [categoryFilter, search])

  const totalPage = Math.ceil(jobCount / jobPerPage);
  const pages = [...Array(totalPage).keys()].map(page => page + 1)

  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  }

  const handleNext = () => {
    const newCurrentPage = currentPage + 1;
    setCurrentPage(newCurrentPage)
  }

  const handlePrevious = () => {
    const newCurrentPage = currentPage - 1;
    setCurrentPage(newCurrentPage)
  }

  const handleReset = () => {
    setCategoryFilter("")
    setSort("")
    setSearch("")
    searchText("")
  }

  const handleSearch = e => {
    e.preventDefault()
    setSearch(searchText);
    // e.target.reset()
  }

  return (
    <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
      <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
          <div>
            <select onChange={(e) => {
              setCategoryFilter(e.target.value)
              setCurrentPage(1)
            }} value={categoryFilter}
              name='category'
              id='category'
              className='border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-white text-gray-600 dark:text-gray-300 dark:bg-gray-900'
            >
              <option value=''>Filter By Category</option>
              <option value='Web Development'>Web Development</option>
              <option value='Graphics Design'>Graphics Design</option>
              <option value='Digital Marketing'>Digital Marketing</option>
            </select>
          </div>

          <form onSubmit={handleSearch}>
            <div className='flex p-1 overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input onChange={(e) => setSearchText(e.target.value)} value={searchText}
                className='px-6 py-2 text-gray-600 dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-300 bg-white dark:bg-gray-900 outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />

              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-600 dark:text-gray-300 uppercase transition-colors duration-300 transform dark:bg-gray-700 bg-gray-200 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>

          <div>
            <select onChange={(e) => setSort(e.target.value)} value={sort}
              name='sort'
              id='sort'
              className='border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-white text-gray-600 dark:text-gray-300 dark:bg-gray-900'
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>

          <button onClick={handleReset} className='btn border border-gray-200 dark:border-gray-700 py-[26px] px-[15] leading-[0] rounded-lg bg-white text-gray-600 dark:text-gray-300 dark:bg-gray-900'>Reset</button>
        </div>

        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>

      <div className='flex justify-center mt-12'>
        {/* Previous Button */}
        <button onClick={handlePrevious} disabled={currentPage === pages[0]} className='px-4 py-2 mx-1 text-gray-700 dark:text-gray-300 disabled:text-gray-300 capitalize bg-gray-200 dark:bg-gray-700 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:hover:text-gray-300 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white'>
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>

        {pages.map(btnNum => (
          <button
            key={btnNum} onClick={() => handleCurrentPage(btnNum)}
            className={`hidden px-4 py-2 mx-1 transition-colors duration-300 dark:text-gray-300 text-gray-700 transform rounded-md sm:inline hover:bg-blue-500 hover:text-white ${currentPage === btnNum && "bg-blue-500 dark:bg-blue-500"}`}
          >
            {btnNum}
          </button>
        ))}

        {/* Next Button */}
        <button onClick={handleNext} disabled={currentPage === pages.length} className='px-4 py-2 mx-1 text-gray-700 dark:text-gray-300 disabled:text-gray-300 capitalize bg-gray-200 dark:bg-gray-700 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:hover:text-gray-300 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white'>
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

export default AllJobs