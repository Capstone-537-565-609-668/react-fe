import React from "react";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const navi = useNavigate();

  const handler = (e) => {
    navi(e.target.value);
  };
  return (
    <div>
      <div className="sticky top-0 p-2">
        <select
          onChange={handler}
          className="block shadow-lg border rounded w-full py-2 mt-10"
        >
          <option value={"/polygon-gen"}>Polygon Generation</option>
          <option value={"/voronoi-point"}>Point Generation - Voronoi</option>
          <option value={"/convex-hull-point"}>
            Point Generation - Convex Hull
          </option>
          <option value={"/realistic-polygon"}>
            Realistic Polygon Generation
          </option>
        </select>
      </div>
    </div>
  );
}

export default Sidebar;
