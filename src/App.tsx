import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import NotificationProvider from "./context/NotificationProvider";
import SaldoProvider from "./context/SaldoProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <SaldoProvider>
          <ScrollToTop />
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[80] focus:bg-brandPrimary focus:px-4 focus:py-2 focus:rounded-pill"
          >
            Pular para o conteúdo
          </a>
          <Header />
          <div id="conteudo" className="min-h-screen">
            <AppRoutes />
          </div>
          <Footer />
        </SaldoProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
