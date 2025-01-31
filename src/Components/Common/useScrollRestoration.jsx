import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function useScrollRestoration() {

  const location = useLocation();
  const scrollPositions = new Map();

  useEffect(() => {
    const handleScroll = () => {
      // 현재 페이지의 스크롤 위치를 저장
      scrollPositions.set(location.key, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);


  useEffect(() => {
    const scrollY = scrollPositions.get(location.key) || 0;
    window.scrollTo(0, scrollY); // 이전 스크롤 위치로 복원
  }, [location]);


  return (
    null
  );
}
