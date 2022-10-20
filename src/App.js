import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
