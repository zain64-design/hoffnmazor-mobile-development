import Image from "next/image";

const Feature5 = () => {
    return (
        <section className="feature-section fix section-padding pt-0">
        <div className="container">
            <div className="row g-4">
                <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                    <div className="feature-box-items">
                        <div className="icon">
                        <Image src="/assets/images/icon/01.svg" alt="img" width={40} height={40}   />
                        </div>
                        <div className="content">
                            <h3>Plan</h3>
                            <p>We understand your goals, audience and competitors before we write any code.</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                    <div className="feature-box-items">
                        <div className="icon">
                        <Image src="/assets/images/icon/02.svg" alt="img" width={40} height={40}   />
                        </div>
                        <div className="content">
                            <h3>Build</h3>
                            <p>We design and develop your site with clean, maintainable code.</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                    <div className="feature-box-items">
                        <div className="icon">
                        <Image src="/assets/images/icon/03.svg" alt="img" width={40} height={40}   />
                        </div>
                        <div className="content">
                            <h3>Grow</h3>
                            <p>We optimize speed and SEO and support you after launch.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Feature5;