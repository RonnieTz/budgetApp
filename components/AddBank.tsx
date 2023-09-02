"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setBankInput, setBankType } from "@/redux/budgetSlice";
import { postBank } from "@/redux/budgetSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { setAccordionExpanded } from "@/redux/budgetSlice";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

const AddBank = () => {
  const { user, isAuthenticated } = useAuth0();
  const { bankInput, bankType, accordionExpanded } = useSelector(
    (state: RootState) => state.budget
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBankInput(event.currentTarget.value));
  };
  const handleBankType = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBankType(event.currentTarget.value));
  };

  const handlePost = () => {
    const data = { name: bankInput, type: bankType, user: user?.nickname };
    if (isAuthenticated) {
      dispatch(postBank(data));
      dispatch(setAccordionExpanded(false));
      dispatch(setBankInput(""));
    }
  };
  return (
    <Accordion expanded={accordionExpanded}>
      <AccordionSummary>
        <Button
          disableRipple
          onClick={() => dispatch(setAccordionExpanded(!accordionExpanded))}
        >
          <Typography variant="h6">Add new bank</Typography>
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          size="small"
          placeholder="bank name..."
          value={bankInput}
          onChange={handleInput}
        />
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={bankType}
            onChange={handleBankType}
          >
            <Box marginTop={5} marginBottom={5}>
              <FormControlLabel
                value="Current Bank Account"
                control={<Radio />}
                label="Current Bank Account"
              />
              <FormControlLabel
                value="Credit Account"
                control={<Radio />}
                label="Credit Account"
              />
            </Box>
            <Button variant="outlined" onClick={handlePost}>
              Save
            </Button>
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddBank;
