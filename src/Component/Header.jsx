import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import WebsiteLogo from "../pictures/WebsiteLogo.png";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import {
  Box,
  Button,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { auth, logout } from "../Config/firebase";

const Header = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/Product")}>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/AboutUs")}>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/ContactUs")}>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {isLoggedIn && (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/Profile")}>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar position="static" sx={{ background: "black" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between",ml:{md:0,xs:-4}}}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2}}>
              <img width="200px" src={WebsiteLogo} alt="Website Logo" />
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button onClick={() => navigate("/")} color="inherit">
                Home
              </Button>
              <Button onClick={() => navigate("/Product")} color="inherit">
                Products
              </Button>
              <Button onClick={() => navigate("/AboutUs")} color="inherit">
                About
              </Button>
              <Button onClick={() => navigate("/ContactUs")} color="inherit">
                Contact
              </Button>
            </Box>

            {/* Cart and User Menu */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => navigate("/ViewAddToCart")}>
                <LocalMallOutlinedIcon sx={{ color: "white", fontSize: 30 }} />
              </IconButton>
              {isLoggedIn ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="User Avatar"
                        src="https://tse1.mm.bing.net/th?id=OIP.f4aL6WXIvkrJoawAxDBb7AAAAA&pid=Api&P=0&h=180"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => navigate("/Profile")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button onClick={() => navigate("/LoginAndSignUpPage")} color="inherit">
                  Login
                </Button>
              )}
            </Box>

            {/* Mobile Hamburger Menu */}
            <IconButton
              sx={{
                display: { xs: "flex", md: "none"},
                color: "white",
                // marginLeft: "auto", // Adjust position
                // ml:-3
              }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
