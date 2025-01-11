import { Link } from "react-router-dom";
import MyButton from "../MyButton/MyButton";


const Slide = ({ img, title, btnText }) => {
  return (
    <header>
      <div className="w-full bg-center bg-cover h-[38rem]" style={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-white lg:text-4xl">{title}</h1>
            <Link to="/add-job">
              <MyButton btnText={btnText}></MyButton>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Slide;