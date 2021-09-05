import React from "react";
import ColorConsumer from "../contexts/color";

const Main = () => {
  return (
    <ColorConsumer>
      {({ state }) => (
        <>
          <div
            style={{
              fontSize: "22px",
              background: state.backgroundColor,
              color: state.fontColor,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            accusantium odit fuga totam neque. Earum praesentium facilis nisi
            amet quae velit autem reprehenderit quam tenetur ratione,
            consequuntur et consectetur asperiores?
          </div>
        </>
      )}
    </ColorConsumer>
  );
};

export default Main;
