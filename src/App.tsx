import './App.css'
import Home from '@/pages/Home'
// import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import PageNotFound from '@/lib/PageNotFound';
import ScrollToTop from '@/components/ScrollToTop';
import Layout from '@/components/Layout';
import { Analytics } from "@vercel/analytics/next"

const AuthenticatedApp = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};

function App() {

  return (
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
           <Analytics />
        {/* <Toaster /> */}
      </QueryClientProvider>
  )
}

export default App
