import { useState, useEffect } from "react";
import Generate from "./components/Generate";
import Header from "./components/Header";
// Social component removed as per user request

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode class to root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  function handleOnClick() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <div
        className={
          darkMode 
            ? "bg-gradient-dark text-dark-text min-h-screen smooth-fade-in" 
            : "bg-gradient-light text-light-text min-h-screen smooth-fade-in"
        }
      >
        <Header handleOnClick={handleOnClick} />
        <div className="pt-20">
          <Generate darkMode={darkMode} />
        </div>
        {/* Social component removed as per user request */}
      </div>
    </>
  );
}

export default App;