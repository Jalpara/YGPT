
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NewToYGPT from './pages/NewToYGPT';
import About from './pages/About';
import Founder from './pages/Founder';
import MeetMyMaitreya from './pages/MeetMyMaitreya';
import MMMEdition from './pages/MMMEdition';
import Clubs from './pages/Clubs';
import ClubDetails from './pages/ClubDetails';
import LMS from './pages/LMS';
import TransformPlayer from './pages/TransformPlayer';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import BrandGuidelines from './pages/BrandGuidelines';
import FanArtPage from './pages/FanArt';
import ImpactPage from './pages/Impact';
import { ShareSomeLove, YouthDevelopment, EarthEmbrace } from './pages/Verticals';
import { PrivacyPolicy, TermsOfService, CookiePolicy } from './pages/Legal';
import NotificationManager from './components/NotificationManager';

// Scroll to top wrapper
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const Layout: React.FC = () => {
    const location = useLocation();
    const isPlayer = location.pathname.includes('/transform/watch');

    return (
        <div className="flex flex-col min-h-screen font-sans text-gray-800">
            {!isPlayer && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<NewToYGPT />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/founder" element={<Founder />} />
                    <Route path="/meet-my-maitreya" element={<MeetMyMaitreya />} />
                    <Route path="/meet-my-maitreya/:year" element={<MMMEdition />} />
                    <Route path="/clubs" element={<Clubs />} />
                    <Route path="/clubs/:id" element={<ClubDetails />} />
                    <Route path="/transform" element={<LMS />} />
                    <Route path="/transform/watch/:categoryId" element={<TransformPlayer />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/impact" element={<ImpactPage />} />
                    
                    {/* Unified Get Involved / Contact Pages */}
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/get-involved" element={<Contact />} />
                    <Route path="/join" element={<Contact />} />

                    <Route path="/brand" element={<BrandGuidelines />} />
                    <Route path="/fan-art" element={<FanArtPage />} />
                    <Route path="/sitemap" element={<Sitemap />} />

                    {/* Verticals */}
                    <Route path="/share-some-love" element={<ShareSomeLove />} />
                    <Route path="/youth-development" element={<YouthDevelopment />} />
                    <Route path="/earth-embrace" element={<EarthEmbrace />} />

                    {/* Legal */}
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/cookies" element={<CookiePolicy />} />
                </Routes>
            </main>
            <NotificationManager />
            {!isPlayer && <Footer />}
        </div>
    );
}

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
};

export default App;
