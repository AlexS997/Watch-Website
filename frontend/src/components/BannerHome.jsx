import { useEffect, useRef } from 'react'
import { bannerHomeStyles } from '../assets/dummyStyles'
import video from '../assets/bannervideo.mp4'
import bl1 from '../assets/BL1.png'
import bm1 from '../assets/BM1.png'
import br1 from '../assets/BR1.png'
import Navbar from './Navbar'

const Banner = () => {

  const videoRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if(reduceMotion && videoRef.current){
      videoRef.current.pause()
      videoRef.current.removeAttribute("autoplay")
    }
  }, [])

  return (
    <div className={bannerHomeStyles.container}>
        <div className={bannerHomeStyles.navbarWrapper}>
            <Navbar />
        </div>

        <div className={bannerHomeStyles.videoContainer}>
          <video ref={videoRef} className={bannerHomeStyles.video} autoPlay muted loop playsInline preload='metadata' poster='/fallback.jpg' role='presentation'>
            <source src={video} type='video/mp4' />
          </video>
        </div>

        <div className={bannerHomeStyles.contentContainer}>
          <div className={bannerHomeStyles.h1Container}>
            <h1 style={bannerHomeStyles.playfairFont} className={bannerHomeStyles.h1Text}>
              <span className={bannerHomeStyles.h1SpanGray}>
                Love you more
              </span>
              
              <span className={bannerHomeStyles.h1SpanYellow}>
                with every second
              </span>
            </h1>

            <p className={bannerHomeStyles.subtext}>
              Explore a curated collection of handcrafted timepieces, where precision meets enduring elegance and quiet luxury.
            </p>
          </div>

          <div className={bannerHomeStyles.cardsContainer}>
            <div className={bannerHomeStyles.grid}>
              <div className={`${bannerHomeStyles.cardWrapper} ${bannerHomeStyles.leftCardTransform}`}>
                <div className={`${bannerHomeStyles.cardBase} ${bannerHomeStyles.cardPadding}`}>
                  <img src={bl1} alt="" className={`${bannerHomeStyles.cardImage} ${bannerHomeStyles.leftCardImage}`} loading='lazy'/>
                </div>
                
                <p className={`${bannerHomeStyles.cardLabel} ${bannerHomeStyles.cardLabelGray}`}>
                  Classic Heritage
                </p>
              </div>

              <div className={`${bannerHomeStyles.cardWrapper} ${bannerHomeStyles.middleCardTransform}`}>
                <div className={`${bannerHomeStyles.cardBase} ${bannerHomeStyles.cardPadding}`}>
                  <img src={bm1} alt="" className={`${bannerHomeStyles.cardImage} ${bannerHomeStyles.middleCardImage}`} loading='lazy'/>
                </div>
                
                <p className={`${bannerHomeStyles.cardLabel} ${bannerHomeStyles.cardLabelYellow}`}>
                  Limited Edition
                </p>
              </div>

              <div className={`${bannerHomeStyles.cardWrapper} ${bannerHomeStyles.rightCardTransform}`}>
                <div className={`${bannerHomeStyles.cardBase} ${bannerHomeStyles.cardPadding}`}>
                  <img src={br1} alt="" className={`${bannerHomeStyles.cardImage} ${bannerHomeStyles.rightCardImage}`} loading='lazy'/>
                </div>
                
                <p className={`${bannerHomeStyles.cardLabel} ${bannerHomeStyles.cardLabelGray}`}>
                  Modern Precision
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Banner