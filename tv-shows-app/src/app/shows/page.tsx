import { ShowsListContainer } from "@/components/features/shows/ShowsListContainer/ShowsListContainer";
import { apiPaths } from "../data/api-paths";

export default function AllShowsPage() {
  return <ShowsListContainer url={apiPaths.allShows}/>
}
