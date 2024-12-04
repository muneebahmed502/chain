import React,{useState}from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Box, Button, InputBase, IconButton,MenuItem,Avatar,Tooltip,Menu} from "@mui/material";


const AdminHeader = () => {
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    return (
      // <GlassHeader >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between",background:'black'}}>
          
          {/* Left Section: Logo and Navigation Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Logo */}
            <Typography 
            
            variant="h6" component="div" sx={{ color: "white",fontWeight:'bold'}}>
              Perfume Store
            </Typography>
  
            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button onClick={() => navigate('/')} color="inherit" sx={{ color: "#FFFFFF",fontWeight:'bold' }}>Home</Button>
              <Button onClick={() => navigate('/Product')} color="inherit" sx={{ color: "white" ,fontWeight:'bold'}}>Products</Button>
              <Button onClick={() => navigate('/AboutUs')} color="inherit" sx={{ color: "white",fontWeight:'bold' }}>About</Button>
              <Button onClick={() => navigate('/ContactUs')} color="inherit" sx={{ color: "white",fontWeight:'bold' }}>Contact</Button>
            </Box>
          </Box>
  
          {/* Right Section: Search Box */}
          <Box sx={{ flexGrow: 0 }}>
            <Button variant="contained" onClick={() => navigate("/AddPerfume")}>Add Perfume</Button>
          <IconButton onClick={() => navigate('/ViewAddToCart')}>
                <LocalMallOutlinedIcon sx={{color:'white',mr:3,fontSize:30}} />
              </IconButton>
              <Tooltip title="Open settings">
  
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
  
                  
                  <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={() => navigate('/LoginAndSignUpPage')} sx={{ textAlign: 'center' }}>Login</Typography>
                  </MenuItem>
              </Menu>
             
            </Box>
        </Toolbar>
      // </GlassHeader>
    );
  };
  
export default AdminHeader
