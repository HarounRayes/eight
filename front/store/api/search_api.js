
import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/`;
const searchApi = API_BASE_URL + 'search';

const searchService = {
  search: async (q) => {
    try {
      const url = searchApi;
      const response = await axios.get(url, {
        params: { keyword: q },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching search results:', error);
      throw error;
    }
  },
};

export default searchService;
