import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Bookings from './pages/Bookings'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { purple } from '@mui/material/colors'
import Layout from './components/Layout'

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>            
            <Route path="/rooms">
              <Rooms />
            </Route>
            <Route path="/bookings">
              <Bookings />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
