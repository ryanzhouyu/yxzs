import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Discover from './pages/Discover';
import IndustryHotspots from './pages/IndustryHotspots';
import CreativeApps from './pages/CreativeApps';
import MyCreations from './pages/MyCreations';
import CreativeDetails from './pages/CreativeDetails';
import MarketingAssistant from './pages/MarketingAssistant';
import ContentTopics from './pages/ContentTopics';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell min-h-screen flex justify-center font-display text-white overflow-hidden">
        <div className="w-full max-w-[430px] h-[100dvh] relative overflow-hidden app-device flex flex-col rounded-[28px]">
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/hotspots" element={<IndustryHotspots />} />
            <Route path="/apps" element={<CreativeApps />} />
            <Route path="/creations" element={<MyCreations />} />
            <Route path="/details" element={<CreativeDetails />} />
            <Route path="/marketing" element={<MarketingAssistant />} />
            <Route path="/topics" element={<ContentTopics />} />
          </Routes>
          <BottomNav />
        </div>
      </div>
    </BrowserRouter>
  );
}


