import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_GIFS_CONTAINER = {
  total: null,
  gifs: [],
};

export const slice = createSlice({
  name: 'gifs',
  initialState: {
    isFetching: false,
    fetchingError: false,
    queryString: '',
    gifsByQueryString: {},
  },
  reducers: {
    appendGifs: (state, action) => {
      const queryString = state.queryString;
      const existing = state.gifsByQueryString[queryString];
      const existingGifs = !existing ? [] : existing.gifs;
      const { total, gifs } = action.payload;
      state.gifsByQueryString[queryString] = {
        total,
        gifs: existingGifs.concat(gifs),
      };
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload.isFetching;
    },
    setQueryString: (state, action) => {
      state.queryString = action.payload.queryString;
    },
    setFetchingError: state => {
      state.fetchingError = true;
    },
  },
});

const getState = state => state.gifs;

const getGifsContainer = state => {
  const { queryString, gifsByQueryString } = getState(state);
  const gifsContainer =
    gifsByQueryString[queryString] || DEFAULT_GIFS_CONTAINER;
  return gifsContainer;
};

export const selectGifs = state => {
  return getGifsContainer(state).gifs;
};
export const selectIsFetching = state => getState(state).isFetching;
export const selectCanFetchMore = state => {
  const { total, gifs } = getGifsContainer(state);
  const { fetchingError } = getState(state);
  return !fetchingError && (total === null || gifs.length < total);
};
export const selectQueryString = state => getState(state).queryString;
export const selectTotal = state => getGifsContainer(state).total;

export const {
  appendGifs,
  setIsFetching,
  setQueryString,
  setFetchingError,
} = slice.actions;

export default slice.reducer;
