// key to access Giphy api
export const API_KEY = process.env.REACT_APP_API_KEY;
// how many items to fetch in one request to Giphy API
export const PAGE_SIZE = 50;
// max distance between a GIF and the viewport in pixels before
// loading GIFs data (lazy loading)
export const VIEWPORT_LOADING_MARGIN = 500;
// max number of gifs to fetch simultaneously
// small number leads to more consistent, but slow loading
// high number,in contrast, causes notable "holes" in the gif grid, and
// also Giphy server may reject too many parallel requests
export const MAX_GIFS_CONCURRENT_REQUESTS = 5;
