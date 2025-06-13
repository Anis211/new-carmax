import useUser from "@/zustand/user";
import { useRouter } from "next/router";

export default function AccountSidebar({ activeTab, setActiveTab, user }) {
  const clearUser = useUser((state) => state.clearUser);
  const router = useRouter();

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user,
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Sign Out failed:", error);
    }

    clearUser();
    router.push("/");
  };

  return (
    <div className="w-full md:w-1/4">
      <div className="bg-gray-50 p-6 rounded-lg">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab("personal")}
              className={`w-full text-left py-2 px-3 rounded-md cursor-pointer whitespace-nowrap ${
                activeTab === "personal"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <i className="far fa-user mr-3"></i>
              Personal Information
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
              <i className="fas fa-box mr-3"></i>
              Order History
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`w-full text-left py-2 px-3 rounded-md cursor-pointer whitespace-nowrap ${
                activeTab === "wishlist"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <i className="far fa-heart mr-3"></i>
              Saved Items
            </button>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-md cursor-pointer whitespace-nowrap"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
