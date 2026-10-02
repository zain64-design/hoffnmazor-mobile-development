import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Thank You',
    robots: {
        index: false,
        follow: false,
    },
};

const page = () => {
    return (
        <section className="thank-you-page bg-theme3 d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8 col-md-10 text-center">
                        <Link href="/" className="thank-you-page-logo">
                            <Image src="/assets/images/logo/main-logo.webp" className="img-fluid" alt="logo" width={240} height={65} priority />
                        </Link>
                        <h1 className="thank-you-page-title">Thank You!</h1>
                        <div className="thank-you-page-icon">
                            <i className="bi bi-check-lg"></i>
                        </div>
                        <p className="thank-you-page-text">
                            We have received your message and our team will contact you shortly.
                        </p>
                        <Link href="/" className="theme-btn">
                            <span>
                                Back To Home
                                <i className="bi bi-arrow-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;
