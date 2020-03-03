import { API_KEY, PAGE_SIZE } from '../../config';

const TRENDING_URL = 'https://api.giphy.com/v1/gifs/trending';
const SEARCH_URL = 'https://api.giphy.com/v1/gifs/search';

export function fetchGifs(offset, queryString, onSuccess, onFailure) {
  if (!API_KEY) {
    onFailure('Please set API key with REACT_APP_API_KEY env. var.');
    return;
  }

  const isQueryRequest = queryString !== '';
  const url = new URL(isQueryRequest ? SEARCH_URL : TRENDING_URL);
  const params = {
    api_key: API_KEY,
    limit: PAGE_SIZE,
    offset,
  };
  if (isQueryRequest) {
    params.q = queryString;
  }
  url.search = new URLSearchParams(params).toString();

  fetch(url)
    .then(data => data.json())
    .then(json => {
      const fetchedGifs = extractGifs(json);
      onSuccess({
        total: json.pagination.total_count,
        gifs: fetchedGifs,
      });
    })
    .catch(e => {
      onFailure(e);
    });
}

function extractGifs(response) {
  return response.data.map(item => ({
    id: item.id,
    title: item.title,
    fixedHeightGif: item.images.fixed_height,
    originalGif: item.images.original,
  }));
}
