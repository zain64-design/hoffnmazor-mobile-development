import React from 'react';
import Header3 from '../_components/Header/Header3';
import Footer from '../_components/Footer/Footer';

const layout = ({ children }) => {
    return (
        <div className='main-page-area3'>
            <Header3></Header3>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default layout;