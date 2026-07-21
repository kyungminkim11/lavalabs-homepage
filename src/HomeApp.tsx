import HomePage from "./pages/HomePage";
import FollowCheckerPage from "./pages/FollowCheckerPage";
import FollowCheckerAnalyzerPage from "./pages/FollowCheckerAnalyzerPage";
import EmoSeedPage from "./pages/EmoSeedPage";

export default function HomeApp() {
  const path = window.location.pathname;
  if (path.includes("/projects/follow-checker/analyzer/")) return <FollowCheckerAnalyzerPage />;
  if (path.includes("/projects/follow-checker/")) return <FollowCheckerPage />;
  if (path.includes("/projects/emoseed/")) return <EmoSeedPage />;
  return <HomePage />;
}
