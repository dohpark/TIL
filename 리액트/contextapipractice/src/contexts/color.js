import { createContext, useState } from "react";

const ColorContext = createContext({
  state: { backgroundColor: "black", fontColor: "white" },
  actions: {
    setBackgroundColor: () => {},
    setFontColor: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [fontColor, setFontColor] = useState("white");

  const value = {
    state: { backgroundColor, fontColor },
    actions: { setBackgroundColor, setFontColor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { ColorConsumer } = ColorContext.Consumer;

export { ColorProvider, ColorConsumer };

export default ColorContext;
