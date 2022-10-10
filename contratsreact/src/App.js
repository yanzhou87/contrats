import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PageLogin from "./components/pages/PageLogin";
import {useEffect, useState} from "react";
import AjouterUtilisateur from "./components/pages/AjouterUtilisateur";
import { ChakraProvider } from '@chakra-ui/react'
import PageMenu from "./components/pages/PageMenu";
import PageContrats from "./components/pages/PageContrats";
import PageInformationsDuContrat from "./components/pages/PageInformationsDuContrat";
import PageContratsExpirants from "./components/pages/PageContratsExpirants";
import PageCreerContrat from "./components/pages/PageCreerContrat";

function App() {
    const [estLogin, setEstLogin] = useState(false)
    const [succesInscription, setSuccesInscription] = useState(false)
    const [estErreurPourMauvaisMotDePasse, setEstErreurPourMauvaisMotDePasse] = useState(false)
    const [nomOuCourrielExistent, setNomOuCourrielExistent] = useState(false)
    const [compteExistePas, setCompteExistePas] = useState(false)
    const [contrats, setContrats] = useState([])
    const [contratsExpirants, setContratsExpirants] = useState([])
    const [estAjoute, setEstAjoute] = useState(false)
    const [contrat, setContrat] = useState({})

    const fetchUtilisateurs = async () => {
        const res = await fetch('http://localhost:8080/utilisateurs')
        const data = await res.json()
        return data
    }

    const fetchUtilisateur = async (u) => {

        const res = await fetch(`http://localhost:8080/utilisateurs/${u.nom}`)
        const data = await res.json()

        if(res.status === 500){
            setCompteExistePas(true)
        }else if (data.motDePasse === u.motDePasse){
            setEstLogin(true)
        }
        else
            setEstErreurPourMauvaisMotDePasse(true)
        return data
    }

    const fetchContratsParNomClient = async (nom, nomClient) => {
        console.log(nom + " " + nomClient)
        const res = await fetch(`http://localhost:8080/utilisateurs/${nom}/contrats/${nomClient}`)
        const data = await res.json()
        setContrats(data)
        return data
    }

    const fetchContratsParNomClientPourExpirant = async (nom, nomClient) => {

        const res = await fetch(`http://localhost:8080/utilisateurs/${nom}/contratsExpirant/${nomClient}`)
        const data = await res.json()
        setContratsExpirants(data)
        return data
    }

    const fetchContratsParNom = async (nom) => {
        const res = await fetch(`http://localhost:8080/utilisateurs/${nom}/contrats`)
        const data = await res.json()
        setContrats(data)
        return data
    }
    const ajouterCompte = async (compte) => {

        const res = await fetch('http://localhost:8080/utilisateurs',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compte)
            })
        if(res.status === 404){
            setNomOuCourrielExistent(true)
            alert("Le nom ou le courriel existent")
        }
        if(res.status === 201){
            setSuccesInscription(true)
            const data = await res.json();
            //  setUtilisateurs([...utilisateurs, data])
        }
    }

    const fetchContratsContratsExpirants = async (nom) => {
        console.log("fetch expirants : " + nom)
        const res = await fetch(`http://localhost:8080/utilisateurs/${nom}/contratsExpirants`)
        const data = await res.json()
        setContratsExpirants(data)
        return data
    }

    const ajouterContrat = async (contrat) => {
        console.log("ajouter contrat : " + contrat.nom)
        const res = await fetch(`http://localhost:8080/utilisateurs/${contrat.nom}/create`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(contrat)
            })
        const data = await res.json()
        if(res.status === 201){
            setEstAjoute(true)
            setContrats([...contrats, data])
        }
    }
    return (
        <ChakraProvider>
            <Router>
                <div>
                    <Routes>
                        <Route exact path='/' element={<PageLogin fetchUtilisateur={fetchUtilisateur} estLogin={estLogin} setSuccesInscription={setSuccesInscription} estErreurPourMauvaisMotDePasse={estErreurPourMauvaisMotDePasse} compteExistePas={compteExistePas}/> }/>
                        <Route exact path='/ajouterUtilisateur' element={<AjouterUtilisateur onAjouter={ajouterCompte} succesInscription={succesInscription} nomOuCourrielExistent={nomOuCourrielExistent}/>}/>
                        <Route exact path='/utilisateurs/:nom' element={<PageMenu />}/>
                        <Route exact path='/utilisateurs/:nom/contrats' element={<PageContrats fetchContratsParNom={fetchContratsParNom} contrats={contrats} fetchContratsParNomClient={fetchContratsParNomClient}/>}/>
                        <Route exact path='/utilisateurs/:nom/contrats/:id' element={<PageInformationsDuContrat />}/>
                        <Route exact path='/utilisateurs/:nom/contratsExpirants' element={<PageContratsExpirants fetchContratsContratsExpirants={fetchContratsContratsExpirants} contratsExpirants={contratsExpirants} fetchContratsParNomClientPourExpirant={fetchContratsParNomClientPourExpirant}/>}/>
                        <Route exact path='/utilisateurs/:nom/create' element={<PageCreerContrat fetchContratsParNom={fetchContratsParNom} estAjoute={estAjoute} ajouterContrat={ajouterContrat} contrat={contrat}/>}/>
                    </Routes>
                </div>
            </Router>
        </ChakraProvider>

  );
}

export default App;
