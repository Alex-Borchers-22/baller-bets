import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../../assets/images/BallerBetsLogo1.jpg";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PrivateNavBar = () => {
  // Get navigate
  const navigate = useNavigate();

  // Get user from local storage
  const user = JSON.parse(localStorage.getItem("bb_user"));

  // State for account menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // State for hamburger menu
  const [hamburgerAnchorEl, setHamburgerAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isHamburgerMenuOpen = Boolean(hamburgerAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleHamburgerMenuOpen = (event) => {
    setHamburgerAnchorEl(event.currentTarget);
  };

  const handleHamburgerMenuClose = () => {
    setHamburgerAnchorEl(null);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("bb_user");
    localStorage.removeItem("bb_token");
    window.location = "/login";
  };

  // Handle route to daily lines
  const handeReroute = (route) => {
    navigate(route);
    handleHamburgerMenuClose();
  };

  // Define account menu
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <AccountCircle
          sx={{
            mr: 1,
          }}
        />
        Profile (Not Implemented)
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        My account (Not Implemented)
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  // Define mobile menu
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <MailIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // Define hamburger menu
  const hamburgerMenuId = "hamburger-menu";
  const renderHamburgerMenu = (
    <Menu
      anchorEl={hamburgerAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      id={hamburgerMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isHamburgerMenuOpen}
      onClose={handleHamburgerMenuClose}
    >
      <MenuItem
        onClick={() => {
          handeReroute("daily_lines");
        }}
      >
        Daily Lines
      </MenuItem>
      <MenuItem
        onClick={() => {
          handeReroute("marketplace");
        }}
      >
        Marketplace
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" className="navbar-main">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            <Avatar alt="BallerBets" src={logo} />
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleHamburgerMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ mr: 2, color: "lime" }}>
              {/* <UserMoney /> */}${user.money}
            </Typography>
            <Typography
              variant="body1"
              sx={{ display: { xs: "block", md: "block" } }}
            >
              {user.username}
            </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderHamburgerMenu}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default PrivateNavBar;
