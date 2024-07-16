import React from "react";
import { SafeAreaView } from "react-native";
import { ThemeProvider } from "styled-components/native";

import AppRouter from "~/components/AppRouter";
import theme from "~/styles/theme";

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
