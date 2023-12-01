import GeneratorDashboard from "./components/generator-dashboard";
import PointVor from "./components/generator-point-vor";
import PointHull from "./components/generator-point-hull";
import RealisticPoly from "./components/generator-realistic-poly";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div>
          <Routes>
            <Route exact path="/polygon-gen" element={<GeneratorDashboard />} />
            <Route exact path="/convex-hull-point" element={<PointHull />} />
            <Route exact path="/voronoi-point" element={<PointVor />} />
            <Route
              exact
              path="/realistic-polygon"
              element={<RealisticPoly />}
            />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;

// <div className="flex">
// <div>
//   <div className="bg-slate-100 min-h-screen">
//     {/* <h1 className="text-xl"></h1> */}

//     <select onChange={handleChange_gen} className="mt-10">
//       <option value={"poly"}>Polygon Generation</option>
//       <option value={"point_vor"}>Point Generation - Voronoi</option>
//       <option value={"point_hull"}>
//         Point Generation - Convex Hull
//       </option>
//       <option value={"realistic_poly"}>
//         Realistic Polygon Generation
//       </option>
//     </select>
//   </div>
// </div>

//       <div className="text-4xl ">
//         {algorithm === "poly" && <GeneratorDashboard />}
//         {algorithm === "point_vor" && <PointVor />}
//         {algorithm === "point_hull" && <PointHull />}
//         {algorithm === "realistic_poly" && <RealisticPoly />}
//       </div>
//     </div>
