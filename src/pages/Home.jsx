// import Grid from "../components/Grid";
// import { ItemModal } from "../components/Modal";
// import Login from "./Login";

// function HomePage() {
//   return (
//     <div className="container mt-3">
//       <Grid />
//       <ItemModal />
//     </div>
//   );
// }



// export default HomePage;

import "./Home.css"; // Adjust the path based on the location of the file
import Grid from "../components/Grid";
import { ItemModal } from "../components/Modal";

function HomePage() {
  return (
    <div className="container mt-3">
      <Grid />
      <ItemModal />
    </div>
  );
}

export default HomePage;
