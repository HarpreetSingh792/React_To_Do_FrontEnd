import { useContext } from "react";
import BookLightTheme from "./Book.gif";
import BookDarkTheme from "./Book-DarkTheme.gif";
import CircleLightTheme from "./Circle.gif";
import CircleDarkTheme from "./Circle-DarkTheme.gif";
import { Context } from "../main";
const Loader = () => {
  const {toastTheme} = useContext(Context);
  return (
    <div className="loading-wrapper">
      <div className="loader">
        <img className="book-gif" src={toastTheme?BookDarkTheme:BookLightTheme} alt="loader" />
        <img
          className="circles-gif"
          src={toastTheme?CircleDarkTheme:CircleLightTheme}
          alt="loader"
          width={"80px"}
          height={"80px"}
        />
      </div>
    </div>
  );
};
export default Loader;
