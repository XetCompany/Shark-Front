import { observer } from "mobx-react";
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import React from "react";
import { pathsStore } from "@store/PathsStore.js";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { GraphCanvas } from "reagraph";

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

  // format in manufacturerStore.paths[]
  //     {
  //         "id": 1,
  //         "point_a": {
  //             "id": 1,
  //             "name": "Москва"
  //         },
  //         "point_b": {
  //             "id": 2,
  //             "name": "Санкт-Петербург"
  //         },
  //         "time": 5,
  //         "price": "100.00",
  //         "length": "10.00",
  //         "type": "automobile"
  //     },


  const nodes = [];
  for (let i = 0; i < manufacturerStore.paths.length; i++) {
    const path = manufacturerStore.paths[i];
    const nodeA = {
      id: `${path.point_a.id}`,
      label: latinToEnglish(`${path.point_a.name}`)
    };
    const nodeB = {
      id: `${path.point_b.id}`,
      label: latinToEnglish(`${path.point_b.name}`)
    };
    console.log("nodeA", nodeA, "nodeB", nodeB);
    if (!nodes.find((node) => node.id == nodeA.id)) {
      nodes.push(nodeA);
    }
    if (!nodes.find((node) => node.id == nodeB.id)) {
      nodes.push(nodeB);
    }
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

  // const nodes = [
  //   {
  //     id: '1',
  //     label: '1'
  //   },
  //   {
  //     id: '2',
  //     label: '2'
  //   }
  // ];
  //
  // const edges = [
  //   {
  //     source: '1',
  //     target: '2',
  //     id: '1-2',
  //     label: '1-2'
  //   },
  //   {
  //     source: '2',
  //     target: '1',
  //     id: '2-1',
  //     label: '2-1'
  //   }
  // ];

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
        <Container>
          <GraphCanvas
            nodes={nodes}
            edges={edges}
            // layoutType={"forceDirected3d"}
            layoutType={"circular2d"}
            // labelType={"all"}
            edgeArrowPosition={"none"}
            // edgeInterpolation={"curved"}
            // renderNode
          />
        </Container>
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
