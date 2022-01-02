import CustomerScreen from './components/CustomerScreen';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import theme from './config/theme';
import { SidebarSreen } from './components/Sidebar/SidebarSreen';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <SidebarSreen/>
        <Routes>
          <Route path='/customer' element={<CustomerScreen/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
