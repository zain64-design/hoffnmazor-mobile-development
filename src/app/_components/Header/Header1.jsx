"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function Header1({ variant }) {
  const [isSticky, setIsSticky] = useState();
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos) {
        setIsSticky('cs-gescout_sticky'); // Scrolling down
      } else if (currentScrollPos !== 0) {
        setIsSticky('cs-gescout_show cs-gescout_sticky'); // Scrolling up
      } else {
        setIsSticky();
      }
      setPrevScrollPos(currentScrollPos); // Update previous scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup the event listener
    };
  }, [prevScrollPos]);

  return (
    <div>
      <header
        className={`cs_site_header header_style_2 cs_style_1 ${variant ? variant : ''
          } cs_sticky_header cs_site_header_full_width ${isSticky ? isSticky : ''}`}
      >
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              <div className="cs_main_header_left">
                <Link className="cs_site_branding" href="/">
                  <Image src="/assets/images/logo/main-logo.webp" className='img-fluid' alt="img" width={240} height={65} />
                </Link>
              </div>
              <div className="cs_main_header_right">
                <div className="header-btn d-flex align-items-center gap-3">
                  <Link href="void:;" className="theme-btn">
                    <span>
                      Book Consultation
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </Link>

                  <Link href="void:;" className="theme-btn">
                    <span>
                      Get Started
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>

  );
}
