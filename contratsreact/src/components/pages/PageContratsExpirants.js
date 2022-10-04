import {
    Box, Button,
    FormControl,
    Grid,
    GridItem, Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr
} from "@chakra-ui/react";
import Header from "../Header";
import {ArrowBackIcon, SearchIcon} from "@chakra-ui/icons";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const PageContratsExpirants = ({contratsExpirants,fetchContratsContratsExpirants, fetchContratsParNomClientPourExpirant }) => {
    const {nom} = useParams();
    useEffect( () => {
        fetchContratsContratsExpirants(nom)
    }, [])

    const [nomClient, setNomClient] = useState('')
    const traiterInputChangeNom = (e) => setNomClient(e.target.value)
    console.log(nomClient)
    const onSubmit = (e) => {
        e.preventDefault()

        fetchContratsParNomClientPourExpirant(nom, nomClient)
        setNomClient("")
    }
    return(
        <Box m="auto">
            <Grid templateColumns='repeat(5, 1fr)' mt={2} p={3}>
                <GridItem colSpan={2} colStart={1} ><Header text={nom} color={"black"}></Header></GridItem>
                <GridItem colStart={3} ><Link href={`http://localhost:3000/utilisateurs/${nom}`}><ArrowBackIcon w="80px" mt={4} ml={1} color="LightBlue"/></Link></GridItem>
                <GridItem colSpan={2} colEnd={6} >
                    <form  >
                        <FormControl>
                            <InputGroup onChange={traiterInputChangeNom}>
                                <InputLeftElement
                                    className="InputLeft"
                                    children={<SearchIcon color="gray.300" />}
                                    type="text" value={nomClient}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem'  mr={2} size='sm' onClick={onSubmit}>
                                        Chercher
                                    </Button>
                                </InputRightElement>
                                <Input placeholder={'Chercher par nom'}/>
                            </InputGroup>
                        </FormControl>
                    </form>
                </GridItem>
            </Grid>
            <TableContainer mt="5">
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>......</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>RappelDePaiement</Th>
                            <Th>Nom du client</Th>
                            <Th isNumeric>Date d'expiration</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {contratsExpirants.map((contrat) => (
                            <Tr  key={contrat.id}>
                                <Td><Link href={`http://localhost:3000/utilisateurs/${nom}/contrats/${contrat.id}`}>{ contrat.rappelDePaiement ? "True" : "False"} </Link></Td>
                                <Td><Link href={`http://localhost:3000/utilisateurs/${nom}/contrats/${contrat.id}`} >{ contrat.nomClient }</Link></Td>
                                <Td isNumeric><Link href={`http://localhost:3000/utilisateurs/${nom}/contrats/${contrat.id}`}>{ contrat.dateFin }</Link></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PageContratsExpirants