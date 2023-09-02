import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import CurrencyPoundSharpIcon from "@mui/icons-material/CurrencyPoundSharp";
import NavMenu from "./NavMenu";
import { handleCloseNavMenu } from "@/utilities/handleMenus";
import UserMenu from "./UserMenu";

const pages = ["Products", "Pricing", "Blog"];
const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <CurrencyPoundSharpIcon
          fontSize="large"
          sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          MYBUDGET
        </Typography>
        <NavMenu />
        <CurrencyPoundSharpIcon
          fontSize="large"
          sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
        />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          MYBUDGET
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
              {page}
            </Button>
          ))}
        </Box>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
