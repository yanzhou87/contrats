import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PageLogin from "./components/pages/PageLogin";
import {useEffect, useState} from "react";
import AjouterUtilisateur from "./components/pages/AjouterUtilisateur";
import { ChakraProvider } from '@chakra-ui/react'

import { useBoolean } from '@chakra-ui/react'

function App() {
    const [utilisateur, setUtilisateur] = useState([])
    const [utilisateurs, setUtilisateurs] = useState([])
    const [estLogin, setEstLogin] = useState(false)
    const [succesInscription, setSuccesInscription] = useState(false)
    const [estErreurPourMauvaisMotDePasse, setEstErreurPourMauvaisMotDePasse] = useState(false)
    const [nomOuCourrielExistent, setNomOuCourrielExistent] = useState(false)

    useEffect(() => {
        const getUtilisateurs = async () => {
            const utilisateursFromServer = await fetchUtilisateurs()
            setUtilisateurs(utilisateursFromServer)
            getUtilisateurs()
        }
    }, [])

    const fetchUtilisateurs = async () => {
        const res = await fetch('http://localhost:8080/utilisateurs')
        const data = await res.json()
        return data
    }

    const fetchUtilisateur = async (u) => {
        const res = await fetch(`http://localhost:8080/utilisateurs/${u.nom}`)
        const data = await res.json()
        setUtilisateur(data)
        if (data.motDePasse === u.motDePasse){
            setEstLogin(true)
        }
        else
            setEstErreurPourMauvaisMotDePasse(true)

        return data
    }

    const ajouterCompte = async (compte) => {
        console.log(compte.nom)
        const res = await fetch('http://localhost:8080/utilisateurs',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compte)
            })
        console.log( "status : " + res.status)
        if(res.status === 404){
            setNomOuCourrielExistent(true)
            alert("Le nom ou le courriel existent")
        }
        if(res.status === 201){
            setSuccesInscription(true)
            const data = await res.json();
            setUtilisateurs([...utilisateurs, data])
        }
    }

    return (
        <ChakraProvider>
            <Router>
                <div>
                    <Routes>
                        <Route exact path='/' element={<PageLogin fetchUtilisateur={fetchUtilisateur} estLogin={estLogin} setSuccesInscription={setSuccesInscription} estErreurPourMauvaisMotDePasse={estErreurPourMauvaisMotDePasse}/> }/>
                        <Route exact path='/ajouterUtilisateur' element={<AjouterUtilisateur onAjouter={ajouterCompte} succesInscription={succesInscription} nomOuCourrielExistent={nomOuCourrielExistent}/>}/>
                    </Routes>
                </div>
            </Router>
        </ChakraProvider>

  );
}

export default App;
