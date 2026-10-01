import React from 'react';
import Header1 from '../_components/Header/Header1';
import Footer from '../_components/Footer/Footer';

const DefalultLayout = ({ children }) => {
    return (
        <div className='main-page-area'>
            <Header1/>
            {children}
            <Footer/>
        </div>
    );
};

export default DefalultLayout;