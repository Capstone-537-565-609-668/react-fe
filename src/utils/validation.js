import { toast } from "react-toastify";

let toastConfig = {
  autoClose: 3000,
  theme: "dark",
  hideProgressBar: true,
  position: "top-center",
};

const validation = (obj) => {
  if (obj.cardinality <= 0) {
    toast.warn("Invalid Cardinality Value", toastConfig);

    return false;
  } else if (obj.xsize < 0 || obj.ysize < 0) {
    toast.warn("Invalid Canvas Size", toastConfig);
    return false;
  } else if (obj.minvertices < 3) {
    toast.warn("Invalid Lower Bound Vertices", toastConfig);
    return false;
  } else if (obj.irregularity <= 0 || obj.irregularity > 1) {
    toast.warn("Invalid Irregularity Value", toastConfig);
    return false;
  } else if (obj.spikiness <= 0 || obj.spikiness > 1) {
    toast.warn("Invalid Spikiness Value", toastConfig);
    return false;
  }
  toast.success("Successful Submission", toastConfig);
  return true;
};

export default validation;
