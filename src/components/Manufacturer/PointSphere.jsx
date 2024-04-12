import React, { useMemo } from "react";
import { a, useSpring } from "@react-spring/three";
import { animationConfig } from "reagraph";
import { Color, DoubleSide } from "three";
import { POINT_TYPES } from "@common/common.js";
import { observer } from "mobx-react";
import { manufacturerStore } from "@store/ManufacturerStore.js";

export const PointSphere = observer(({ color, id, size, opacity, animated }) => {
  const { scale, nodeOpacity } = useSpring({
    from: {
      // Note: This prevents incorrect scaling w/ 0
      scale: [0.00001, 0.00001, 0.00001],
      nodeOpacity: 0,
    },
    to: {
      scale: [size, size, size],
      nodeOpacity: opacity,
    },
    config: {
      ...animationConfig,
      duration: animated ? undefined : 0,
    },
  });
  const normalizedColor = useMemo(() => new Color(color), [color]);

  const isWarehousePoint = manufacturerStore.getPointByTypeAndCityId(POINT_TYPES.WAREHOUSE, parseInt(id));
  const isPickupPoint = manufacturerStore.getPointByTypeAndCityId(POINT_TYPES.PICKUP_POINT, parseInt(id));

  const RENDER_TYPES = {
    WAREHOUSE: 'warehouse',
    PICKUP_POINT: 'pickup_point',
    DEFAULT: 'default',
    ALL: 'all'
  }

  const renderType = useMemo(() => {
    if (isWarehousePoint && isPickupPoint) {
      return RENDER_TYPES.ALL;
    }
    if (isWarehousePoint) {
      return RENDER_TYPES.WAREHOUSE;
    }
    if (isPickupPoint) {
      return RENDER_TYPES.PICKUP_POINT;
    }
    return RENDER_TYPES.DEFAULT;
  }, [isWarehousePoint, isPickupPoint]);

  const isRender = useMemo(() => {
    if (renderType === RENDER_TYPES.ALL) {
      return true;
    }
    if (renderType === RENDER_TYPES.WAREHOUSE && isWarehousePoint) {
      return true;
    }
    if (renderType === RENDER_TYPES.PICKUP_POINT && isPickupPoint) {
      return true;
    }
    if (renderType === RENDER_TYPES.DEFAULT && !isWarehousePoint && !isPickupPoint) {
      return true;
    }
    return false;
  }, [renderType, isWarehousePoint, isPickupPoint]);

  if (!isRender) {
    return null;
  }

  switch (renderType) {
    case RENDER_TYPES.WAREHOUSE:
      return (
        <a.mesh userData={{ id, type: "node" }} scale={scale} position={[0, 0, 0]} rotation={[1, 1, 0]}>
          <cylinderGeometry attach="geometry" args={[1, 1, 1, 25]} />
          <a.meshStandardMaterial color={normalizedColor} />
        </a.mesh>
      )
    case RENDER_TYPES.PICKUP_POINT:
      return (
        <a.mesh userData={{ id, type: "node" }} scale={scale} position={[0, 0, 0]} rotation={[1, 1, 0]}>
          <dodecahedronGeometry attach="geometry" args={[1, 0]} />
          <a.meshStandardMaterial color={normalizedColor} />
        </a.mesh>
      )
    case RENDER_TYPES.ALL:
      return (
        <a.mesh userData={{ id, type: "node" }} scale={scale} position={[0, 0, 0]} rotation={[1, 1, 0]}>
          <a.mesh position={[0, 0, 1]}>
            <dodecahedronGeometry attach="geometry" args={[1, 0]} />
            <a.meshStandardMaterial color={normalizedColor} />
          </a.mesh>
          <a.mesh position={[0, 0, -1]}>
            <cylinderGeometry attach="geometry" args={[1, 1, 1, 25]} />
            <a.meshStandardMaterial color={normalizedColor} />
          </a.mesh>
        </a.mesh>
      )
    default:
      return (
        <a.mesh userData={{ id, type: "node" }} scale={scale}>
          <sphereGeometry attach="geometry" args={[1, 25, 25]} />
          <a.meshPhongMaterial
            attach="material"
            side={DoubleSide}
            transparent={true}
            fog={true}
            opacity={nodeOpacity}
            color={normalizedColor}
          />
        </a.mesh>
      );

  }

  return (
    <a.mesh userData={{ id, type: "node" }} scale={scale} position={[0, 0, 0]} rotation={[1, 1, 0]}>
      <a.mesh position={[0, 0, 1]}>
        <dodecahedronGeometry attach="geometry" args={[1, 0]} />
        <a.meshStandardMaterial color={normalizedColor} />
      </a.mesh>
      <a.mesh position={[0, 0, -1]}>
        <cylinderGeometry attach="geometry" args={[1, 1, 1, 25]} />
        <a.meshStandardMaterial color={normalizedColor} />
      </a.mesh>
    </a.mesh>
  )

  return (
    <a.mesh userData={{ id, type: "node" }} scale={scale}>
      <sphereGeometry attach="geometry" args={[1, 25, 25]} />
      <a.meshPhongMaterial
        attach="material"
        side={DoubleSide}
        transparent={true}
        fog={true}
        opacity={nodeOpacity}
        color={normalizedColor}
      />
    </a.mesh>
  );
});

PointSphere.defaultProps = {
  opacity: 1,
  active: false,
};


