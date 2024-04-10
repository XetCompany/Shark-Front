import { Button } from "@components/Button/Button.jsx";

export const AddToCartButtons = ({
  count,
  decrementCount,
  incrementCount,
  handleAddToCart,
}) => {
  return (
    <div className="product-control">
      {count > 1 ? (
        <>
          <Button className="control-btn" onClick={decrementCount}>
            -
          </Button>
          <span className="product-count">{count}</span>
          <Button className="control-btn" onClick={incrementCount}>
            +
          </Button>
        </>
      ) : (
        <Button className="add-to-cart-btn" onClick={handleAddToCart}>
          Добавить в корзину
        </Button>
      )}
    </div>
  );
};