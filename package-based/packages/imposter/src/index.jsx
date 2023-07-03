import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import ImposterApp from "./ImposterApp";
import initImposter from "./socket/socketClient";
import imposterStore from "./redux/imposterStore";

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(
  <Provider store={imposterStore}>
    <ImposterApp initImposter={initImposter} />
  </Provider>
);
