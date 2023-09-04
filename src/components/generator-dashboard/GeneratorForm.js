import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const initObj = {
  cardinality: 3,
  xsize: 500,
  ysize: 500,
  minvertices: 3,
  maxvertices: 3,
  irregularity: 0,
  spikiness: 0,
};
const GeneratorForm = ({ setData }) => {
  const [requestData, setRequestData] = useState(initObj);
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [uuid, setUuid] = useState(null);
  const handleChange = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
  };

  const handleDownload = (e) => {
    e.preventDefault();

    //return type is a zip file and make sure to download the zip file

    fetch(`http://localhost:5000/get_file/${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/zip",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("Hereee");
          return res.blob();
        }
        alert("Something went wrong");
      })
      .then((blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${uuid}.zip`;
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading zip file:", error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(requestData);

    setLoading(true);
    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card: requestData.cardinality,
        xsize: requestData.xsize,
        ysize: requestData.ysize,
        vertices_bound: [requestData.minvertices, requestData.maxvertices],
        irregularity_clip: requestData.irregularity,
        spikiness_clip: requestData.spikiness,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUuid(res.dataset_id);
        let temp = JSON.parse(res.for_visualizer);
        console.log(temp.features.map((item) => item.geometry.coordinates[0]));
        setData(temp.features.map((item) => item.geometry.coordinates[0]));
        setLoading(false);
        setHide(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="col-span-1 p-8">
      <h2>
        <span className="text-2xl font-bold">Generator Form</span>
      </h2>
      <div className="flex flex-col p-4 gap-8">
        <label
          className="text-gray-700 text-sm font-bold mb-2"
          htmlFor="cardinality"
        >
          cardinality
          <input
            type="number"
            name="cardinality"
            id="cardinality"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min={1}
            max={1000}
            onChange={handleChange}
            value={requestData.cardinality}
          />
        </label>
        <div className="flex w-full gap-4 items-center">
          <label
            className="text-gray-700 text-sm font-bold mb-2 flex-1"
            htmlFor="xsize"
          >
            xsize
            <input
              type="number"
              name="xsize"
              id="xsize"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={500}
              step={50}
              onChange={handleChange}
              value={requestData.xsize}
            />
          </label>
          <label
            className="text-gray-700 text-sm font-bold mb-2 flex-1"
            htmlFor="ysize"
          >
            ysize
            <input
              type="number"
              name="ysize"
              id="ysize"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={500}
              step={50}
              onChange={handleChange}
              value={requestData.ysize}
            />
          </label>
        </div>

        <div className="flex w-full gap-4 items-center">
          <label
            className="text-gray-700 text-sm font-bold mb-2 flex-1"
            htmlFor="minvertices"
          >
            minvertices
            <input
              type="number"
              name="minvertices"
              id="minvertices"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={3}
              onChange={handleChange}
              value={requestData.minvertices}
            />
          </label>
          <label
            className="text-gray-700 text-sm font-bold mb-2 flex-1"
            htmlFor="maxvertices"
          >
            maxvertices
            <input
              type="number"
              name="maxvertices"
              id="maxvertices"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={3}
              onChange={handleChange}
              value={requestData.maxvertices}
            />
          </label>
        </div>

        <div className="flex w-full gap-4 items-center">
          <label
            className="text-gray-700 text-sm font-bold mb-2 flex-1"
            htmlFor="irregularity"
          >
            irregularity
            <input
              type="number"
              name="irregularity"
              id="irregularity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              max={1}
              min={0}
              onChange={handleChange}
              value={requestData.irregularity}
            />
          </label>
          <label
            className="text-gray-700 text-sm font-bold mb-2 flex-1"
            htmlFor="spikiness"
          >
            spikiness
            <input
              type="number"
              name="spikiness"
              id="spikiness"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={0}
              max={1}
              onChange={handleChange}
              value={requestData.spikiness}
            />
          </label>
        </div>
        <div className="flex gap-4 ">
          <button
            onClick={handleSubmit}
            className="bg-black text-white flex rounded-md px-4 py-2 text-sm hover:bg-slate-400 disabled:bg-slate-400 disabled:text-black"
            disabled={loading}
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            Generate
          </button>
          {hide && (
            <button
              onClick={handleDownload}
              className="bg-green-700 text-white flex rounded-md px-4 py-2 text-sm hover:bg-green-400 disabled:bg-green-400 disabled:text-white"
            >
              Download CSV
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratorForm;
