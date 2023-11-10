import React, { useEffect, useRef } from "react";

const PolygonCanvas = ({ dimensions, polygons }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvasRef || !canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    polygons.forEach((polygon) => {
      ctx.beginPath();
      ctx.moveTo(polygon[0][0], polygon[0][1]);

      for (let i = 1; i < polygon.length; i++) {
        ctx.lineTo(polygon[i][0], polygon[i][1]);
      }

      ctx.closePath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [dimensions, polygons]);

  if (!polygons || polygons?.length === 0) {
    return <p>No data</p>;
  }
  return (
    <canvas
      ref={canvasRef}
      className="bg-slate-200"
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default PolygonCanvas;
