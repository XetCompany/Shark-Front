import { observer } from "mobx-react";
import "./Products.css";
import { useEffect } from "react";

// const productExample = {
//   id: 0,
//   company: {
//     id: 0,
//     username: "string",
//     email: "user@example.com",
//     groups: [0],
//   },
//   evaluations: [
//     {
//       id: 0,
//       evaluation: 9223372036854776000,
//       comment: "string",
//     },
//   ],
//   name: "string",
//   photo: "string",
//   price: "-",
//   sizes: "string",
//   weight: "57040918",
//   description: "string",
//   is_available: true,
//   category: 0,
// };

export const Products = observer(({ products }) => {
  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img
            src={product.photo}
            alt={product.name}
            className="product-photo"
          />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Weight: {product.weight}</p>
          </div>
        </div>
      ))}
    </div>
  );
});
