"use client";
import { setAnchorElNav, setAnchorElUser } from "@/redux/budgetSlice";
import { store } from "@/redux/store";

export const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  store.dispatch(setAnchorElNav(event.currentTarget));
};

export const handleCloseNavMenu = () => {
  store.dispatch(setAnchorElNav(null));
};

export const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  store.dispatch(setAnchorElUser(event.currentTarget));
};

export const handleCloseUserMenu = () => {
  store.dispatch(setAnchorElUser(null));
};
