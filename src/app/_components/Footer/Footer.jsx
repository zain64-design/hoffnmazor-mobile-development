import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer-section position-relative">
            <div className="footer-widgets-wrapper style1 fix">
                <div className="shape1"><img src="/assets/images/shape/footerShape1_1.png" alt="shape" /></div>
                <div className="shape2"><img src="/assets/images/shape/footerShape1_2.png" alt="shape" /></div>
                <div className="shape3"><img src="/assets/images/shape/footerShape1_3.png" alt="shape" /></div>
                <div className="container">
                    <div className="container">
                        <div className="footer-wrapper d-flex align-items-center justify-content-between">
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <Link href="/">
                                        <Image src="/assets/images/logo/main-logo.webp" className="img-fluid" alt="img" width={240} height={65} />
                                    </Link>
                                </div>
                            </div>
                            <ul className="d-flex align-items-center gap-3">
                                <p className="wow fadeInLeft" data-wow-delay=".3s">
                                    Copyright © Hoffnmazor All rights
                                </p>
                                <li><a href="void:;" className="text-capitalize">terms & conditions</a></li>
                                <li><a href="void:;" className="text-capitalize">privacy policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;