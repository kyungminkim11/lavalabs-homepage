import App from "./App";
import HomeApp from "./HomeApp";

export default function Router() {
  const path = window.location.pathname.toLowerCase();
  const staticPage = path.includes("/terms") || path.includes("/privacy") || path.includes("/soft_moon");
  return staticPage ? <App /> : <HomeApp />;
}
