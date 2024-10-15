import React, { useEffect } from 'react';
import Header from './components/Header';
import Main from './components/main/Main';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CommunityRoutes from './routes/community';
import InformationRoutes from './routes/information';
import AiJudgementRoutes from './routes/aiJudgement';
import AuthRoutes from './routes/auth';
import useAuthStore from './store/useAuthStore';
import ContactUs from './components/main/ContactUs';
import PrivacyPolicy from './components/main/PrivacyPolicy';
import TermsAndConditions from './components/main/TermsAndConditions';
import ScrollToTop from './components/ScrollToTop';
import "./styles/main/main.css"

function ProtectedRoute({ component: Component }) {
  const isLogin = useAuthStore((state) => state.isLogin());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      window.alert('로그인이 필요한 서비스입니다.');
      navigate('/auth/login');
    }
  }, [isLogin, navigate]);

  return isLogin ? <Component /> : null;
}

function App() {
  return (
    <Router>
        <Header />
      <div className="App font-roboto min-h-[100vh] relative w-[100%]" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/community/*" element={<ProtectedRoute component={CommunityRoutes} />} />
          <Route path="/information/*" element={<ProtectedRoute component={InformationRoutes} />} />
          <Route path="/AI-judgement/*" element={<ProtectedRoute component={AiJudgementRoutes} />} />
          <Route path="/contact-us/*" element={<ContactUs />} />
          <Route path="/privacy-policy/*" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions/*" element={<TermsAndConditions />}/>
        </Routes>
        <ScrollToTop />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
