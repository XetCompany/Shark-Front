import React from "react";
import { TYPE_PATH_TO_EMOJI } from "@common/common.js";


function formatPaths(paths) {
  const result = [];
  console.log(paths);
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    if (i === 0) {
      if (i === paths.length - 1) {
        result.push(`${path.path.point_a.name} ${TYPE_PATH_TO_EMOJI[path.path.type]} ⇨ ${path.path.point_b.name}`);
      } else {
        result.push(`${path.path.point_a.name} `);
      }
    } else {
      result.push(`${TYPE_PATH_TO_EMOJI[path.path.type]} ⇨ ${path.path.point_b.name}`);
    }
  }

  return result.join("");
}


export const PathsSerializer = ({ paths }) => {
  return (
    <>
      {paths.map((group, idx) => (
        <div key={idx}>
          {formatPaths(group.paths)}
        </div>
      ))}
    </>
  );
};