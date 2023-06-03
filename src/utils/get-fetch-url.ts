
/**
 * @description uses query string parameters to create a URL for fetching gif
 * data from Giphy 
 */
export const getFetchURL = ({
  q,
  limit,
  offset,
  API_KEY,
}:{
  q: string
  limit: string
  offset: number
  API_KEY: string
}) => `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${q}&limit=${limit}&offset=${offset}&rating=g&lang=en`
