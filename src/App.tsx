import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Avatar from "./pages/Avatar";
import Missoes from "./pages/Missoes";
import MissaoDetalhe from "./pages/MissaoDetalhe";
import Faq from "./pages/Faq";
import Integrantes from "./pages/Integrantes";
import Contato from "./pages/Contato";
import MissaoForm from "./pages/MissaoForm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/missoes" element={<Missoes />} />
        <Route path="/missoes/nova" element={<MissaoForm />} />
        <Route path="/missoes/:id" element={<MissaoDetalhe />} />
        <Route path="/missoes/:id/editar" element={<MissaoForm />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
  
}

export default App;
