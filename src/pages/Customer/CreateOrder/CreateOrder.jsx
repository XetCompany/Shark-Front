import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";

export const CreateOrder = observer(() => {
  const [selectedPathId, setSelectedPathId] = useState("");
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    async function fetchPoints() {
      console.log(customerStore.customerSorts, "customerStore.customerSorts");
      const response = await productsApi.getPoints(
        customerStore.customerCurrentPath,
        customerStore.customerSorts,
      );
      customerStore.setCustomerSearchInfo(response.data);
      console.log(response.data, "Информация о доставке загружена");
    }

    fetchPoints();
  }, []);

  const handlePathChange = (event) => {
    const pathId = event.target.value;
    const pathInfo =
      customerStore.customerSearchInfo?.groups_paths
        ?.flatMap((group) => group.paths)
        .find((pathObj) => pathObj.path.id.toString() === pathId) ?? null;

    if (pathInfo) {
      setSelectedPathId(pathId);
      setSelectedPath(pathInfo);
    }
  };

  const handleSubmit = async () => {
    if (selectedPath) {
      // customerStore.setSelectedPath(selectedPath);
      console.log("Сохраненный путь:", selectedPath);
    }
  };

  return (
    <div className="create-order">
      <div>
        {selectedPath && (
          <div>
            <p>
              Выбранный путь: От {selectedPath.path.point_a.name} до{" "}
              {selectedPath.path.point_b.name}
            </p>
            <p>Тип: {selectedPath.path.type}</p>
            <p>Время в пути: {selectedPath.path.time}</p>
            <p>Цена: {selectedPath.path.price}</p>
            <p>Длина: {selectedPath.path.length}</p>
          </div>
        )}
      </div>
      <select value={selectedPathId} onChange={handlePathChange}>
        {customerStore.customerAllPaths?.groups_paths?.flatMap((group) =>
          group.paths.map((pathObj, index) => {
            console.log(pathObj, "pathObj");
            return (
              <option key={index} value={pathObj.path.id}>
                От {pathObj.path.point_a.name} до {pathObj.path.point_b.name},{" "}
                {pathObj.path.type}
              </option>
            );
          }),
        )}
      </select>
      <button onClick={handleSubmit}>Сохранить выбор</button>
    </div>
  );
});
