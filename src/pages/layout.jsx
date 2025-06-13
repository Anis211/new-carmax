import Navbar from "@/components/Navbar";
import Footer from "@/components/account/AccountFooter";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col bg-white min-h-[100vh]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
