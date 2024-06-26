import { createSelector } from '@reduxjs/toolkit';

export const selectCartItems = state => state.cart.items;
export const selectTotalQuantity = state => state.cart.totalQuantity;
