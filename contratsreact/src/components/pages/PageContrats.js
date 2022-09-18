import {
    Box, Button, FormControl, Grid, GridItem, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import Header from "../Header";
import {useParams} from "react-router-dom";
import {ArrowBackIcon, SearchIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";

const PageContrats= ({fetchContratsParNom,  contrats, fetchContratsParNomClient}) => {
    const {nom} = useParams();
    useEffect( () => {
        fetchContratsParNom(nom)
    }, [])

    const [nomClient, setNomClient] = useState('')
    const traiterInputChangeNom = (e) => setNomClient(e.target.value)
    const onSubmit = (e) => {
        e.preventDefault()

        fetchContratsParNomClient(nom, nomClient)
        setNomClient("")
    }

    return (
        <Box m="auto">

              <Header w={10} h={10} text={nom} color={"black"}></Header>
               <Link href={`http://localhost:3000/utilisateurs/${nom}`}><Button>Retourner</Button></Link>

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
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Nom du client</th>
                            <th>Date d'expiration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contrats.map((contrat) => (
                            <tr  key={contrat.id}>
                                <td><Link to={`/contrats/${contrat.id}`}>{ contrat.id }</Link></td>
                                <td><Link to={`/contrats/${contrat.id}`}>{ contrat.nomClient }</Link></td>
                                <td><Link to={`/contrats/${contrat.id}`}>{ contrat.dateFin }</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </Box>
    )
}
PageContrats.propTypes = {
}
export default PageContrats
