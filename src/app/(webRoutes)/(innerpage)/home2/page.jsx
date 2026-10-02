import React from 'react';
import HeroBanner2 from '../../../_components/HeroBanner/HeroBanner2';
import About2 from '../../../_components/About/About2';
import Feature3 from '../../../_components/Feature/Feature3';
import HowWork2 from '../../../_components/HowWork/HowWork2';
import Choose2 from '../../../_components/Choose/Choose2';
import Choose3 from '../../../_components/Choose/Choose3';
import Pricing2 from '../../../_components/Pricing/Pricing2';
import Testimonial2 from '../../../_components/Testimonial/Testimonial2';
import Brand2 from '../../../_components/Brand/Brand2';
import Blog1 from '../../../_components/Blog/Blog1';

const page = () => {
    return (
        <div>
             <HeroBanner2
                subtitle="<span>News!</span>Find Your Solution"
                title="Effortless Resolutions Infinite <br>Opportunities."
                btnname="Get Started Now"
                btnurl="/contact"
                btnname2="Learn More"
                btnurl2="/about"                
                img1="/assets/images/intro/introThumb2_1.png"
                img2="/assets/images/intro/introThumb2_2.png"
                img3="/assets/images/intro/introThumb2_3.png"
            ></HeroBanner2>
            <About2
                subtitle="About Us"
                title="strong and simple to use SaaS platform for builders"
                content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use"
                boximg1="/assets/images/icon/wcuIcon2_1.svg"
                boxtitle1="Easy Collaboration"
                boxcontent1="There are many variations of passages of Lorem Ipsum available, but the majority have"
                boximg2="/assets/images/icon/wcuIcon2_2.svg"
                boxtitle2="Innovative Solutions"
                boxcontent2="There are many variations of passages of Lorem Ipsum available, but the majority have"
                img1="/assets/images/about/aboutThumb2_1.png"
                img2="/assets/images/about/aboutThumb2_2.png"
            ></About2> 
            <Feature3></Feature3> 
            <HowWork2></HowWork2>     
            <Choose2
               img1="/assets/images/wcu/wcuThumb2_1.png" 
               img2="/assets/images/wcu/wcuThumb2_2.png" 
               img3="/assets/images/wcu/wcuThumb2_3.png" 
               subtitle="Customizations & Analysis" 
               title="Manage your Team's Easily Communication." 
               content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even" 
               boximg1="/assets/images/icon/wcuIcon2_1.svg" 
               boxtitle1="Easy Collaboration" 
               boxcontent1="There are many variations of passages of Lorem Ipsum available, but the majority have" 
               boximg2="/assets/images/icon/wcuIcon2_2.svg" 
               boxtitle2="Innovative Solutions" 
               boxcontent2="There are many variations of passages of Lorem Ipsum available, but the majority have" 
            ></Choose2> 
            <Choose3></Choose3>  
            <Pricing2></Pricing2> 
            <Testimonial2></Testimonial2>
            <Brand2></Brand2>
            <Blog1></Blog1>                                   
        </div>
    );
};

export default page;