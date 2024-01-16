import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, orderSort, categoty, search, currentPage } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://654f76e5358230d8f0cd58cf.mockapi.io/items?page=${currentPage}&limit=4&${categoty}&sortBy=${sortBy}&order=${orderSort}${search}`
    )
    return data;
  }
);