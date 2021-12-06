import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ lists, editGrocery, deleteGrocery, clearGroceryList }) => {
  return (
    <>
      {lists.map((list) => {
        const { id, title } = list;
        return (
          <div className="grocery-item">
            {title}
            <div>
              <button className="edit-btn" onClick={() => editGrocery(id)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => deleteGrocery(id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
      <button className="clear-btn" onClick={() => clearGroceryList()}>
        clear items
      </button>
    </>
  );
};

export default List;
