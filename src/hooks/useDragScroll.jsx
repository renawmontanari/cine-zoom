import { useRef } from "react";

export const useDragScroll = () => {
  const sliderRef = useRef(null);
  let isDragging = false;
  let startPos = 0;
  let currentScroll = 0;

  const handleStart = (e) => {
    isDragging = true;

    // Para mouse (clientX) ou touch (touches[0].clientX)
    startPos = e.clientX || e.touches[0].clientX;
    currentScroll = sliderRef.current.scrollLeft;

    // Aplica o cursor de arrastar (apenas para desktop)
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grabbing";
    }
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    // Obtém a posição atual (mouse ou touch)
    const currentPos = e.clientX || e.touches[0].clientX;
    const distance = currentPos - startPos;
    sliderRef.current.scrollLeft = currentScroll - distance;
  };

  const handleEnd = () => {
    isDragging = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  return {
    sliderRef,
    onMouseDown: handleStart,
    onTouchStart: handleStart,
    onMouseMove: handleMove,
    onTouchMove: handleMove,
    onMouseUp: handleEnd,
    onTouchEnd: handleEnd,
  };
};
