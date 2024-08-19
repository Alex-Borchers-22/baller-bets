// Import dependencies
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom"; // Import Outlet
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Import components
import DailyLinesSearch from "./components/DailyLinesSearch";
import UserLogin from "./components/UserLogin";
import NewUserLogin from "./components/NewUserLogin";

// Include NavBar component
import NavBar from "./components/NavBar";

// Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Global styles
import "./assets/styles/global.css";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div className="main_container">
          <NavBar />
          <div className="container_content"></div>
          <Routes>
            {/* Add a parent route */}
            <Route path="/" element={<Outlet />}>
              <Route index element={<UserLogin />} />
              <Route path="login" element={<UserLogin />} />
              <Route path="register" element={<NewUserLogin />} />
              <Route path="daily_lines" element={<DailyLinesSearch />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
