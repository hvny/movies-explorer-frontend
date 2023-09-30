import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {                //получаем ширину экрана
    const { innerWidth: width } = window;
    return width;
  }

  useEffect(() => {
    function handleResize() {
        setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return windowSize;
}