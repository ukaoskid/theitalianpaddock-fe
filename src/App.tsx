import './App.css'
import { Page } from './components/Page';
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { Map } from './components/Map';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <div style={{ margin: '1em' }}>
        <Page/>
        <Map/>
      </div>
    </ThemeProvider>
  )
}

export default App;
