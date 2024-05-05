import React, { useEffect, useRef } from 'react';

// Updated to accept additional props
const TimelineCard = ({
  timeline_style,
  slideDirection = '100%',
  imgSrc,
  dir,
  title,
  companyDesc,
  description,
  listItems = []
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running'; // Start the animation
        }
      });
    }, { threshold: 0.2 }); // Triggers when 50% of the element is visible

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [containerRef]);

  if (window.innerWidth > 700) {
    return (
        <div ref={containerRef} className={`${timeline_style["container"]} ${timeline_style[dir]}`} style={{ '--slide-direction': slideDirection }}>
          <div className={timeline_style["content"]} style={{ paddingBottom: "50px" }}>
            <img src={imgSrc} alt="Avatar" style={{ boxSizing: "border-box", display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "9px", width: "48%" }} />
            <h2 style={{ marginTop: "20px", fontWeight: 500, fontFamily: ["Segoe UI", "sans-serif", "Avenir"]}}>{title}</h2>
            <p>{description}</p>
            <p style={{ color: "gray" }}>
              {companyDesc}
              <ul>
                {listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </p>
          </div>
        </div>
      );
  }
  else {
    return (
        <div className={`${timeline_style["container"]} ${timeline_style[dir]}`}>
          <div className={timeline_style["content"]} style={{ paddingBottom: "50px" }}>
            <img src={imgSrc} alt="Avatar" style={{ boxSizing: "border-box", display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "9px", width: "48%" }} />
            <h2 style={{ marginTop: "20px", fontWeight: 500, fontFamily: ["Segoe UI", "sans-serif", "Avenir"]}}>{title}</h2>
            <p>{description}</p>
            <p style={{ color: "gray" }}>
              {companyDesc}
              <ul>
                {listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </p>
          </div>
        </div>
      );
  }
  
};

export default TimelineCard;