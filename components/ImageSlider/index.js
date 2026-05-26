import { useRef, useState, useCallback } from "react";

const SlideImage = ({ src, idx, objectFit = "object-cover" }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="min-w-full snap-center flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center gap-2 select-none">
        <span className="text-4xl opacity-30">🖼</span>
        <span className="text-sm opacity-50">图片 {idx + 1}</span>
      </div>
    );
  }

  return (
    <div className="min-w-full snap-center flex-shrink-0">
      <img
        src={src}
        alt={`图片 ${idx + 1}`}
        className={`w-full h-full ${objectFit}`}
        draggable={false}
        onError={() => setError(true)}
      />
    </div>
  );
};

const ImageSlider = ({ images = [], height = "h-64", objectFit = "object-cover" }) => {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const slideWidth = container.clientWidth;
    const idx = Math.round(container.scrollLeft / slideWidth);
    if (idx !== current) setCurrent(idx);
  }, [current]);

  if (!images || images.length === 0) {
    return (
      <div className={`${height} bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center gap-2`}>
        <span className="text-4xl opacity-30">🖼</span>
        <span className="text-sm opacity-50">暂无图片</span>
      </div>
    );
  }

  const scrollTo = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const slideWidth = container.clientWidth;
    container.scrollTo({ left: slideWidth * index, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`${height} flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-lg no-scrollbar`}
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {images.map((src, idx) => (
          <SlideImage key={idx} src={src} idx={idx} objectFit={objectFit} />
        ))}
      </div>

      {images.length > 1 && (
        <>
          {/* 左右箭头 — 手机端始终可见 */}
          <button
            onClick={() => scrollTo(Math.max(0, current - 1))}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 mob:w-8 mob:h-8 rounded-full bg-black/40 text-white text-sm flex items-center justify-center active:bg-black/60 transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => scrollTo(Math.min(images.length - 1, current + 1))}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 mob:w-8 mob:h-8 rounded-full bg-black/40 text-white text-sm flex items-center justify-center active:bg-black/60 transition-colors"
          >
            ›
          </button>

          {/* 圆点指示器 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === current ? "bg-white w-3" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
