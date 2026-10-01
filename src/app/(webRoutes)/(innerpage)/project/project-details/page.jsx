import BreadCumb from '@/app/_components/Common/BreadCumb';
import ProjectDetails from '@/app/_components/ProjectDetails/ProjectDetails';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Project Details"
            ></BreadCumb>    
            <ProjectDetails></ProjectDetails>       
    </div>
  );
};

export default page;