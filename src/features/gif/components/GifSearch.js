import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setQueryString as setQueryStringGlobal,
  selectIsFetching,
} from '../gifReducer';

export default function GifSearch() {
  const dispatch = useDispatch();
  const [queryString, setQueryString] = useState('');
  const isFetching = useSelector(selectIsFetching);

  const updateQueryString = e => setQueryString(e.target.value);

  const submitQueryString = () => {
    if (!isFetching) {
      dispatch(setQueryStringGlobal({ queryString }));
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      submitQueryString();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={queryString}
        onChange={updateQueryString}
        onKeyPress={handleKeyPress}
        placeholder="Leave empty to find trending GIFs"
      />
      <button onClick={submitQueryString} disabled={isFetching}>
        Search
      </button>
    </div>
  );
}
