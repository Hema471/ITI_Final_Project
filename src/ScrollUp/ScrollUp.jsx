// ScrollUpButton.js
import React, { useState, useEffect } from "react";
import "./ScrollUp.css";

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="arrow-up">
      <div
        className={`scroll-up-button ${isVisible ? "visible" : "hidden"}`}
        onClick={scrollToTop}
      >
        <button>
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
};

export default ScrollUpButton;
