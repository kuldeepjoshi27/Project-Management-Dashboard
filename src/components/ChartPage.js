import React from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2"; // Import Pie chart from chart.js
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const ChartPage = () => {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board ? board.columns : [];

  const navigate = useNavigate(); // Call useNavigate at the top level

  if (!columns.length) {
    return <div>Loading...</div>;
  }

  // Initialize task counts for each status
  const taskCounts = {
    todoCount: 0,
    inProgressCount: 0,
    doneCount: 0,
  };

  // Loop through the columns to count tasks for each status
  columns.forEach((column) => {
    column.tasks.forEach((task) => {
      if (task.status === "Todo") {
        taskCounts.todoCount += 1;
      } else if (task.status === "In Progress") {
        taskCounts.inProgressCount += 1;
      } else if (task.status === "Done") {
        taskCounts.doneCount += 1;
      }
    });
  });

  // Pie chart data configuration
  const chartData = {
    labels: ["Todo", "In Progress", "Done"],
    datasets: [
      {
        data: [
          taskCounts.todoCount,
          taskCounts.inProgressCount,
          taskCounts.doneCount,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)", // Darker red for Todo
          "rgba(54, 162, 235, 0.7)", // Darker blue for In Progress
          "rgba(75, 192, 192, 0.7)", // Darker green for Done
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Dark red border for Todo
          "rgba(54, 162, 235, 1)", // Dark blue border for In Progress
          "rgba(75, 192, 192, 1)", // Dark green border for Done
        ],
        borderWidth: 2, // Slightly thicker border for better visibility
      },
    ],
  };

  // Back button click handler
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="chart-page-container">
      <h1>Chart Page</h1>

      {/* Pie Chart */}
      <div className="pie-chart-container mt-20">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Allow custom width and height
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
          width={400} // Set a smaller width (adjust as needed)
          height={400} // Set a smaller height (adjust as needed)
        />
      </div>
      {board && (
        <div className="project-name-container text-center mt-10">
          <hr className="mb-2 border-gray-200" />{" "}
          {/* Line above the project name */}
          <h2 className="text-lg font-semibold text-gray-700">Figure: Pie Chart for {board.name}</h2>
          <hr className="mt-2 border-gray-200" />{" "}
          {/* Line below the project name */}
        </div>
      )}
      <div className="back-button-container mt-4 flex justify-center">
        <button
          className="back-button px-6 py-2 rounded-md text-white bg-purple-700 hover:bg-purple-600 shadow-md transition duration-200 mb-10"
          onClick={handleBack}
        >
          Back to Tasks
        </button>
      </div>
    </div>
  );
};

export default ChartPage;
