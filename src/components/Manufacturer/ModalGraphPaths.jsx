import { observer } from "mobx-react";
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import React from "react";
import { pathsStore } from "@store/PathsStore.js";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { GraphCanvas, Sphere } from "reagraph";
import { appStore } from "@store/AppStore.js";

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
}

function latinToEnglish(str) {
  return str.split('').map((char) => {
    if (symbolsMap[char]) {
      return symbolsMap[char];
    }
    return char;
  }).join('');
}

export const ModalGraph = observer(() => {
  const nodes = [];
  for (let city of appStore.cities) {
    const node = {
      id: `${city.id}`,
      label: latinToEnglish(`${city.name}`)
    };
    nodes.push(node);
  }

  const edges = [];
  for (let i = 0; i < manufacturerStore.paths.length; i++) {
    const path = manufacturerStore.paths[i];
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
        <Typography variant="h6" gutterBottom>
          Граф
        </Typography>
        <div style={{
          position: "relative",
          width: "100%",
          height: "90%",
        }}>
          <GraphCanvas
            nodes={nodes}
            edges={edges}
            // layoutType={"forceDirected3d"}
            layoutType={"circular2d"}
            // labelType={"all"}
            edgeArrowPosition={"none"}
            // edgeInterpolation={"curved"}
            renderNode={({
                           id,
                           color,
                           size: nodeSize,
                           active: combinedActiveState,
                           opacity: selectionOpacity,
                           animated,
                           node
                         }) => {
              return (
                <Sphere
                  id={id}
                  size={nodeSize}
                  opacity={selectionOpacity}
                  animated={animated}
                  color={color}
                  node={node}
                  active={combinedActiveState}
                />
              );
            }}
          />
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
