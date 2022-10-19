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
            <Grid templateColumns="repeat(5,1fr)" mt={2} p={3}>
                <GridItem colSpan={2} colStart={1}><Header w={10} h={10} text={nom} color={"black"}></Header></GridItem>
                <GridItem colStart={3}><Link href={`http://localhost:3000/utilisateurs/${nom}`}><ArrowBackIcon w="80px" mt={4} ml={1} color="LightBlue"/></Link></GridItem>
                <GridItem colSpan={2} colEnd={6}>
                    <form>
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
                <Table variant="striped" colorScheme='teal'>
                    <TableCaption>......</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Nom du client</Th>
                        <Th>Date d'expiration</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {contrats.map((contrat) => (
                        <Tr  key={contrat.id}>
                            <Td><Link href={`http://localhost:3000/utilisateurs/${nom}/contrats/${contrat.id}`}>{ contrat.id }</Link></Td>
                            <Td><Link href={`http://localhost:3000/utilisateurs/${nom}/contrats/${contrat.id}`}>{ contrat.nomClient }</Link></Td>
                            <Td><Link href={`http://localhost:3000/utilisateurs/${nom}/contrats/${contrat.id}`}>{ contrat.dateFin }</Link></Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
PageContrats.propTypes = {
}
export default PageContrats
