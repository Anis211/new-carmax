import useUser from "@/zustand/user";
import { useRouter } from "next/router";

export default function Sidebar({ activeTab, setActiveTab }) {
  const clearUser = useUser((state) => state.clearUser);
  const router = useRouter();

  const handleSignOut = async (e) => {
    e.preventDefault();
    clearUser();
    router.push("/");
  };

  return (
    <div className="w-full md:w-1/4">
      <div className="bg-gray-50 p-6 rounded-lg">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full text-left py-2 px-3 rounded-md cursor-pointer whitespace-nowrap ${
                activeTab === "products"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Products
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left py-2 px-3 rounded-md cursor-pointer whitespace-nowrap ${
                activeTab === "orders"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("customers")}
              className={`w-full text-left py-2 px-3 rounded-md cursor-pointer whitespace-nowrap ${
                activeTab === "customers"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Customers
            </button>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-md cursor-pointer whitespace-nowrap"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
