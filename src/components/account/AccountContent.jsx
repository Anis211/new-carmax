import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

export default function AccountContent({
  user,
  activeTab,
  setError,
  setSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [access, setAccess] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(user);

  useEffect(() => {
    setData(user);
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUser: data,
        }),
      });

      const data1 = await response.json();

      if (!data1.success) {
        setError(data1.error);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
      setEdit(false);
    }
  };

  return (
    <div className="w-full md:w-3/4">
      {activeTab === "personal" && (
        <motion.div
          layout
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-900">
              Personal Information
            </h2>
            <button
              onClick={() => setEdit(!edit)}
              className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={data.firstName}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, firstName: e.target.value }))
                }
                readOnly={!edit}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={data.lastName}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                readOnly={!edit}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={data.email}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                readOnly={!edit}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={data.phone}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, phone: e.target.value }))
                }
                readOnly={!edit}
              />
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={access ? "text" : "password"}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
                  value={data.password}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  readOnly={!edit}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
                  <label class="container">
                    <input
                      type="checkbox"
                      checked={access}
                      onChange={() => setAccess(!access)}
                    />
                    <svg
                      class="eye"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 576 512"
                    >
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                    </svg>
                    <svg
                      class="eye-slash"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 640 512"
                    >
                      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path>
                    </svg>
                  </label>
                </button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {edit && (
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="mt-3 flex justify-start"
                onClick={handleSubmit}
              >
                <button className="bg-gray-800 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition duration-200 cursor-pointer">
                  {loading ? "...loading" : "Update User"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
