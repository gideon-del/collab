import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import React, { memo } from "react";
import Rectangle from "./rectangle";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}
const LayerPreview = ({
  id,
  onLayerPointerDown,
  selectionColor,
}: LayerPreviewProps) => {
  const layer = useStorage((root) => root.layers.get(id));
  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Rectantgle:
      return (
        <Rectangle
          layer={layer}
          id={id}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    default:
      console.warn("Unknown layer type");
      return null;
  }
};
LayerPreview.displayName = "LayerPreview";
export default memo(LayerPreview);
