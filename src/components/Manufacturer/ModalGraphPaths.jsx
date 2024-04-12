import { observer } from "mobx-react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { pathsStore } from "@store/PathsStore.js";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { GraphCanvas } from "reagraph";
import { appStore } from "@store/AppStore.js";
import { makeAutoObservable } from "mobx";
import { PATH_TYPES, PATH_TYPES_RUS, POINT_TYPES } from "@common/common.js";
import PathsApi from "@/api/Manufacturer/PathsApi.js";
import { useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import InfoIcon from "@mui/icons-material/Info";
import { PointSphere } from "@components/Manufacturer/PointSphere.jsx";

const symbolsMap = {
  "а": "a",
  "б": "b",
  "в": "v",
  "г": "g",
  "д": "d",
  "е": "e",
  "ё": "yo",
  "ж": "zh",
  "з": "z",
  "и": "i",
  "й": "j",
  "к": "k",
  "л": "l",
  "м": "m",
  "н": "n",
  "о": "o",
  "п": "p",
  "р": "r",
  "с": "s",
  "т": "t",
  "у": "u",
  "ф": "f",
  "х": "h",
  "ц": "c",
  "ч": "ch",
  "ш": "sh",
  "щ": "shh",
  "ъ": "",
  "ы": "y",
  "ь": "",
  "э": "e",
  "ю": "yu",
  "я": "ya",
  "А": "A",
  "Б": "B",
  "В": "V",
  "Г": "G",
  "Д": "D",
  "Е": "E",
  "Ё": "Yo",
  "Ж": "Zh",
  "З": "Z",
  "И": "I",
  "Й": "J",
  "К": "K",
  "Л": "L",
  "М": "M",
  "Н": "N",
  "О": "O",
  "П": "P",
  "Р": "R",
  "С": "S",
  "Т": "T",
  "У": "U",
  "Ф": "F",
  "Х": "H",
  "Ц": "C",
  "Ч": "Ch",
  "Ш": "Sh",
  "Щ": "Shh",
  "Ъ": "",
  "Ы": "Y",
  "Ь": "",
  "Э": "E",
  "Ю": "Yu",
  "Я": "Ya",
};

function latinToEnglish(str) {
  let formattedText = "";
  for (let i = 0; i < str.length; i++) {
    const symbol = str[i];
    if (symbolsMap[symbol] !== undefined) {
      formattedText += symbolsMap[symbol];
    } else {
      formattedText += symbol;
    }
  }
  return formattedText;
}

class GraphPathsStore {
  pathType = PATH_TYPES.AUTOMOBILE;
  pathTypes = [PATH_TYPES.AUTOMOBILE, PATH_TYPES.AIR, PATH_TYPES.RAILWAY, PATH_TYPES.RIVER, PATH_TYPES.SEA];
  selectedNodeId = null;
  selectedSecondNodeId = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPathType(pathType) {
    this.pathType = pathType;
  }

  setPathTypes(pathTypes) {
    this.pathTypes = pathTypes;
  }

  setSelectedNodeId(selectedNodeId) {
    this.selectedNodeId = selectedNodeId;
  }

  setSelectedSecondNodeId(selectedSecondNodeId) {
    this.selectedSecondNodeId = selectedSecondNodeId;
  }

  setSelecteds(selectedNodeId, selectedSecondNodeId) {
    this.selectedNodeId = selectedNodeId;
    this.selectedSecondNodeId = selectedSecondNodeId;
  }
}

const graphStore = new GraphPathsStore();

export const ModalGraph = observer(() => {
  const nodes = [];
  for (let city of appStore.cities) {
    const node = {
      id: `${city.id}`,
      label: latinToEnglish(`${city.name}`),
    };
    nodes.push(node);
  }

  const edges = [];
  for (let i = 0; i < manufacturerStore.paths.length; i++) {
    const path = manufacturerStore.paths[i];
    if (!graphStore.pathTypes.includes(path.type)) {
      continue;
    }
    const edge = {
      id: `${path.point_a.id}-${path.point_b.id}`,
      source: `${path.point_a.id}`,
      target: `${path.point_b.id}`,
      // label: latinToEnglish(`${path.time}H, ${path.price}R, ${path.length} KM`),
    };
    edges.push(edge);
  }

  return (
    <Modal open={pathsStore.isShowModalGraph} onClose={() => {
      pathsStore.closeModalGraph();
    }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <ModalGraphHeader />
        <div style={{
          position: "relative",
          width: "100%",
          height: "90%",
        }}>
          <GraphCanvasComponent nodes={nodes} edges={edges} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button onClick={() => {
            pathsStore.closeModalGraph();
          }}>Закрыть</Button>
        </div>
      </Box>
    </Modal>
  );
});

const ModalGraphHeader = observer(() => {

  // export const PATH_TYPES = Object.freeze({
  //   AUTOMOBILE: "automobile",
  //   RAILWAY: "railway",
  //   SEA: "sea",
  //   RIVER: "river",
  //   AIR: "air",
  // });

  const isPathTypeSelected = (type) => {
    return graphStore.pathTypes.includes(type);
  };

  const descriptionText = (
    <>
      <Typography variant="h6" gutterBottom>
        Описание
      </Typography>
      <Typography variant="body1" gutterBottom>
        Визуализация маршрутов между городами.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Выберите типы маршрутов, которые вы хотите увидеть на графе.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Выберите тип создания маршрута и кликните на два города, чтобы создать маршрут между ними.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Чтобы удалить маршрут, кликните на два города, между которыми он проходит.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Чтобы перейти к складу города, кликните на город с зажатой клавишей Ctrl.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Чтобы перейти к пункту выдачи города, кликните на город с зажатой клавишей Alt.
      </Typography>
    </>
  );

  return <div style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  }}>
    <div style={{ position: "relative", width: "210px", padding: "10px" }}>
      <Typography variant="h6" gutterBottom>
        Граф Маршрутов
      </Typography>
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        <Tooltip title={descriptionText}>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
    <div>
      <FormControl style={{
        width: 300,
        marginRight: "10px",
      }}>
        <InputLabel id="multiple-checkbox-label">Визуализация Маршрутов</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox-select"
          multiple
          value={graphStore.pathTypes}
          onChange={(event) => {
            const value = event.target.value;
            // Устанавливаем или удаляем выбранные типы
            graphStore.setPathTypes(
              typeof value === "string" ? value.split(",") : value,
            );
          }}
          renderValue={(selected) => selected.map(type => PATH_TYPES_RUS[type]).join(", ")}
          label="Визуализация Маршрутов"
        >
          {Object.values(PATH_TYPES).map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={isPathTypeSelected(type)} />
              <ListItemText primary={PATH_TYPES_RUS[type]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{
        minWidth: "200px",
      }}>
        <InputLabel id="demo-simple-select-label">Тип Создания Маршрута</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={graphStore.pathType}
          label="Тип Создания Маршрута"
          onChange={(event) => {
            graphStore.setPathType(event.target.value);
          }}
        >
          <MenuItem value={PATH_TYPES.AUTOMOBILE}>{PATH_TYPES_RUS[PATH_TYPES.AUTOMOBILE]}</MenuItem>
          <MenuItem value={PATH_TYPES.AIR}>{PATH_TYPES_RUS[PATH_TYPES.AIR]}</MenuItem>
          <MenuItem value={PATH_TYPES.RAILWAY}>{PATH_TYPES_RUS[PATH_TYPES.RAILWAY]}</MenuItem>
          <MenuItem value={PATH_TYPES.RIVER}>{PATH_TYPES_RUS[PATH_TYPES.RIVER]}</MenuItem>
          <MenuItem value={PATH_TYPES.SEA}>{PATH_TYPES_RUS[PATH_TYPES.SEA]}</MenuItem>
        </Select>
      </FormControl>
    </div>
  </div>;
});

const GraphCanvasComponent = observer(({ nodes, edges }) => {
  const routerStore = useRouterStore();

  const handleNodeClick = (params, params1, params2) => {
    const id = params.id;
    // const point = manufacturerStore.getPointById(id);
    if ((params2.altKey || params2.ctrlKey) && (params2.altKey !== params2.ctrlKey)) {
      const pointType = params2.ctrlKey ? POINT_TYPES.WAREHOUSE : POINT_TYPES.PICKUP_POINT;
      const point = manufacturerStore.getPointByTypeAndCityId(pointType, parseInt(id));
      if (point) {
        routerStore.goTo(RoutesEnum.POINT_DETAILS, { params: { id: point.id } });
      }
      return;
    }

    if (graphStore.selectedNodeId === id) {
      graphStore.setSelectedNodeId(null);
    } else {
      if (graphStore.selectedNodeId === null) {
        graphStore.setSelectedNodeId(id);
      } else {
        graphStore.setSelectedSecondNodeId(id);
        const tempSecondSelectedNodeId = id;

        const firstCity = appStore.cities.find(city => city.id === parseInt(graphStore.selectedNodeId));
        const secondCity = appStore.cities.find(city => city.id === parseInt(tempSecondSelectedNodeId));
        if (firstCity && secondCity) {
          const path = manufacturerStore.paths.find(path => {
            return (path.point_a.id === firstCity.id && path.point_b.id === secondCity.id) ||
              (path.point_a.id === secondCity.id && path.point_b.id === firstCity.id);
          });
          if (path) {
            PathsApi.deletePath(path.id).then(() => {
              manufacturerStore.loadPaths();
            });
          } else {
            PathsApi.createPath({
              point_a: firstCity.id,
              point_b: secondCity.id,
              type: graphStore.pathType,
              time: 1,
              price: 100,
              length: 10,
            }).then(() => {
              manufacturerStore.loadPaths();
            });
          }
          graphStore.setSelecteds(null, null);
        } else {
          throw new Error("City not found");
        }

      }
    }
  };

  return (
    <GraphCanvas
      nodes={nodes}
      edges={edges}
      // layoutType={"forceDirected3d"}
      layoutType={"circular2d"}
      // labelType={"all"}
      edgeArrowPosition={"none"}
      // edgeInterpolation={"curved"}
      // layoutType="forceDirected3d"
      onNodeClick={handleNodeClick}
      renderNode={({
                     id,
                     color,
                     size: nodeSize,
                     active: combinedActiveState,
                     opacity: selectionOpacity,
                     animated,
                     node,
                   }) => {
        const params = {
          id,
          size: nodeSize,
          opacity: selectionOpacity,
          animated,
          color: id === graphStore.selectedNodeId || id === graphStore.selectedSecondNodeId ? "#4285b4" : color,
          node,
          active: combinedActiveState,
        };
        return (
          <PointSphere
            {...params}
          />
        );
      }}
    >
      <directionalLight position={[0, 5, 1]} intensity={1} />
    </GraphCanvas>
  );
});
