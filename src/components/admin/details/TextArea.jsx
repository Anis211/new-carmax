const TextAreaField = ({ label, id, value, onChange, rows }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      ></textarea>
    </div>
  );
};

export default TextAreaField;
