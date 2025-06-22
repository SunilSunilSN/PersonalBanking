import React, { useState } from 'react';

export function Slider({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-2xl bg-white/50 px-3 py-1 rounded-full">‹</button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-2xl bg-white/50 px-3 py-1 rounded-full">›</button>
      
      {slides.map((slide, index) => (
        <div
          className={`transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'} w-full`}
          key={index}
        >
          {index === current && (
            <img src={slide.image} alt={`Slide ${index}`} className="w-full h-auto rounded-xl" />
          )}
        </div>
      ))}
    </div>
  );
};