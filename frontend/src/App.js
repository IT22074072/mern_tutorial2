import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages and components
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

//Home component being rendered for the root path
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <div className="pages">
          <Routes>
            <Route 
            path="/"
            element={<Home/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
