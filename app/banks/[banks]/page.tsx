"use client";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchTransactions,
  deleteTransaction,
  setTransactionDeleteMode,
} from "@/redux/budgetSlice";
import AddTransaction from "@/components/AddTransaction";

const Page = ({ params }: any) => {
  const { user } = useAuth0();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTransactions(user?.nickname));
  }, [user, dispatch]);
  const { transactions, transactionDeleteMode } = useSelector(
    (state: RootState) => state.budget
  );
  const bank = params.banks.replaceAll("%20", " ");

  const handleDelete = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  return (
    <Box
      width={"60%"}
      margin={"0 auto 0 auto"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Typography
        marginTop={1}
        marginBottom={2}
        color={"black"}
        fontWeight={"400"}
        variant="h2"
      >
        {bank}
      </Typography>
      <TableContainer>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">Transaction</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell
                sx={{ display: !transactionDeleteMode ? "none" : null }}
                align="left"
              >
                Remove
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .filter((item) => item.bank === bank)
              .map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.value}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell
                    sx={{
                      display: !transactionDeleteMode ? "none" : null,
                      padding: 0,
                    }}
                  >
                    <Button onClick={() => handleDelete(transaction._id)}>
                      <DeleteForeverIcon
                        sx={{
                          margin: 0,
                          fontSize: 20,
                          padding: 0,
                        }}
                        color="error"
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Button
          color={transactionDeleteMode ? "error" : "primary"}
          onClick={() =>
            dispatch(setTransactionDeleteMode(!transactionDeleteMode))
          }
        >
          {transactionDeleteMode ? "hide delete button" : "show delete option"}
        </Button>
        <AddTransaction bank={bank} user={user?.nickname} />
      </TableContainer>
    </Box>
  );
};

export default Page;
