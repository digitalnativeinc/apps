import React, { useEffect, useState, useRef, useReducer } from "react";
import axios from "axios";

const START_FETCHING = "START_FETCHING";
const FINISH_FETCHING = "FINISH_FETCHING";
const RESET = "RESET";

const INITIAL_STATE = {
  loading: false,
  nextPage: 0,
  totalPage: 1,
  data: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case FINISH_FETCHING: {
      return {
        loading: false,
        nextPage: payload.nextPage,
        totalPage: payload.totalPage,
        data: payload.data,
        url: state.url,
      };
    }
  }
};

export default function usePaginatedQuery({ url, initPage = 0, queryParams }) {
  const [state, queryDispatch] = useReducer(reducer, INITIAL_STATE);
  const { loading, nextPage, totalPage, data } = state;

  const buildQueryParamsString = () =>
    queryParams
      ? Object.entries(queryParams).reduce((queryString, entry) => {
          return (queryString += `${entry[0]}=${entry[1]}&`);
        }, "")
      : "";

  // page param can be used to reinitialize
  // when page is not null, totalpage is ignored
  const getData = (page = null) => {
    const _nextPage = page !== null ? page : nextPage;
    if (loading || (page === null && nextPage >= totalPage)) return;

    queryDispatch({ type: START_FETCHING });

    axios
      .get(`${url}?${buildQueryParamsString(queryParams)}page=${_nextPage}`)
      .then((res) => {
        const { content, totalPage } = res.data.result;
        queryDispatch({
          type: FINISH_FETCHING,
          payload: {
            data: content,
            nextPage: _nextPage < totalPage ? _nextPage + 1 : totalPage,
            totalPage,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  return {
    data,
    getData,
    nextPage,
    totalPage,
  };
}
