import { Route, Routes } from "react-router-dom";
import { CLIENTS, LOGIN, NEWCLIENTS } from "./routes"; // Certifique-se de que LOGIN é uma string ou função que retorna uma string
import LoginForm from "./views/auth/components/LoginForm";
import LoginPage from "./views/auth/loginPage";
import ClientsPage from "./views/clients/pages/ClientsPage";
import ClientsRegisterPage from "./views/clients/pages/ClientsRegisterPage";

function App() {
  return (

    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path={LOGIN()} element={<LoginPage/>} />
      <Route path={CLIENTS()} element={<ClientsPage />} />
      <Route path={NEWCLIENTS()} element={<ClientsRegisterPage />} />            
    </Routes>

  );
}

export default App;
