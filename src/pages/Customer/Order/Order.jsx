import { useEffect } from "react";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";

export const Order = () => {
  useEffect(() => {
    async function fetchOrder() {
      const response = await productsApi.orders();
      customerStore.setCustomerOrders(response.data);
      console.log(response.data, "Заказы загружены");
    }

    fetchOrder();
  }, []);

  return (
    <div className="order">
      {customerStore.customerOrders.length > 0 ? (
        customerStore.customerOrders.map((order) => (
          <div key={order.id}>
            <h2>Order ID: {order.id}</h2>
            <p>Status: {order.status}</p>
            <p>Decline Reason: {order.decline_reason}</p>

            <h3>Products:</h3>
            {order.products.map((productOrder) => (
              <div key={productOrder.id}>
                <p>Product ID: {productOrder.products.id}</p>
                <ul>
                  <li>Name: {productOrder.products.name}</li>
                  <li>Price: {productOrder.products.price}</li>
                </ul>
                <p>Count: {productOrder.count}</p>
              </div>
            ))}

            <h3>Group Paths:</h3>
            {order.group_paths.map((groupPath) => (
              <div key={groupPath.id}>
                <p>Warehouse: {groupPath.warehouse}</p>
                <p>Count: {groupPath.count}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};
