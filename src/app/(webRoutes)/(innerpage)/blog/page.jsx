import Blog2 from '@/app/_components/Blog/Blog2';
import BreadCumb from '@/app/_components/Common/BreadCumb';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/images/bg/breadcumgBg.png"
                Title="Blog Grid"
            ></BreadCumb>     
            <Blog2></Blog2>       
    </div>
  );
};

export default page;