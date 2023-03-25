import React, { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(anchor => {
      anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const href = this.getAttribute("href");
        const target = document.querySelector(href);
        target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }, []);

  return null;
};

export default SmoothScroll;