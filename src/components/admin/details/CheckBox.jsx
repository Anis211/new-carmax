const CheckboxGroup = ({ label, options, selectedOptions, onToggle }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`inline-flex items-center px-3 py-1 border rounded-md text-sm font-medium ${
              selectedOptions.includes(option)
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-300 bg-white text-gray-700"
            } hover:bg-gray-50`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
