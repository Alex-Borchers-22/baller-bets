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
import PathReroute from "./components/Auth/PathReroute";
import NavBar from "./components/NavBar/NavBar";
import RequireAuth from "./components/Auth/RequireAuth";
import DailyLinesSearch from "./components/DailyLinesSearch";
import UserLogin from "./components/UserLogin";
import NewUserLogin from "./components/NewUserLogin";

// Import toastr css
import "toastr/build/toastr.min.css";

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
              {/* Reroute certain paths if user is logged in */}
              <Route element={<PathReroute />}>
                {/* Public routes */}
                <Route index element={<UserLogin />} />
                <Route path="login" element={<UserLogin />} />
                <Route path="register" element={<NewUserLogin />} />

                {/* Private routes */}
                <Route element={<RequireAuth />}>
                  <Route path="daily_lines" element={<DailyLinesSearch />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
