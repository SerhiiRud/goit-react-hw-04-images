import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const USER_KEY = '34317827-ccdab7647b739ba94e7a7be8e';
const PARAMETERS = '&image_type=photo&orientation=horizontal&per_page=12';

export async function getImages(searchTerm, page, signal) {
  try {
    const images = await axios.get(
      `${BASE_URL}?key=${USER_KEY}&page=${page}&q=${searchTerm}${PARAMETERS}`,
      signal
    );
    return images;
  } catch (error) {
    console.log(error.message);
  }
}
