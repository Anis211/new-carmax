const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  prefix,
  required,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className={`focus:ring-blue-500 focus:border-blue-500 py-3 px-2 block w-full sm:text-sm border-gray-300 rounded-md ${
            prefix ? "pl-7" : ""
          }`}
          required={required}
        />
      </div>
    </div>
  );
};

export default InputField;
