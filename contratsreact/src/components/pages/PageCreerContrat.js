import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    Link, Radio,
    RadioGroup, Stack
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const PageCreerContrat = ({fetchContratsParNom, estAjoute, ajouterContrat, contrat}) => {
    const {nom} = useParams();
    useEffect( () => {
        fetchContratsParNom(nom)
    }, [])

    const [nomClient, setNomClient] = useState("")
    const [dateDebut, setDateDebut] = useState(new Date())
    const [mois, setMois] = useState("")

    const [dateFin, setDateFin] = useState(new Date())
    const [montant, setMontant] = useState(0)
    const [modeDuPaiement, setModeDuPaiement] = useState("")

    const traiterInputChangeNomClient = (e) => setNomClient(e.target.value)
    const traiterInputChangeDateDebut = (e) => setDateDebut(e.target.value)
    const traiterInputChangeDateFin = (e) => setDateFin(e.target.value)
    const traiterInputChangeMontant = (e) => setMontant(e.target.value)

    const [estErreur, setEstErreur] = useState(false)


    if(mois === "1"){
        dateFin.setFullYear(dateDebut.getFullYear())
        dateFin.setMonth(parseInt(dateDebut.getMonth() + 1))
        dateFin.setDate(parseInt(dateDebut.getDate() -1))
    }
    if(mois === "3"){
        dateFin.setFullYear(dateDebut.getFullYear())
        dateFin.setMonth(parseInt(dateDebut.getMonth() + 3))
        dateFin.setDate(parseInt(dateDebut.getDate() -1))
    }
    if(mois === "6"){
        dateFin.setFullYear(dateDebut.getFullYear())
        dateFin.setMonth(parseInt(dateDebut.getMonth() + 6))
        dateFin.setDate(parseInt(dateDebut.getDate() -1))
    }
    if(mois === "12"){
        dateFin.setFullYear(parseInt(dateDebut.getFullYear()+1))
        dateFin.setMonth(dateDebut.getMonth())
        dateFin.setDate(parseInt(dateDebut.getDate() -1))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(!nomClient || !dateDebut || !mois || !dateFin || !montant || !modeDuPaiement){
            setEstErreur(true)
            return
        }

        ajouterContrat({nom : nom, dateDebut : dateDebut,
            dateFin : dateFin, nomClient: nomClient, montant : montant, modeDuPaiement : modeDuPaiement})

        setNomClient("")
        setDateDebut(new Date())
        setMois("")
        setDateFin(new Date())
        setMontant(0)
        setModeDuPaiement("")
    }

    if (estAjoute) {
        window.location.assign(`http://localhost:3000/utilisateurs/${nom}/contrats`)
    }
    return(

        <form onSubmit={onSubmit}>
            {
                estAjoute ?
                    <Box>Contrat est ajouté !!!!</Box>
                    :
                    <Box></Box>
            }
            <FormControl  isInvalid={estErreur} isRequired >
                <FormLabel m={3}>Nom Client: </FormLabel>
                <Input width={400} m={3} min={2} type="text" placeholder={'nom'} value={nomClient} onChange={traiterInputChangeNomClient}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Début de la date :</FormLabel>

                <RadioGroup onChange={setMois} value={mois}>
                    <Stack direction='row'>
                        <Radio size='sm'  colorScheme='green' value='1'>1 mois</Radio>
                        <Radio size='sm'  colorScheme='green' value='3'>3 mois</Radio>
                        <Radio size='sm'  colorScheme='green' value='6'>6 mois</Radio>
                        <Radio size='sm'  colorScheme='green' value='12'>1 année</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Fin de la date :</FormLabel>

            </FormControl>

            <FormControl  isRequired>
                <FormLabel m={3}>montant ： </FormLabel>
                <Input width={400} m={3} type="number" placeholder={'montant'} value={montant} onChange={traiterInputChangeMontant}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>mode du paiement</FormLabel>
                <RadioGroup onChange={setModeDuPaiement} value={modeDuPaiement}>
                    <Stack direction='row'>
                        <Radio size='sm'  value='1'>1 mois</Radio>
                        <Radio size='sm'  value='3'>3 mois</Radio>
                        <Radio size='sm'  value='6'>6 mois</Radio>
                        <Radio size='sm'  value='12'>12 mois</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>

            <Button width={200} m={3} bg='pink' type='submit'>Ajouter un contrat</Button>
            <Link href={`http://localhost:3000/utilisateurs/${nom}/contrats`} m={3} ><Button bg='yellow' m='5' width={200} >Retourner</Button></Link>
        </form>

    )
}

export default PageCreerContrat