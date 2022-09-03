import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PageLogin from "./components/pages/PageLogin";
import {useEffect, useState} from "react";

function App() {
    const [utilisateur, setUtilisateur] = useState([])

    const fetchUtilisateur = async (utilisateur) => {
        console.log("utilisateur : " + utilisateur.nom)
        const res = await fetch(`http://localhost:8080/utilisateur/${utilisateur}`)
        const data = await res.json()
        setUtilisateur(data)
        return data
    }

  return (
      <Router>
          <div>
              <Routes>
                  <Route exact path='/' element={<PageLogin fechUtilisateur={fetchUtilisateur}/>}/>
              </Routes>
          </div>
      </Router>


  );
}

export default App;
