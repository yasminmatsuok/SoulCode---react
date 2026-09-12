import { HashRouter, Routes, Route } from "react-router-dom";import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Avatar from "./pages/Avatar";
import Missoes from "./pages/Missoes";
import MissaoDetalhe from "./pages/MissaoDetalhe";
import Faq from "./pages/Faq";
import Integrantes from "./pages/Integrantes";
import Contato from "./pages/Contato";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/missoes" element={<Missoes />} />
        <Route path="/missoes/:id" element={<MissaoDetalhe />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
  
}

export default App;
