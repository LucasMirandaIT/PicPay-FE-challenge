import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

import "./Navbar.css";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

import { AlternateEmail, Logout, Person } from "@mui/icons-material";

import logoWhite from "../../assets/logo_white.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav className={`sidebar-container`}>
        <div className="side-bar">
          <img src={logoWhite} alt="PayFriends logo" />

          <>
            <IconButton data-testid="avatar-group" onClick={handleClick}>
              <Avatar />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              data-testid="account-menu"
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem disabled>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                <span className="userName"> {authenticatedUser.name} </span>
              </MenuItem>
              <MenuItem disabled>
                <ListItemIcon>
                  <AlternateEmail fontSize="small" />
                </ListItemIcon>
                {authenticatedUser.email}
              </MenuItem>
              <Divider />
              <MenuItem data-testid="logout-button" onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                {t('global:logoutLabel')}
              </MenuItem>
            </Menu>
          </>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
