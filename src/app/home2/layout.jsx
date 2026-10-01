import React from 'react';
import Footer from '../_components/Footer/Footer';
import Header2 from '../_components/Header/Header2';

const layout = ({ children }) => {
    return (
        <div className='main-page-area2'>
            <Header2></Header2>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default layout;