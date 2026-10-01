import BlogDetails from '@/app/_components/BlogDetails/BlogDetails';
import BreadCumb from '@/app/_components/Common/BreadCumb';
import React from 'react';

const page = () => {
  return (
    <div>
         <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Blog Details"
            ></BreadCumb>
            <BlogDetails></BlogDetails>        
    </div>
  );
};

export default page;