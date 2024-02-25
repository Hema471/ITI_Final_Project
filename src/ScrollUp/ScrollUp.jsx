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
    <div className={`scroll-up-button ${isVisible ? "visible" : "hidden"}`}>
      <button onClick={scrollToTop}>
        <p style={{ margin: "0px" }}>🢁</p>
      </button>
    </div>
  );
};

export default ScrollUpButton;
