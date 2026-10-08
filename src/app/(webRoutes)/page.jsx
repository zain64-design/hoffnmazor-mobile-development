import React from 'react';
import HeroBanner1 from '@/app/_components/HeroBanner/HeroBanner1';
import About1 from '@/app/_components/About/About1';
import HowWork from '@/app/_components/HowWork/HowWork';
import Choose1 from '@/app/_components/Choose/Choose1';
import Feature1 from '@/app/_components/Feature/Feature1';
import Faq1 from '@/app/_components/Faq/Faq1';
import Testimonial from '@/app/_components/Testimonial/Testimonial';
import ContactInfo from '@/app/_components/ContactInfo/ContactInfo';;
import Cta1 from '@/app/_components/Cta/Cta1';
import HeroForm from '@/app/_components/HeroForm/HeroForm';
import LeadModalHost from '@/app/_components/LeadModal/LeadModalHost';
import CalendlySection from '@/app/_components/Calendly/CalendlySection';
import CtaBand from '@/app/_components/CtaBand/CtaBand';

const page = () => {
    return (
        <div>
            <HeroBanner1
                subtitle="<span>New!</span>Get Your App Built"
                title="We Build Mobile Apps That Your Customers Love"
                content="Hoffnmazor designs and develops fast, secure and beautifully crafted iOS and Android apps for startups and growing businesses. From the first idea to the App Store launch, our team handles everything."
                btnname="Talk To An Expert"
                btnurl="/contact"
                btntwo="Get A Quote"
                btn2url="/about"
                cusimg="/assets/images/intro/introProfileThumb1_1.png"
                cusnumber="2,291"
                cuscontent="Happy Customers"
                rating="4.8/5"
                ratingcon="Rating"
                aside={<HeroForm />}
            />
            <About1
                img1="/assets/images/about/aboutThumb1_1.png"
                img2="/assets/images/about/aboutThumb1_2.png"
                subtitle="About Hoffnmazor"
                title="One Team For Your Entire App Journey"
                content="We combine strategy, design and engineering to turn your idea into a reliable mobile product. You get clear communication, transparent timelines and an app built to grow with your business."
                FeatureList={[
                    "Native and cross-platform development (iOS and Android)",
                    "Trusted by startups and businesses worldwide",
                    "Free consultation and project estimate",
                ]}
                btnname="Book Consultation"
                btnurl="/"
            />
            <CtaBand
                variant="band"
                title="Ready To See Your App In Your Customers' Hands?"
                text="Talk to our app experts for a free consultation, no obligation."
            />
            <HowWork />
            <div id="modal-trigger"></div>
            <CalendlySection />
            <CtaBand title="Have questions about building your app?" />
            <Choose1
                subtitle="Why Choose Us"
                title="Get Ahead With A High-Performance Mobile App"
                content="A well-built app keeps your customers engaged, builds trust in your brand and opens a new sales channel. We focus on speed, usability and security so your app performs from day one."
                FeatureList={[
                    "Friendly Design",
                    "Performance Optimized",
                ]}
                FeatureList2={[
                    "Cloud Storage",
                    "Strong Security",
                ]}
                btnname="Get A Quote"
                btnurl="/"
            />
            <Feature1 />
            <CtaBand title="Ready to turn your idea into an app? Our team is one message away." />
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
            <LeadModalHost />
        </div>
    );
};

export default page;