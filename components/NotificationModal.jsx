import React from "react";

const NotificationModal = ({ data }) => {
  console.log(data, "inm");
  return (
    <div>
      <div
        id="notification-modal"
        tabIndex="-1"
        className="fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-lg transition-transform transform translate-x-0"
      >
        <div className="relative p-4 h-full overflow-y-auto">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() =>
                document
                  .getElementById("notification-modal")
                  .classList.toggle("hidden")
              }
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center bg-green-200 rounded-md">
              <h1 className="text-3xl text-green-500">Notifications</h1>
              <div className="mt-4">
                {data.map((notification) => {
                  return <p className="p-1 italic mb-2 mt-2 bg-slate-100 rounded-md text-sm font-semibold w-full">{notification.message}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
