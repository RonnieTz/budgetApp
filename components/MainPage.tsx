import { Box, Typography } from "@mui/material";

const MainPage = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      paddingTop={10}
    >
      <Typography variant="h3" color={"rgb(70, 70, 30)"}>
        Welcome to BudgetApp
      </Typography>
    </Box>
  );
};

export default MainPage;
