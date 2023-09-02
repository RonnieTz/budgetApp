"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
type stateType = {
  anchorElNav: null | HTMLElement;
  anchorElUser: null | HTMLElement;
  drawerVisible: boolean;
  banks: {
    name: string;
    type: "Current Bank Account" | "Credit Account";
    user: string;
    _id: string;
  }[];
  bankInput: string;
  bankType: string;
  accordionExpanded: boolean;
  bankEditMode: boolean;
  transactions: {
    name: string;
    value: number;
    user: string;
    date: string;
    bank: string;
    _id: string;
  }[];
  transactionType: "income" | "expense";
  transactionInputName: string;
  transactionInputValue: number | "";
  transactionAccordionExpanded: boolean;
  transactionDeleteMode: boolean;
};
const initialState: stateType = {
  anchorElNav: null,
  anchorElUser: null,
  drawerVisible: false,
  banks: [],
  bankInput: "",
  bankType: "Current Bank Account",
  accordionExpanded: false,
  bankEditMode: false,
  transactions: [],
  transactionType: "income",
  transactionInputName: "",
  transactionInputValue: "",
  transactionAccordionExpanded: false,
  transactionDeleteMode: false,
};

export const fetchBanks = createAsyncThunk(
  "budget/fetchBanks",
  async (user: string | undefined) => {
    try {
      const res = await axios.get(`/api/bank?user=${user}`);

      return res.data;
    } catch (err: any) {
      return err.message;
    }
  }
);
type PostBankType = { name: string; type: string; user: string | undefined };
export const postBank = createAsyncThunk(
  "budget/postBank",
  async (data: PostBankType) => {
    try {
      const res = await axios.post("/api/bank", data);
      return res.data;
    } catch (err: any) {
      return err.message;
    }
  }
);

export const deleteBank = createAsyncThunk(
  "badget/deleteBank",
  async (id: string) => {
    try {
      const res = await axios.delete(`/api/bank?id=${id}`);
      return res.data;
    } catch (err: any) {
      return err.message;
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "budget/fetchTransactions",
  async (user: string | undefined) => {
    try {
      const res = await axios.get(`/api/transaction?user=${user}`);
      return res.data;
    } catch (err: any) {
      return err.message;
    }
  }
);
type postData = {
  name: string;
  value: number;
  user: string | undefined;
  date: string;
  bank: string;
};
export const postTransaction = createAsyncThunk(
  "budget/postTransaction",
  async (data: postData) => {
    try {
      const res = await axios.post("/api/transaction", data);
      return res.data;
    } catch (err: any) {
      return err.message;
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "budget/deleteTransaction",
  async (id: string) => {
    try {
      const res = await axios.delete(`/api/transaction?id=${id}`);
      return res.data;
    } catch (err: any) {
      return err.message;
    }
  }
);

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setAnchorElNav: (state, action) => {
      state.anchorElNav = action.payload;
    },
    setAnchorElUser: (state, action) => {
      state.anchorElUser = action.payload;
    },
    setDrawerVisible: (state, action) => {
      state.drawerVisible = action.payload;
    },
    setBankInput: (state, action) => {
      state.bankInput = action.payload;
    },
    setBankType: (state, action) => {
      state.bankType = action.payload;
    },
    setAccordionExpanded: (state, action) => {
      state.accordionExpanded = action.payload;
    },
    setBankEditMOde: (state, action) => {
      state.bankEditMode = action.payload;
    },
    setTransactionType: (state, action) => {
      state.transactionType = action.payload;
    },
    setTransactionInputName: (state, action) => {
      state.transactionInputName = action.payload;
    },
    setTransactionInputValue: (state, action) => {
      state.transactionInputValue = action.payload;
    },
    setTransactionAccordion: (state, action) => {
      state.transactionAccordionExpanded = action.payload;
    },
    setTransactionDeleteMode: (state, action) => {
      state.transactionDeleteMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBanks.fulfilled, (state, action) => {
      state.banks = action.payload;
    });
    builder.addCase(postBank.fulfilled, (state, action) => {
      state.banks.push(action.payload);
    });
    builder.addCase(deleteBank.fulfilled, (state, action) => {
      state.banks = action.payload;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addCase(postTransaction.fulfilled, (state, action) => {
      state.transactions.push(action.payload);
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.filter(
        (item) => item._id !== action.payload._id
      );
    });
  },
});

export const {
  setAnchorElNav,
  setAnchorElUser,
  setDrawerVisible,
  setBankInput,
  setBankType,
  setAccordionExpanded,
  setBankEditMOde,
  setTransactionType,
  setTransactionInputName,
  setTransactionInputValue,
  setTransactionAccordion,
  setTransactionDeleteMode,
} = budgetSlice.actions;
export default budgetSlice.reducer;
