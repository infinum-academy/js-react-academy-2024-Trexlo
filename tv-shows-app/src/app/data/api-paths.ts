const api = "https://tv-shows.infinum.academy";
export const apiPaths = {
  registration: `${api}/users`,
  login: `${api}/users/sign_in`,
  allShows: `${api}/shows`,
  topShows: `${api}/shows/top_rated`,
  show: (id:string) => `${api}/shows/${id}`,
}
