import { useRef } from "react";

export const useDragScroll = () => {
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    slider.style.cursor = "grabbing";

    const startX = e.pageX - slider.offsetLeft;
    const scrollLeft = slider.scrollLeft;

    const handleMouseMove = (e) => {
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Velocidade do arrasto
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      slider.style.cursor = "grab";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return {
    sliderRef,
    onMouseDown: handleMouseDown,
  };
};
