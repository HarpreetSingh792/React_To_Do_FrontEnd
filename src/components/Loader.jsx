import BookLoader from "./Book.gif";
import CircleLoader from "./Circles-menu-3.gif";
const Loader = () => {
  return (
    <div className="loading-wrapper">
      <div className="loader">
        <img className="book-gif" src={BookLoader} alt="loader" />
        <img
          className="circles-gif"
          src={CircleLoader}
          alt="loader"
          width={"80px"}
          height={"80px"}
        />
      </div>
    </div>
  );
};
export default Loader;
