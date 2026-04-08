import Banner from "../components/BannerHome"
import CategoriesHome from "../components/CategoriesHome"
import ComingSoonWatchPage from "../components/ComingSoonWatchPage"
import FashionPage from "../components/FashionPage"
import Footer from "../components/Footer"
import Testimonials from "../components/Testimonials"

const Home = () => {
  return (
    <div>
        <Banner />
        <CategoriesHome />
        <ComingSoonWatchPage />
        <FashionPage />
        <Testimonials />
        <Footer />
    </div>
  )
}

export default Home