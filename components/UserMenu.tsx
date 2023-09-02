"use client";

import {
  handleOpenUserMenu,
  handleCloseUserMenu,
} from "@/utilities/handleMenus";
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";

const UserMenu = () => {
  const { isAuthenticated, loginWithPopup, user, logout } = useAuth0();
  const { anchorElUser } = useSelector((state: RootState) => state.budget);
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={isAuthenticated ? "Open settings" : "Login"}>
        <IconButton
          onClick={
            isAuthenticated ? handleOpenUserMenu : () => loginWithPopup()
          }
          sx={{ p: 0 }}
        >
          <Avatar alt="profile picture" src={user?.picture} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <Link
            style={{
              textDecoration: "none",
              color: "rgb(20, 60, 250)",
              fontSize: "1.3rem",
              backgroundColor: "rgb(220, 255, 220)",
              padding: "0 10px",
              borderRadius: "12px",
            }}
            href={`${user?.nickname}`}
          >
            {user?.nickname}
          </Link>
          {/* <Typography textAlign={"center"}>{user?.nickname}</Typography> */}
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <Typography paddingLeft={3} color={"red"} textAlign={"center"}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
