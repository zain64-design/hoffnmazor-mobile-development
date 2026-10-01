import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Page Not Found',
    robots: {
        index: false,
        follow: false,
    },
};

const NotFound = () => {
    return (
        <section className="error-page bg-theme3 d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8 col-md-10 text-center">
                        <Link href="/" className="error-page-logo d-inline-block">
                            <Image src="/assets/images/logo/main-logo.webp" className="img-fluid" alt="logo" width={240} height={65} priority />
                        </Link>
                        <div className="error-page-code">404</div>
                        <h1 className="error-page-title">Page Not Found</h1>
                        <p className="error-page-text">
                            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
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

export default NotFound;
