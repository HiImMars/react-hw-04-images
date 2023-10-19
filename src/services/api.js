// import axios from 'axios';

// export const fetchImages = async (query, page) => {
//   const { data } = await axios.get(
//     `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   return data;
// };

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '38926821-b8c8002029c81a405b7f36852';

export const getPictures = async (searchValue, page) => {
  return await fetch(
    `${BASE_URL}/?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
