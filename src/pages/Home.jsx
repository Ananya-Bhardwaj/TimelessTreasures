import Grid from "../components/Grid";
import { ItemModal } from "../components/Modal";
import Login from "./Login";

function HomePage() {
  return (
    <div className="container mt-3">
      <Login />
      <Grid />
      <ItemModal />
    </div>
  );
}

export default HomePage;
