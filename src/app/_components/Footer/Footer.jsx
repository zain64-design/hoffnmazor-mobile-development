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
                    <div className="footer-wrapper">
                        <Link href="/" className="footer-logo">
                            <Image src="/assets/images/logo/main-logo.webp" className="img-fluid" alt="Hoffnmazor" width={240} height={65} />
                        </Link>
                        <p className="footer-copyright">
                            Copyright © Hoffnmazor. All rights reserved.
                        </p>
                        <ul className="footer-links">
                            <li><a href="https://www.hoffnmazor.com/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-capitalize">terms & conditions</a></li>
                            <li><a href="https://www.hoffnmazor.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-capitalize">privacy policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
