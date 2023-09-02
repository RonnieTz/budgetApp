"use client";

import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchBanks,
  deleteBank,
  setDrawerVisible,
  setBankEditMOde,
} from "@/redux/budgetSlice";
import { useEffect } from "react";
import AddBank from "./AddBank";
import Link from "next/link";

const SideDrawer = () => {
  const { user, isAuthenticated } = useAuth0();

  const { drawerVisible, banks, bankEditMode } = useSelector(
    (state: RootState) => state.budget
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchBanks(user?.nickname));
  }, [user, dispatch]);
  const handleOpen = () => {
    dispatch(setDrawerVisible(!drawerVisible));
  };
  const handleDeleteBank = (id: string) => {
    dispatch(deleteBank(id));
  };
  return (
    <>
      <Drawer
        sx={{ opacity: 0.9 }}
        anchor={"left"}
        open={drawerVisible}
        onClose={handleOpen}
      >
        <Box width={250} bgcolor={"rgb(40, 40, 255)"} height={"100%"}>
          <List>
            <Box height={"35vh"} sx={{ overflowY: "auto" }}>
              {banks.map((bank) => (
                <ListItem key={bank._id}>
                  <ListItemButton href={`/banks/${bank.name}`}>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <Typography color={"whitesmoke"}>{bank.name}</Typography>
                    </Box>
                  </ListItemButton>
                  <Button
                    variant="contained"
                    sx={{ visibility: !bankEditMode ? "hidden" : null }}
                    onClick={() => handleDeleteBank(bank._id)}
                  >
                    <DeleteForeverIcon color="warning" />
                  </Button>
                </ListItem>
              ))}
            </Box>
            <ListItem>
              <AddBank />
            </ListItem>
            <ListItem>
              <Button
                onClick={() => dispatch(setBankEditMOde(!bankEditMode))}
                disableRipple
                sx={{ color: !bankEditMode ? "white" : "red" }}
              >
                {bankEditMode ? "HIDE DELETE OPTIONS" : "SHOW DELETE OPTIONS"}
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Button
        onClick={handleOpen}
        variant="contained"
        size="large"
        disabled={!isAuthenticated}
        sx={{
          position: "absolute",
          marginTop: 1,
          textAlign: "center",
          visibility: drawerVisible ? "hidden" : null,
        }}
      >
        Banks
      </Button>
    </>
  );
};

export default SideDrawer;
