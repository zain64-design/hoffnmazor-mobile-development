import BlogLeftSidebar from '@/app/_components/Blog/BlogLeftSidebar';
import BreadCumb from '@/app/_components/Common/BreadCumb';
import React from 'react';

const page = () => {
  return (
    <div>
        <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Blog Left Sidebar"
            ></BreadCumb>   
            <BlogLeftSidebar></BlogLeftSidebar>       
    </div>
  );
};

export default page;