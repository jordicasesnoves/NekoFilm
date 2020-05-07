import React from "react";

const default_classes =
  "shadow rounded focus:outline-none focus:shadow-outline px-4 h-10 duration-200 transition-all";

const colors = {
  primary: "text-white bg-indigo-500 hover:bg-indigo-700",
  secondary:
    "text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-white border border-indigo-500",
  red: "text-white bg-red-600 hover:bg-red-700",
};

export const Button = ({
  children,
  loading = false,
  type = "button",
  fullWidth = false,
  className,
  color = "primary",
  ...props
}) => {
  // Dynamic TailwindCSS classes
  className = [
    default_classes,
    colors[color],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  return (
    <button {...props} className={className} type={type}>
      {loading ? (
        <div className="items-center flex">
          <div className="flex-1">
            <svg
              className="w-10 h-10 mx-auto"
              version="1.1"
              id="L4"
              x="0px"
              y="0px"
              viewBox="0 0 50 100"
            >
              <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.1"
                />
              </circle>
              <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.2"
                />
              </circle>
              <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.3"
                />
              </circle>
            </svg>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
