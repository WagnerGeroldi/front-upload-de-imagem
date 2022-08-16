import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Image } from "./Image";
import { Initial } from "./Initial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/image/:id" element={<Image />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
