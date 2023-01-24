class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

  async createPost(post) {
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'post',
        body: JSON.stringify(post),
      });

      const response = await fetch(request);
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }
}

export const apiService = new ApiService(
  'https://wfm-js-43b51-default-rtdb.firebaseio.com/'
);
