import { Route, Routes } from "react-router-dom";
import { CLIENTS, EDITCLIENTS, LOGIN, NEWCLIENTS } from "./routes"; // Certifique-se de que LOGIN é uma string ou função que retorna uma string
import LoginForm from "./views/auth/components/LoginForm";
import ClientsPage from "./views/clients/pages/ClientsPage";
import ClientsRegisterPage from "./views/clients/pages/ClientsRegisterPage";
import ClientsEditionPage from "./views/clients/pages/EditClient";

function App() {
  return (

    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path={LOGIN()} element={<LoginForm/>} />
      <Route path={CLIENTS()} element={<ClientsPage />} />
      <Route path={NEWCLIENTS()} element={<ClientsRegisterPage />} /> 
      <Route path={EDITCLIENTS(':id')} element={<ClientsEditionPage />} />                
    </Routes>

  );
}

export default App;
