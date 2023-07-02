import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import ImposterApp from "./ImposterApp";
import initImposter from "./socket/socketClient";

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(
  <Provider>
    <ImposterApp initImposter={initImposter} />
  </Provider>
);
