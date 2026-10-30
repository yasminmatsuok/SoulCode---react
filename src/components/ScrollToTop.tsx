import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Ao trocar de página, volta ao topo (o BrowserRouter não faz isso sozinho)
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
