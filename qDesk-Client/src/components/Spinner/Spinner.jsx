import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-307px)]">
      <ClipLoader size={50} color={"#111827"} />
    </div>
  );
};

export default Spinner;