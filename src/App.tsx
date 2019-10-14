import React from 'react';
import './App.css';
import Typography from "@material-ui/core/Typography";
import {MainComponent} from "./components/MainComponent";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

export const colors =
{
    primaryColor:    '#000000',
    secondaryColor:  '#cc0000',
    thirdColor:      '#ffffff',
}

const theme = createMuiTheme({
        typography: {
            fontFamily: 'Gochi Hand',
        },
        palette: {
            primary: {
                main: colors.primaryColor
            },
            secondary: {
                main: colors.secondaryColor
            },
            error: {
                main: colors.thirdColor
            }
        }
    },
);

const App: React.FC = () => {
  return (
      <MuiThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                    <Typography
                        variant="h3"
                        color="primary"
                    >
                        Cities of China:
                  </Typography>
                </header>

                <MainComponent/>

            </div>
      </MuiThemeProvider>
  );
}

export default App;
