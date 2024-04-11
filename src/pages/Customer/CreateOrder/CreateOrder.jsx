import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";

export const CreateOrder = observer(() => {
  const [selectedPathId, setSelectedPathId] = useState("");

  useEffect(() => {
    async function fetchPoints() {
      const response = await productsApi.getPoints(
        customerStore.customerCurrentPath,
      );
      customerStore.setCustomerSearchInfo(response.data);
      console.log(response.data, "Информация о доставке загружена");
    }

    fetchPoints();
  }, []);

  const handlePathChange = (event) => {
    setSelectedPathId(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("Выбранный путь:", selectedPathId);
  };

  return (
    <div className="create-order">
      <select value={selectedPathId} onChange={handlePathChange}>
        {customerStore.customerAllPaths?.groups_paths.flatMap((group) =>
          group.paths.map((pathObj, index) => (
            <option key={index} value={pathObj.path.id}>
              От {pathObj.path.point_a.name} до {pathObj.path.point_b.name},{" "}
              {pathObj.path.type}
            </option>
          )),
        )}
      </select>
      <button onClick={handleSubmit}>Сохранить выбор</button>
    </div>
  );
});
