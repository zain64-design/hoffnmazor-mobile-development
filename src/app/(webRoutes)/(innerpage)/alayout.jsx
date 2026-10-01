import React from 'react';
import Header4 from '../../_components/Header/Header4';
import Footer from '../../_components/Footer/Footer';

const DefalultLayout = ({ children }) => {
    return (
        <div className='main-page-area'>
           <Header4></Header4>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default DefalultLayout;