import { apiPaths } from "@/app/data/api-paths";
import { ShowsListContainer } from "@/components/features/shows/ShowsListContainer/ShowsListContainer";

export default function TopShowsPage() {
  return <ShowsListContainer url={apiPaths.topShows}/>
}

