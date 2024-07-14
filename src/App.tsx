import React from "react";

import { SafeAreaView } from "react-native";
import { ThemeProvider } from "styled-components/native";

import theme from "~/styles/theme";
import AppRouter from "~/components/AppRouter";

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
