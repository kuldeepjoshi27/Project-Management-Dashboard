import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import boardIcon from "../assets/icon-board.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

function Dashboard() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState({});
  const [boardType, setBoardType] = useState("add");
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector((state) => state.boards);

  const handleBoardClick = (index) => {
    dispatch(boardsSlice.actions.setBoardActive({ index }));
    const boardName = boards[index].name;
    navigate(`/project/${boardName}`);
  };

  const toggleMenu = (index) => {
    setIsElipsisMenuOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleDelete = () => {
    if (selectedBoardIndex !== null) {
      dispatch(boardsSlice.actions.deleteBoard({ index: selectedBoardIndex }));
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="bg-[#f4f7fd] my-20 dark:bg-[#20212c] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 dark:text-white">
          All Projects ({boards.length})
        </h1>

        <div
          className="flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7]"
          onClick={() => {
            setBoardType("add");
            setIsBoardModalOpen(true);
          }}
        >
          <img src={boardIcon} className="filter-white h-4" alt="New project" />
          <p className="text-lg font-bold">Create New Project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#2b2c37] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 relative cursor-pointer group"
            >
              {/* Board Name Click */}
              <div onClick={() => handleBoardClick(index)}>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={boardIcon}
                    className="h-6 w-6 filter-white"
                    alt="Board icon"
                  />
                  <h2 className="text-xl font-bold dark:text-white group-hover:text-[#635fc7] transition-colors duration-200">
                    {board.name}
                  </h2>
                </div>
              </div>

              {/* Ellipsis Menu */}
              <div className="absolute top-4 right-4">
                <img
                  src={elipsis}
                  alt="ellipsis"
                  className="cursor-pointer h-6"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering card click
                    toggleMenu(index);
                    setSelectedBoardIndex(index);
                  }}
                />
                {isElipsisMenuOpen[index] && (
                  <div className="absolute top-8 right-0 bg-white dark:bg-[#2b2c37] shadow-md rounded-md p-2 w-36">
                    <button
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-[#3b3c47] text-sm"
                      onClick={() => {
                        setBoardType("edit");
                        setIsBoardModalOpen(true);
                      }}
                    >
                      Edit Project
                    </button>
                    <button
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-[#3b3c47] text-sm text-red-500"
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      Delete Project
                    </button>
                  </div>
                )}
              </div>

              {/* Board Details */}
              <div className="space-y-2">
                <p className="text-gray-500 dark:text-gray-400">
                  {board.columns.reduce(
                    (acc, col) => acc + col.tasks.length,
                    0
                  )}{" "}
                  Tasks
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {board.columns.map((column, colIndex) => (
                  <span
                    key={colIndex}
                    className="px-3 py-1 rounded-full text-sm bg-[#635fc71a] text-[#635fc7] dark:bg-[#20212c]"
                  >
                    {column.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {boards.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found. Start by creating a new board.
            </p>
          </div>
        )}
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          type="board"
          title={boards[selectedBoardIndex]?.name || ""}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={handleDelete}
        />
      )}
    </div>
  );
}

export default Dashboard;
