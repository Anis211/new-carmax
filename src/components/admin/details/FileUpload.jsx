const FileUpload = ({ label, setImages }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setImages(files);

    console.log("Selected Images:", files);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-2"></i>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
            >
              <span>Upload files || </span>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
