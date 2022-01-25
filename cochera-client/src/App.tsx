import CustomerScreen from './components/Customer/CustomerScreen';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import theme from './config/theme';
import { SidebarScreen } from './components/Sidebar/SidebarSreen';
import { Provider } from 'react-redux';
import {store} from './state/store';
import {AppContextProvider} from './context/PopupContext';
import './index.css';
import { CardsScreen } from './components/Car/CarsScreen';
import LoginScreen from './components/Login/LoginScreen';
function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <ChakraProvider theme={theme}>
          <Router>
            <SidebarScreen>
              <Routes>
                <Route path='/' element={<LoginScreen/>}/>
                <Route path='/customer' element={<CustomerScreen/>}/>
                <Route path='/cars/:customerid' element={<CardsScreen/>}/>
              </Routes>
            </SidebarScreen>
          </Router>
        </ChakraProvider>
      </AppContextProvider>
    </Provider>
  );
}

export default App;
