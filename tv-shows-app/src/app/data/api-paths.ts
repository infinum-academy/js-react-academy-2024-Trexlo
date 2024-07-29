const api = "https://tv-shows.infinum.academy";
export const apiPaths = {
  registration: `${api}/users`,
  login: `${api}/users/sign_in`,
  allShows: `${api}/shows`,
  topShows: `${api}/shows/top_rated`,
  show: (id:string) => `${api}/shows/${id}`,
  reviews: `${api}/reviews`,
  review: (id:string) => `${api}/reviews/${id}`,
  showReviews: (id:string, page=1, count=20) => `${api}/shows/${id}/reviews?page=${page}&items=${count}`,
  user: `${api}/users/me`,
}
