import AppRoutes from "./routes/AppRoutes"; // Routing logic
import { ToastContainer } from "react-toastify";
const App = () => {

  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
};

export default App;
