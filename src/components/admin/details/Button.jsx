const Button = ({ type, variant, children, onClick }) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
