import CustomerScreen from './components/Customer/CustomerScreen';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import theme from './config/theme';
import { SidebarSreen } from './components/Sidebar/SidebarSreen';
import { Provider } from 'react-redux';
import {store} from './state/store';
import {AppContextProvider} from './context/PopupContext';
import './index.css';
import { CardsScreen } from './components/Car/CarsScreen';
function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <ChakraProvider theme={theme}>
          <Router>
            <SidebarSreen/>
            <Routes>
              <Route path='/customer' element={<CustomerScreen/>}/>
              <Route path='/cars/:customerid' element={<CardsScreen/>}/>
            </Routes>
          </Router>
        </ChakraProvider>
      </AppContextProvider>
    </Provider>
  );
}

export default App;
