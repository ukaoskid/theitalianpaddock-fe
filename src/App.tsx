import { Page } from './components/Page';
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { Map } from './components/Map';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Map></Map>
      <div style={{ margin: '1em' }}>
        <Page/>
      </div>
    </ThemeProvider>
  )
}

export default App;
