import { observer } from "mobx-react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { pathsStore } from "@store/PathsStore.js";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { GraphCanvas, Sphere } from "reagraph";
import { appStore } from "@store/AppStore.js";
import { makeAutoObservable } from "mobx";
import { PATH_TYPES, PATH_TYPES_RUS } from "@common/common.js";
import PathsApi from "@/api/Manufacturer/PathsApi.js";

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
  return str.split("").map((char) => {
    if (symbolsMap[char]) {
      return symbolsMap[char];
    }
    return char;
  }).join("");
}

class GraphPathsStore {
  pathType = PATH_TYPES.AIR;
  pathTypes = [PATH_TYPES.AIR, PATH_TYPES.AUTOMOBILE, PATH_TYPES.RAILWAY, PATH_TYPES.RIVER, PATH_TYPES.SEA];
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
      label: latinToEnglish(`${path.time}H, ${path.price}R, ${path.length} KM`),
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

  return <div style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  }}>
    <Typography variant="h6" gutterBottom>
      Граф
    </Typography>
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
          <MenuItem value={PATH_TYPES.AIR}>{PATH_TYPES_RUS[PATH_TYPES.AIR]}</MenuItem>
          <MenuItem value={PATH_TYPES.AUTOMOBILE}>{PATH_TYPES_RUS[PATH_TYPES.AUTOMOBILE]}</MenuItem>
          <MenuItem value={PATH_TYPES.RAILWAY}>{PATH_TYPES_RUS[PATH_TYPES.RAILWAY]}</MenuItem>
          <MenuItem value={PATH_TYPES.RIVER}>{PATH_TYPES_RUS[PATH_TYPES.RIVER]}</MenuItem>
          <MenuItem value={PATH_TYPES.SEA}>{PATH_TYPES_RUS[PATH_TYPES.SEA]}</MenuItem>
        </Select>
      </FormControl>
    </div>
  </div>;
});

const GraphCanvasComponent = observer(({ nodes, edges }) => {
  return <GraphCanvas
    nodes={nodes}
    edges={edges}
    // layoutType={"forceDirected3d"}
    layoutType={"circular2d"}
    // labelType={"all"}
    edgeArrowPosition={"none"}
    // edgeInterpolation={"curved"}
    onNodeClick={
      ({ id }) => {
        if (graphStore.selectedNodeId === id) {
          graphStore.setSelectedNodeId(null);
        } else {
          if (graphStore.selectedNodeId === null) {
            graphStore.setSelectedNodeId(id);
          } else {
            graphStore.setSelectedSecondNodeId(id);
            const tempSecondSelectedNodeId = id;

            const firstPoint = appStore.cities.find(city => city.id === parseInt(graphStore.selectedNodeId));
            const secondPoint = appStore.cities.find(city => city.id === parseInt(tempSecondSelectedNodeId));
            if (firstPoint && secondPoint) {
              const path = manufacturerStore.paths.find(path => {
                return (path.point_a.id === firstPoint.id && path.point_b.id === secondPoint.id) ||
                  (path.point_a.id === secondPoint.id && path.point_b.id === firstPoint.id);
              });
              if (path) {
                PathsApi.deletePath(path.id).then(() => {
                  manufacturerStore.loadPaths();
                });
              } else {
                PathsApi.createPath({
                  point_a: firstPoint.id,
                  point_b: secondPoint.id,
                  type: graphStore.pathType,
                  time: 0,
                  price: 0,
                  length: 0,
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
      }
    }
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
        <Sphere
          {...params}
        />
      );
    }}
  />;
});
