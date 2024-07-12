import React from "react";

import { SafeAreaView } from "react-native";
import { ThemeProvider } from "styled-components/native";

import colors from "~/styles/colors";
import AppRouter from "~/components/AppRouter";

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider theme={colors}>
        <AppRouter />
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
