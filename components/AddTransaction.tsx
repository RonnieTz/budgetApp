"use client";

import {
  setTransactionType,
  setTransactionInputName,
  setTransactionInputValue,
} from "@/redux/budgetSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  postTransaction,
  setTransactionAccordion,
  setTransactionDeleteMode,
} from "@/redux/budgetSlice";

const AddTransaction = ({
  bank,
  user,
}: {
  bank: string;
  user: string | undefined;
}) => {
  const {
    transactionType,
    transactionInputName,
    transactionInputValue,
    transactionAccordionExpanded,
  } = useSelector((state: RootState) => state.budget);
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeType = (type: string) => {
    dispatch(setTransactionType(type));
  };

  const handlePostData = () => {
    const data = {
      name: transactionInputName,
      value:
        transactionType === "expense"
          ? Number(transactionInputValue) * -1
          : Number(transactionInputValue),
      bank,
      date: new Date().toLocaleDateString(),
      user,
    };
    dispatch(postTransaction(data));
    dispatch(setTransactionAccordion(false));
  };

  return (
    <Accordion
      expanded={transactionAccordionExpanded}
      sx={{ bgcolor: "transparent", paddingBottom: 5 }}
    >
      <AccordionSummary>
        <Button
          variant="contained"
          disableRipple
          onClick={() =>
            dispatch(setTransactionAccordion(!transactionAccordionExpanded))
          }
        >
          <Typography variant="h6">Add new bank</Typography>
        </Button>
      </AccordionSummary>
      <AccordionDetails sx={{ border: "0.1px solid gray" }}>
        <TextField
          value={transactionInputName}
          onChange={(e) => dispatch(setTransactionInputName(e.target.value))}
          margin="normal"
          variant="outlined"
          size="small"
          type="text"
          placeholder="new transaction..."
        />
        <TextField
          value={transactionInputValue}
          onChange={(e) => dispatch(setTransactionInputValue(e.target.value))}
          sx={{ marginLeft: 3 }}
          margin="normal"
          variant="outlined"
          size="small"
          type="number"
          placeholder="amount..."
        />
        <RadioGroup value={transactionType}>
          <FormLabel>Is this income or spending?</FormLabel>
          <FormControlLabel
            onChange={() => handleChangeType("income")}
            value={"income"}
            label={"Income"}
            control={<Radio size="small" />}
          />
          <FormControlLabel
            onChange={() => handleChangeType("spending")}
            value={"spending"}
            label={"Spending"}
            control={<Radio size="small" />}
          />
        </RadioGroup>
        <Button onClick={handlePostData} variant="outlined">
          Save
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddTransaction;
