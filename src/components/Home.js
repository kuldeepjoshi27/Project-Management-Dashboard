import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate  } from "react-router-dom";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import { FaChartBar } from "react-icons/fa"; // Import chart icon from react-icons

function Home() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board ? board.columns : [];

  const { state } = useLocation(); // Access the passed state
  const boardName = state?.boardName; // Get the board name
  const navigate = useNavigate();

  return (
    <div className="mt-20 dark:bg-[#20212c] pt-6">
      {/* Header Section with Project Name and Buttons */}
      <div className="flex justify-between items-center mb-4">
        {/* Project Name */}
        <div className="text-xl font-bold ml-5">
          {boardName}
          {/* Fix here to display the correct board name */}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mr-4">
          {/* Add New Task Button */}
          <button
            className="button rounded-xl"
            onClick={() => setIsTaskModalOpen((prevState) => !prevState)}
          >
            + Add New Task
          </button>

          {/* Show Chart Button with Icon */}
          <button
            className="button rounded-xl flex items-center space-x-2"
            onClick={() => navigate("/chart")} // Directly navigate inside the onClick
          >
            <FaChartBar className="h-5 w-5" />
            <span>Show Chart</span>
          </button>
        </div>
      </div>

      {/* Display Columns or Empty Board */}
      <div className="flex justify-center">
        {columns.length > 0 ? (
          <>
            {columns.map((col, index) => (
              <Column key={index} colIndex={index} />
            ))}
          </>
        ) : (
          <EmptyBoard type="edit" />
        )}
      </div>

      {/* Modals */}
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Home;
