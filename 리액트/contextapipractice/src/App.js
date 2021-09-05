import React from "react";
import Main from "./components/Main";
import SelectColors from "./components/SelectColors";
import { ColorProvider } from "./contexts/color";
const App = () => {
  return (
    <ColorProvider>
      <>
        <SelectColors />
        <Main />
      </>
    </ColorProvider>
  );
};

export default App;
