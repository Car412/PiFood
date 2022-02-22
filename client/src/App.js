import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import Home from "./Components/Home.jsx";
import RecipeCreate from "./Components/RecipeCreate";
import Detail from "./Components/Detail";

function App() {
  return (    
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/recipes/:id" element={<Detail/>}/>
          <Route exact path="/recipe" element={<RecipeCreate/>}/>
        </Routes>
      </div>
    
  );
}

export default App;
