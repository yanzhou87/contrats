import {Box, Button, Link, Stack, Text} from '@chakra-ui/react'
import {useParams} from "react-router-dom";
import Header from "../Header";

const PageMenu = ({}) => {
    const {nom} = useParams();

    return (
        <Box>
            <Header color={"black"} h={10} text={nom} w={10} mt="3"></Header>
            <Box m="auto" w="600px">
                <Text fontSize='6xl' align="center" color="LightBlue">Menu</Text>
                <Stack direction='column' mt="10" spacing={10} m="auto">
                    <Link href={`http://localhost:3000/utilisateurs/${nom}/contrats`} align="center" ><Button bg="LightBlue" w={300}>Les contrats</Button></Link>
                    <Link href={`http://localhost:3000/utilisateurs/${nom}/contratsExpirants`} align="center" ><Button bg="LightBlue" w={300}>Les contrats expirant</Button></Link>
                    <Link align="center"><Button bg="LightBlue" w={300}>Ajouter un nouveau contrat</Button></Link>
                </Stack>
            </Box>
        </Box>
    )
}
PageMenu.propTypes = {
}
export default PageMenu
