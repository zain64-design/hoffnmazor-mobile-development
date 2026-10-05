import React from 'react';
import HeroBanner3 from '@/app/_components/HeroBanner/HeroBanner3';
import Feature4 from '@/app/_components/Feature/Feature4';
import Feature5 from '@/app/_components/Feature/Feature5';
import Feature6 from '@/app/_components/Feature/Feature6';
import HowWork3 from '@/app/_components/HowWork/HowWork3';
import About3 from '@/app/_components/About/About3';
import Testimonial from '@/app/_components/Testimonial/Testimonial';
import Cta1 from '@/app/_components/Cta/Cta1';
import ContactInfo from '@/app/_components/ContactInfo/ContactInfo';
import Faq1 from '@/app/_components/Faq/Faq1';
import Brand3 from '@/app/_components/Brand/Brand3';
import Choose3 from '@/app/_components/Choose/Choose3';

const page = () => {
    return (
        <div>
            <HeroBanner3
                bgimg="/assets/images/hero/hero-bg.jpg"
                subtitle="Web Development Experts"
                title="We Build Fast, Modern Websites That <span>Grow Your Business</span>"
                content="Hoffnmazor designs and develops high-performance websites and web applications for startups and growing businesses. From the first idea to the final launch, our team handles everything."
                btnname="Talk To An Expert"
                btnurl="/"
                btnname2="Get A Quote"
                btnurl2="/"
                img1="/assets/images/hero/01.png"
                img2="/assets/images/hero/mobile.png"
            />
                        <About3
                img1="/assets/images/what-do.png"
                subtitle="What We Do"
                title="One Team For All Your Web Development Needs"
                content="From simple business websites to complex web platforms, we combine design, development and optimization so you get one reliable team instead of many."
                boxtitle1="Experienced Developers"
                boxcontent1="Skilled developers who write clean, scalable code and follow modern best practices."
                boxtitle2="Design That Converts"
                boxcontent2="Layouts built around your customers, with clear calls to action that turn visitors into leads."
            />
                        <Brand3/>
                        <Choose3/>
            <Feature4
                img="/assets/images/about/01.png"
                subtitle="Why Choose Us"
                title="We Deliver Quality You Can Measure"
                content="Every project goes through planning, design, testing and optimization, so your website is ready for real traffic from day one."
                FeatureList={[
                    "<b>Mobile-First Design :</b> <span>Looks and works great on every screen size.</span>",
                    "<b>Secure & Reliable :</b> <span> Built with security best practices and tested before launch.</span>",
                    "<b>Fast Support :</b> <span> Quick replies and help whenever you need it.</span>",
                    "<b>Built To Scale :</b> <span>  Easy to grow as your business grows.</span>",
                ]} 
                btnname="Learn More"
                btnurl="/about"
            />  
            <Feature5/>
            <Feature6/>
            <HowWork3/>
                        <Testimonial />
            <Faq1 />
            <Cta1
                subtitle="Let's Talk"
                title="Ready To Launch Your App? Let's Build It Together!"
                content="Book a free consultation with our experts and get a clear roadmap, timeline and estimate for your app idea."
                btnurl1=""
                btnurl2=""
                img="/assets/images/cta/ctaThumb1_1.png"
            />
            <ContactInfo />                            
        </div>
    );
};

export default page;