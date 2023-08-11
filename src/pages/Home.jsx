import { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const onMouseBlobMove = (e) => {
    const blob = document.querySelector(".back-blob");
    const getX = e.pageX;
    const getY = e.pageY;
    // console.log(getY)
    blob.animate({ top: `${getY}px`, left: `${getX}px` }, 1200);
    blob.style.top = `${getY}px`;
    blob.style.left = `${getX}px`;
  };
  document
    .querySelector("#root")
    .addEventListener("mouseMove", onMouseBlobMove);

  const updateHandler = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        { withCredentials: true }
      );
      setRefresh((prev) => !prev);
      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };
  const deleteHandler = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      setRefresh((prev) => !prev);
      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  const inputFocus = (index) => {
    const label = document.getElementsByTagName("label");
    for (let i = 0; i < label.length; i++) {
      if (title || description) break;
      label[i].style.top = "14px";
      label[i].style.left = "14px";
      label[i].style.fontSize = "1rem";
    }
    const labelPos = label[index];
    labelPos.style.top = "-14px";
    labelPos.style.left = "10px";
    labelPos.style.fontSize = "0.8rem";
  };

  const onInputChange = (e, index) => {
    const label = document.getElementsByTagName("label")[index];
    if (!e.target.value) {
      label.style.top = "14px";
      label.style.left = "14px";
      label.style.fontSize = "1rem";
    } else {
      label.style.top = "-14px";
      label.style.left = "10px";
      label.style.fontSize = "0.8rem";
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        { title, description },
        {
          withCredentials: true,
        }
      );
      setRefresh((prev) => !prev);
      toast.success(data.message);
      setIsLoading(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/all/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasksData(res.data.user);
        setIsLoading(false);
        setRefresh((prev) => !prev);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message);
      });
  }, [refresh]);
  return (
    <div className="container" onPointerMove={onMouseBlobMove}>
      <div className="back-blob"></div>
      <div className="blur"></div>
      {!isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <div className="add-task-class">
          <form onSubmit={submitHandler}>
            <h2>Tasks</h2>
            <section>
              <label htmlFor="title">Enter your title </label>
              <input
                type="title"
                value={title}
                name="title"
                onClick={() => {
                  inputFocus(0);
                }}
                onChange={(e) => {
                  setTitle(e.target.value);
                  onInputChange(e, 0);
                }}
                required
              />
            </section>
            <section>
              <label htmlFor="description">Enter your description </label>
              <input
                type="description"
                value={description}
                name="description"
                onClick={() => {
                  inputFocus(1);
                }}
                onChange={(e) => {
                  setDescription(e.target.value);
                  onInputChange(e, 1);
                }}
                required
              />
            </section>
            <section className="btn-link">
              <button
                disabled={isLoading}
                type="submit"
                onClick={() => {
                  setRefresh(true);
                }}
              >
                Add Task
              </button>
            </section>
          </form>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="task-cards">
          {tasksData.map((i) => {
            return (
              <div className="cards" key={i._id}>
                <div className="card-text">
                  <h3>{i.title}</h3>
                  <div className="card-text-p">
                    <p>{i.description}</p>
                  </div>
                  <div className="card-text-and-operations">
                    <p>
                      Created:
                      {" " + new Date(i.createdAt).toLocaleString()}
                    </p>
                    <div className="update-and-del">
                      <div className="checkbox-div">
                        <p>Completed</p>
                        <input
                          disabled={isLoading}
                          type="checkbox"
                          onChange={() => {
                            updateHandler(i._id);
                          }}
                          checked={i.isFinished}
                        />
                      </div>
                      <button
                        disabled={isLoading}
                        onClick={() => {
                          deleteHandler(i._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
