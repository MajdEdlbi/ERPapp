import { Box } from '@mui/material';
import Datagrid from '../Datagrid/Datagrid';
import Container from '@mui/material/Container';
import Topbar from '../Topbar/Topbar';


export default function Maincontent() {
  return (
       <Container maxWidth={'xl'}>
          <Box marginTop={15}>
               <Topbar/>
               <Datagrid/>
          </Box>
       </Container>
  );
}
