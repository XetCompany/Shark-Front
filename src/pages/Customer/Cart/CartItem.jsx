import React from "react";
import { MEDIA_URL } from "@/api/constants.js";
import { Button } from "@components/Button/Button.jsx";
import trash from "./trash.svg";
import "./Cart.css";

export const CartItem = ({
  item,
  onQuantityChange,
  onRemove,
  onProductClick,
}) => {
  return (
    <li>
      <div className="cart-item">
        <img
          src={
            item.product.photo
              ? `${MEDIA_URL}${item.product.photo}`
              : "https://www.interra-rus.com/storage/media/default.png"
          }
          width="150px"
          height="150px"
          alt={item.product.name}
          className="product-photo"
        />
        <div className="cart-item-details">
          <p onClick={() => onProductClick(item.product.id)}>
            {item.product.name}
          </p>
          <span
            onClick={() => onProductClick(item.product.id)}
            className="cart-item-price"
          >
            {item.product.price} руб.
          </span>
          <div className="cart-item-quantity">
            <Button
              className="control-btn"
              onClick={() => onQuantityChange(item.product.id, item.count + 1)}
            >
              +
            </Button>
            <span className="product-count">{item.count}</span>
            <Button
              className="control-btn"
              onClick={() => onQuantityChange(item.product.id, item.count - 1)}
            >
              -
            </Button>
            <Button
              className="remove-from-cart"
              onClick={() => onRemove(item.product.id)}
            >
              <img className="trash" src={trash} alt="trash" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};
