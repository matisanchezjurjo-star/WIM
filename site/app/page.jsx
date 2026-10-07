import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import ProofStrip from '../components/ProofStrip.jsx';
import Catalog from '../components/Catalog.jsx';
import FeaturedProduct from '../components/FeaturedProduct.jsx';
import Applications from '../components/Applications.jsx';
import About from '../components/About.jsx';
import Wholesale from '../components/Wholesale.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <ProofStrip />
      <Catalog />
      <FeaturedProduct />
      <Applications />
      <About />
      <Wholesale />
      <Contact />
      <Footer />
    </>
  );
}
