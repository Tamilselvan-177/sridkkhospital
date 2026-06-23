import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import { Footer } from './components/layout/Footer'
import { FloatingWhatsAppButton } from './components/layout/FloatingWhatsAppButton'
import { Navbar } from './components/layout/Navbar'
import { StickyMobileCTA } from './components/layout/StickyMobileCTA'
import { ChatBot } from './components/layout/ChatBot'
import { ReviewPopup } from './components/layout/ReviewPopup'
import { DiscountStickyBanner } from './components/layout/DiscountStickyBanner'
import { UrgencyBanner } from './components/sections/UrgencyBanner'
import { SocialProofTicker } from './components/sections/SocialProofTicker'
import { PageTransition } from './components/motion/PageTransition'
import { siteData } from './data/siteData'
import { BlogsPage } from './pages/BlogsPage'
import { CareersPage } from './pages/CareersPage'
import { ContactPage } from './pages/ContactPage'
import { DoctorsPage } from './pages/DoctorsPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SpecialtiesPage } from './pages/SpecialtiesPage'
import { TreatmentDetailPage } from './pages/TreatmentDetailPage'
import { TreatmentsPage } from './pages/TreatmentsPage'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <CustomCursor />
      <UrgencyBanner />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/treatments"
            element={
              <PageTransition>
                <TreatmentsPage />
              </PageTransition>
            }
          />
          <Route
            path="/treatments/:slug"
            element={
              <PageTransition>
                <TreatmentDetailPage />
              </PageTransition>
            }
          />
          <Route
            path="/specialties"
            element={
              <PageTransition>
                <SpecialtiesPage />
              </PageTransition>
            }
          />
          <Route
            path="/doctors"
            element={
              <PageTransition>
                <DoctorsPage />
              </PageTransition>
            }
          />
          <Route
            path="/careers"
            element={
              <PageTransition>
                <CareersPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
          <Route
            path="/blogs"
            element={
              <PageTransition>
                <BlogsPage />
              </PageTransition>
            }
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFoundPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
      <SocialProofTicker />
      <Footer />
      <FloatingWhatsAppButton whatsapp={siteData.contact.whatsapp} />
      <StickyMobileCTA phone={siteData.contact.phone} whatsapp={siteData.contact.whatsapp} />
      <ChatBot />
      <ReviewPopup />
      <DiscountStickyBanner />
    </div>
  )
}

export default App
