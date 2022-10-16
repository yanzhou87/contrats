import {
    AlertDialog,
    AlertDialogBody, AlertDialogCloseButton,
    AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Link,
    Radio,
    RadioGroup,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import 'react-day-picker/dist/style.css';
import {CalendarIcon} from "@chakra-ui/icons";
import {DayPicker} from "react-day-picker";
import Header from "../Header";

const PageCreerContrat = ({fetchContratsParNom, estAjoute, ajouterContrat, contrat}) => {
    const {nom} = useParams();
    useEffect(() => {
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

    const {isOpen, onOpen, onClose} = useDisclosure()
    console.log(dateDebut)
    if (mois === "1") {
        dateFin.setFullYear(dateDebut.getFullYear())
        dateFin.setMonth(parseInt(dateDebut.getMonth() + 1))
        dateFin.setDate(parseInt(dateDebut.getDate() - 1))
    }
    if (mois === "3") {
        dateFin.setFullYear(dateDebut.getFullYear())
        dateFin.setMonth(parseInt(dateDebut.getMonth() + 3))
        dateFin.setDate(parseInt(dateDebut.getDate() - 1))
    }
    if (mois === "6") {
        dateFin.setFullYear(dateDebut.getFullYear())
        dateFin.setMonth(parseInt(dateDebut.getMonth() + 6))
        dateFin.setDate(parseInt(dateDebut.getDate() - 1))
    }
    if (mois === "12") {
        dateFin.setFullYear(parseInt(dateDebut.getFullYear() + 1))
        dateFin.setMonth(dateDebut.getMonth())
        dateFin.setDate(parseInt(dateDebut.getDate() - 1))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!nomClient || !dateDebut || !mois || !dateFin || !montant || !modeDuPaiement) {
            setEstErreur(true)
            return
        }

        ajouterContrat({
            nom: nom, dateDebut: dateDebut,
            dateFin: dateFin, nomClient: nomClient, montant: montant, modeDuPaiement: modeDuPaiement
        })

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
    return (

        <Box m="auto">
            <Header text={nom} color={"pink"}></Header>
            <Box m="auto" width="600px" mt={5} boxShadow='outline' p='6' rounded='md' bg='white' mb={5}>
                <form onSubmit={onSubmit}>
                    <FormControl isInvalid={estErreur} isRequired>
                        <FormLabel m={3}>Nom Client: </FormLabel>
                        <Input width={400} m={3} min={2} type="text" placeholder={'nom'} value={nomClient}
                               onChange={traiterInputChangeNomClient}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Début de la date :</FormLabel>
                        <Input width={400} m={3} type="number"
                               placeholder={`${dateDebut.getFullYear()}-${dateDebut.getMonth() + 1}-${dateDebut.getDate()}`}
                               value={dateDebut} onChange={traiterInputChangeDateDebut}/>

                        <Button colorScheme='blue' onClick={onOpen}>
                            <CalendarIcon/>
                        </Button>

                        <AlertDialog
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Choisir le début de la date
                                    </AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody>
                                        <DayPicker
                                            mode="single"
                                            selected={dateDebut}
                                            onSelect={setDateDebut}
                                        />
                                        <RadioGroup onChange={setMois} value={mois}>
                                            <Stack direction='row'>
                                                <Radio size='sm' value='1'>1 mois</Radio>
                                                <Radio size='sm' value='3'>3 mois</Radio>
                                                <Radio size='sm' value='6'>6 mois</Radio>
                                                <Radio size='sm' value='12'>12 mois</Radio>
                                            </Stack>
                                            {
                                                mois == "" ? <Box color="red">Au moins un mois doit être ajouté</Box> : <Box></Box>
                                            }
                                        </RadioGroup>
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button colorScheme='red' onClick={onClose} ml={3}>
                                            Ok
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Fin de la date :</FormLabel>
                        <Input width={400} m={3} type="number"
                               placeholder={`${dateFin.getFullYear()}-${dateFin.getMonth() + 1}-${dateFin.getDate()}`}
                               value={`${dateFin.getFullYear()}-${dateFin.getMonth() + 1}-${dateFin.getDate()}`}
                               onChange={traiterInputChangeDateFin}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel m={3}>montant ： </FormLabel>
                        <Input width={400} m={3} type="number" placeholder={'montant'} value={montant}
                               onChange={traiterInputChangeMontant}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>mode du paiement</FormLabel>
                        <RadioGroup onChange={setModeDuPaiement} value={modeDuPaiement}>
                            <Stack direction='row'>
                                <Radio size='sm' value='1'>1 mois</Radio>
                                <Radio size='sm' value='3'>3 mois</Radio>
                                <Radio size='sm' value='6'>6 mois</Radio>
                                <Radio size='sm' value='12'>12 mois</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>

                    <Button width={200} m={3} bg='pink' type='submit'>Ajouter un contrat</Button>
                    <Link href={`http://localhost:3000/utilisateurs/${nom}`} m={3}><Button bg='red' m='5'
                                                                                           width={200}>Retourner</Button></Link>
                </form>
            </Box>
        </Box>

    )
}

export default PageCreerContrat
