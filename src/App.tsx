import Router from "./routes";
import { GlobalStyles } from "./styles/global";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => (
  <>
    <ToastContainer position="top-right" />
    <GlobalStyles />
    <Router />
  </>
);

export default App;
