import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSkeleton from './components/LoadingSkeleton';
import ProtectedRoute from './components/ProtectedRoute';

const Discover = lazy(() => import('./pages/Discover'));
const IndustryHotspots = lazy(() => import('./pages/IndustryHotspots'));
const CreativeApps = lazy(() => import('./pages/CreativeApps'));
const MyCreations = lazy(() => import('./pages/MyCreations'));
const CreativeDetails = lazy(() => import('./pages/CreativeDetails'));
const MarketingAssistant = lazy(() => import('./pages/MarketingAssistant'));
const ContentTopics = lazy(() => import('./pages/ContentTopics'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="app-shell min-h-screen flex justify-center font-display text-white overflow-hidden">
          <div className="w-full max-w-[430px] h-[100dvh] relative overflow-hidden app-device flex flex-col rounded-[28px]">
            <ErrorBoundary>
              <Suspense fallback={<main className="px-6 pt-24"><LoadingSkeleton lines={8} /></main>}>
                <Routes>
                  <Route path="/" element={<Discover />} />
                  <Route path="/hotspots" element={<IndustryHotspots />} />
                  <Route path="/apps" element={<CreativeApps />} />
                  <Route path="/details/:slug" element={<CreativeDetails />} />
                  <Route path="/topics/:creativeId" element={<ContentTopics />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/creations" element={<MyCreations />} />
                    <Route path="/marketing" element={<MarketingAssistant />} />
                  </Route>
                </Routes>
              </Suspense>
            </ErrorBoundary>
            <BottomNav />
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
