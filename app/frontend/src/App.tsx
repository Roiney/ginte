import { Route, Routes } from "react-router-dom";
import { LOGIN } from "./routes"; // Certifique-se de que LOGIN é uma string ou função que retorna uma string
import LoginForm from "./views/auth/components/LoginForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path={LOGIN()} element={<LoginForm />} />
    </Routes>
  );
}

export default App;
