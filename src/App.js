import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(list);
  }
  return [];
};

function App() {
  const [name, setName] = useState("");
  const [lists, setLists] = useState(getLocalStorage());
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "Enter a value");
    } else if (name && isEditing) {
      setLists(
        lists.map((list) => {
          if (list.id === editId) {
            return { ...list, title: name };
          }
          return list;
        })
      );

      showAlert(true, "success", "Grocery updated!");
      setIsEditing(false);
      setName("");
      setEditId("");
    } else {
      setLists([
        ...lists,
        { id: new Date().getTime().toString(), title: name },
      ]);
      setName("");
      showAlert(true, "success", "grocery ADDED to the list!");
    }
  };

  const showAlert = (show = true, status = "", msg = "") => {
    setAlert({ show, status, msg });
  };

  const editGrocery = (id) => {
    setName(lists.filter((list) => list.id === id)[0].title);
    setEditId(id);
    setIsEditing(true);
  };

  const deleteGrocery = (id) => {
    setLists(lists.filter((list) => list.id !== id));
    showAlert(
      true,
      "success",
      `${lists.filter((list) => list.id === id)[0].title} DELETED from the list`
    );
  };

  const clearGroceryList = () => {
    setLists([]);
    showAlert(true, "danger", "Grocery List cleared");
  };

  useEffect(() => {
    const timeout = setTimeout(() => setAlert(false), 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(lists));
  }, [lists]);

  return (
    <>
      <section className="section-center">
        {alert.show && <Alert alert={alert} />}
        <div className="grocery-form">
          <h3>grocery bud</h3>
          <form className="form-control" onSubmit={handleSubmit}>
            <input
              type="text"
              className="grocery"
              placeholder="e.g. cakes"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </form>
        </div>
        <section className="grocery-container">
          {lists.length > 0 && (
            <List
              lists={lists}
              editGrocery={editGrocery}
              deleteGrocery={deleteGrocery}
              clearGroceryList={clearGroceryList}
            />
          )}
        </section>
      </section>
    </>
  );
}

export default App;
