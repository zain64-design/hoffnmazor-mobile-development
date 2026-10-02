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

const page = () => {
    return (
        <div>
            <HeroBanner3
                bgimg="/assets/images/hero/hero-bg.jpg"
                subtitle="Streaming your Workflow"
                title="Organize, Track, and Complete Task <span>Efficiently</span>"
                content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or"
                btnname="Get Started Now"
                btnurl="/contact"
                btnname2="Download App"
                btnurl2="/about"
                img1="/assets/images/hero/01.png"
                img2="/assets/images/hero/mobile.png"
            />
                        <About3
                img1="/assets/images/what-do.png"
                subtitle="What We Do"
                title="We offer a one-stop shop for all IT solutions."
                content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form"
                boxtitle1="Highly Expert Team Members"
                boxcontent1="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form"
                boxtitle2="Highly Expert Team Members"
                boxcontent2="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form"
            />
                        <Brand3/>
            <Feature4
                img="/assets/images/about/01.png"
                subtitle="Our Features"
                title="We Provide the Best Quality"
                content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly"
                FeatureList={[
                    "<b>User -Friendly Interface :</b> <span> Easy to use, even for beginners</span>",
                    "<b>Secure & Reliable :</b> <span> Your data safe with us</span>",
                    "<b>24/7 Support :</b> <span> We’re here to help, anytime</span>",
                    "<b>Sealable for Teams :</b> <span>  Designed to scale with your needs</span>",
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