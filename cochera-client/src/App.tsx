import CustomerScreen from './components/CustomerScreen';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import theme from './config/theme';
import { SidebarSreen } from './components/Sidebar/SidebarSreen';
import { Provider } from 'react-redux';
import {store} from './state/store';
function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <SidebarSreen/>
          <Routes>
            <Route path='/customer' element={<CustomerScreen/>}/>
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
