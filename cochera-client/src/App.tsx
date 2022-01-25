import CustomerScreen from './components/Customer/CustomerScreen';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import theme from './config/theme';
import { SidebarScreen } from './components/Sidebar/SidebarSreen';
import { Provider } from 'react-redux';
import {store} from './state/store';
import {AppContextProvider} from './context/PopupContext';
import './index.css';
import { CarsScreen } from './components/Car/CarsScreen';
import LoginScreen from './components/Login/LoginScreen';
import { SettingsScreen } from './components/Settings/SettingsScreen';
import { DashboardScreen } from './components/Dashboard/DashboardScreen';
import { GarageScreen } from './components/Garage/GarageScreen';
function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <ChakraProvider theme={theme}>
          <Router>
            <Routes>
              <Route path='/' element={<LoginScreen/>}/>
            </Routes>
            <SidebarScreen>
              <Routes>
                <Route path='/dashboard' element={<DashboardScreen/>}/>
                <Route path='/customer' element={<CustomerScreen/>}/>
                <Route path='/garage' element={<GarageScreen/>}/>
                <Route path='/cars/:customerid' element={<CarsScreen/>}/>
                <Route path='/settings' element={<SettingsScreen/>}/>
              </Routes>
            </SidebarScreen>
          </Router>
        </ChakraProvider>
      </AppContextProvider>
    </Provider>
  );
}

export default App;
