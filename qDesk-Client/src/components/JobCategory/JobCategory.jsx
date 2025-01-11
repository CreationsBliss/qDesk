import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from '../JobCard/JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const JobCategory = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/jobs`)
      setJobs(data);
    }
    getData()
  }, [])

  return (
    <div className="container mx-auto text-center py-20">
      <div className='max-w-lg mx-auto'>
        <h1 className="text-3xl font-semibold text-gray-700 dark:text-white lg:text-4xl">Browse Jobs By Categories</h1>
        <p className='text-gray-600 dark:text-gray-300 mt-2'> Three categories available for the time being. They are Web Development, Graphics Design and Digital Marketing. Browse them by clicking on the tabs below.
        </p>
      </div>
      <div className='pt-10'>
        <Tabs>
          <div className='max-w-md mx-auto text-gray-600 dark:text-gray-300'>
            <TabList>
              <Tab>Web Development</Tab>
              <Tab>Graphics Design</Tab>
              <Tab>Digital Marketing</Tab>
            </TabList>
          </div>

          <div className='mt-10'>
            <TabPanel>
              <div className='grid grid-cols-1 gap-5 mt-6 xl:mt-16 md:grid-cols-2 xl:grid-cols-3'>
                {
                  jobs.filter(singleJob => singleJob.category === "Web Development").map(job => <JobCard key={job._id} job={job}></JobCard>)
                }
              </div>
            </TabPanel>
            <TabPanel>
              <div className='grid grid-cols-1 gap-5 mt-6 xl:mt-16 md:grid-cols-2 xl:grid-cols-3'>
                {
                  jobs.filter(singleJob => singleJob.category === "Graphics Design").map(job => <JobCard key={job._id} job={job}></JobCard>)
                }
              </div>
            </TabPanel>
            <TabPanel>
              <div className='grid grid-cols-1 gap-5 mt-6 xl:mt-16 md:grid-cols-2 xl:grid-cols-3'>
                {
                  jobs.filter(singleJob => singleJob.category === "Digital Marketing").map(job => <JobCard key={job._id} job={job}></JobCard>)
                }
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default JobCategory;