// import { useContext } from "react";
// import { Item } from "./Item";
// import { ItemsContext } from "../contexts/ItemsProvider";

// const Grid = () => {
//   const { items } = useContext(ItemsContext);

//   return (
//     <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
//   {items.map((item) => {
//     return (
//       <div className="col d-flex justify-content-center" key={item.id}>
//         <Item item={item} />
//       </div>
//     );
//   })}
// </div>

//   );
// };

// export default Grid;



import { useContext } from "react";
import { Item } from "./Item";
import { ItemsContext } from "../contexts/ItemsProvider";

const Grid = () => {
  const { items } = useContext(ItemsContext);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
      {items.map((item) => (
        <div className="col d-flex justify-content-center" key={item.id}>
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};

export default Grid;

