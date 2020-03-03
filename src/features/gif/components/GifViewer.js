import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MAX_GIFS_CONCURRENT_REQUESTS } from '../../../config';

import { fetchGifs } from '../gifApi';
import {
  appendGifs,
  selectGifs,
  setIsFetching,
  setFetchingError,
  selectIsFetching,
  selectCanFetchMore,
  selectQueryString,
  selectTotal,
} from '../gifReducer';

import styles from './GifViewer.module.css';

import GifSearch from './GifSearch';
import Gif from './Gif';
import FullscreenGif from './FullscreenGif';

function requestMoreGifs(dispatch, offset, queryString) {
  const onSuccess = ({ total, gifs }) => {
    dispatch(appendGifs({ total, gifs }));
    dispatch(setIsFetching({ isFetching: false }));
  };
  const onFailure = e => {
    console.error(e);
    dispatch(setFetchingError());
    dispatch(setIsFetching({ isFetching: false }));
  };
  dispatch(setIsFetching({ isFetching: true }));
  fetchGifs(offset, queryString, onSuccess, onFailure);
}

export function GifViewer() {
  const dispatch = useDispatch();
  const gifs = useSelector(selectGifs);
  const isFetching = useSelector(selectIsFetching);
  const canFetchMore = useSelector(selectCanFetchMore);
  const queryString = useSelector(selectQueryString);
  const total = useSelector(selectTotal);
  const [loadedGifsNumber, setLoadedGifsNumber] = useState(0);
  const [fullscreenGif, setFullscreenGif] = useState(null);

  const gifsNumber = gifs.length;

  useEffect(() => {
    // perform initial fetch for the given query string
    if (gifsNumber === 0 && !isFetching && canFetchMore) {
      requestMoreGifs(dispatch, gifsNumber, queryString);
    }
  }, [gifsNumber, isFetching, canFetchMore, dispatch, queryString]);

  useEffect(() => {
    // if query string changed need to reset loaded gifs counter
    setLoadedGifsNumber(0);
  }, [queryString]);

  const incrementLoadedGifsNumber = () => {
    setLoadedGifsNumber(loadedGifsNumber + 1);
  };

  const resultsLabel = queryString === '' ? 'trending' : `"${queryString}"`;
  let resultsText = `Showing ${resultsLabel} GIFs`;
  if (total != null) {
    resultsText += `: ${gifsNumber} out of ${total}`;
  }

  let loadingIndicatorText = null;
  if (isFetching) {
    loadingIndicatorText = 'Loading...';
  } else if (total === gifsNumber) {
    loadingIndicatorText = 'No more results.';
  }

  return (
    <div className={styles.gifsOuterContainer}>
      <FullscreenGif
        gif={fullscreenGif}
        onClose={() => setFullscreenGif(null)}
      />
      <h1>Small Giphy Browser</h1>
      <GifSearch />
      <div className={styles.gifsContainer}>
        <div className={styles.gifsSearch}>
          <i>{resultsText}</i>
        </div>
        {gifs.map((gif, index) => (
          <div
            key={gif.id}
            className={styles.gifWrapper}
            onClick={() => setFullscreenGif(gif)}
          >
            <Gif
              gif={gif}
              blockLoading={
                index >= loadedGifsNumber + MAX_GIFS_CONCURRENT_REQUESTS
              }
              onInView={
                // Fetch more gifs when the last gif becomes close to the viewport
                index === gifs.length - 1 && !isFetching && canFetchMore
                  ? requestMoreGifs.bind(
                      null,
                      dispatch,
                      gifsNumber,
                      queryString
                    )
                  : undefined
              }
              onGifLoad={incrementLoadedGifsNumber}
            />
          </div>
        ))}
        {loadingIndicatorText && (
          <div className={styles.loadingIndicator}>
            <h2>{loadingIndicatorText}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
