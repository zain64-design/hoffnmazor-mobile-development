import BreadCumb from '@/app/_components/Common/BreadCumb';
import TeamDetails from '@/app/_components/TeamDetails/TeamDetails';
import React from 'react';

const page = () => {
  return (
    <div>
          <BreadCumb
            bgimg="/assets/images/bg/breadcumgBg.png"
            Title="Team Details"
        ></BreadCumb> 
        <TeamDetails></TeamDetails>      
    </div>
  );
};

export default page;