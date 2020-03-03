import { configureStore } from '@reduxjs/toolkit';

import gifs from './features/gif/gifReducer';

export default configureStore({
  reducer: {
    gifs,
  },
});
