import { useLocation, useOutlet } from 'react-router-dom'; // Import useOutlet
import { AnimatePresence } from 'framer-motion';
import React from 'react'; // Make sure React is imported for cloneElement

export default function Layout() {
  const location = useLocation();
  const element = useOutlet(); // 1. Grab the active route element

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {/* 2. Clone the element and inject the key directly onto the page component */}
          {element && React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
      </main>
    </div>
  );
}