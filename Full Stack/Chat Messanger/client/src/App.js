import { Fragment } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { Login } from "./components/Login/Login";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Footer } from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  const [id, setId] = useLocalStorage("id");

  return (
    <Fragment>
      <Header />
      {id ? <Dashboard id={id} /> : <Login setId={setId} />}
      <Footer />
    </Fragment>
  );
}

export default App;
