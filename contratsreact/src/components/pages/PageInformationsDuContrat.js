import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Box, Button, Link, SimpleGrid} from "@chakra-ui/react";
import Header from "../Header";

const PageInformationsDuContrat = () => {
    const {nom, id} = useParams();
    const [contrat, setContrat] = useState({})
    useEffect(() => {
        fetchContratParId(nom, id)
        }, []

    )
    const fetchContratParId = async (nom, id) => {
        console.log(id, nom)
        const res = await fetch(`http://localhost:8080/utilisateurs/contrats/${id}`)
        const data = await res.json()
        setContrat(data)
        return data
    }

    return(
        <Box m="auto">
            <Header text={nom} color={"pink"}></Header>
            <Box  m="auto" width="600px" mt={5} boxShadow='outline' p='6' rounded='md' bg='white' mb={5}>
                <Box mb={5} fontSize={40}>Nom client : {contrat.nomClient}</Box>
                <Box mb={5} fontSize={40}>Date Debut : {contrat.dateDebut}</Box>
                <Box mb={5} fontSize={40}>Date Fin : {contrat.dateFin}</Box>
                <Box mb={5} fontSize={40}>Montant : {contrat.montant} $</Box>
                <Box mb={5} fontSize={40}>Mode du paiement : {contrat.modeDuPaiement} </Box>
            </Box>
            <SimpleGrid m="auto" width="600px" spacing='40' columns={{ sm: 1, md: 2 }} p={5}>
                <Link href={`http://localhost:3000/utilisateurs/${nom}/create`}><Button bg="pink" w="200px">Renouveler</Button></Link>
                <Link href={`http://localhost:3000/utilisateurs/${nom}`}><Button bg="pink"  w="200px">Retourner</Button></Link>
            </SimpleGrid>
        </Box>
    )
}
export default PageInformationsDuContrat