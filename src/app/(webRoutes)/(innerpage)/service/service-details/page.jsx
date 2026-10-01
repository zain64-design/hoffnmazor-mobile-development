import BreadCumb from '@/app/_components/Common/BreadCumb';
import ServiceDetails from '@/app/_components/ServiceDetails/ServiceDetails';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Services Details"
            ></BreadCumb> 
            <ServiceDetails></ServiceDetails>        
    </div>
  );
};

export default page;