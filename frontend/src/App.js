// Import dependencies
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom"; // Import Outlet
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import toastr from "toastr";

// Import components
import PathReroute from "./components/Auth/PathReroute";
import NavBar from "./components/NavBar/NavBar";
import RequireAuth from "./components/Auth/RequireAuth";
import DailyLinesSearch from "./components/DailyLinesSearch";
import UserLogin from "./components/UserLogin";
import NewUserLogin from "./components/NewUserLogin";
import Alert from "@mui/material/Alert";

// Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import toastr css
import "toastr/build/toastr.min.css";

// Global styles
import "./assets/styles/global.css";

// Set global toastr options
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: false,
  positionClass: "toast-bottom-full-width", // Change position to bottom center
  preventDuplicates: false,
  onclick: null,
  showDuration: "6000",
  hideDuration: "1000",
  timeOut: "0", // Set to 0 to make it stay indefinitely
  extendedTimeOut: "0", // No extended timeout
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

// Get coming soon message
const ComingSoon = () => {
  return (
    <Alert severity="info" variant="outlined" className="m-4">
      This page is coming soon!
    </Alert>
  );
};

// Main App component
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
                <Route path="home" element={<ComingSoon />} />
                <Route path="about" element={<ComingSoon />} />
                <Route path="contact" element={<ComingSoon />} />

                {/* Private routes */}
                <Route element={<RequireAuth />}>
                  <Route path="daily_lines" element={<DailyLinesSearch />} />
                  <Route path="marketplace" element={<ComingSoon />} />
                  <Route path="bets" element={<ComingSoon />} />
                  <Route path="account" element={<ComingSoon />} />
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
