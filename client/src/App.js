import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import Home from "./Components/Home.jsx";
import RecipeCreate from "./Components/RecipeCreate";
import Detail from "./Components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/recipes/:id" element={<Detail/>}/>
          <Route path="/recipe" element={<RecipeCreate/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
