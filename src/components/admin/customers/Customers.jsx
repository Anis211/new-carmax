import React, { useState } from "react";
import SearchAndFilters from "./SearchAndFilter";
import CustomersTable from "./CustomersTable";
import CustomerDetailModal from "./CustomerDetailModel";
import EditCustomerModal from "./EditCustomerModal";
import ToastNotification from "@/components/custom/ToesterNotification";
import { AnimatePresence } from "motion/react";

const Customers = ({
  customers,
  getStatusColor,
  setCount,
  setChange,
  total,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customerStatus, setCustomerStatus] = useState("all");
  const [customerType, setCustomerType] = useState("all");
  const [registrationDate, setRegistrationDate] = useState({
    start: "",
    end: "",
  });
  const [purchaseHistory, setPurchaseHistory] = useState("all");
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showPurchaseFilter, setShowPurchaseFilter] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer._id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      customerStatus === "all" || customer.status === customerStatus;
    const matchesType =
      customerType === "all" || customer.type === customerType;
    let matchesPurchase = true;
    if (purchaseHistory !== "all") {
      const totalOrders = customer.totalOrders;
      if (purchaseHistory === "frequent" && totalOrders < 5)
        matchesPurchase = false;
      if (
        purchaseHistory === "occasional" &&
        (totalOrders < 2 || totalOrders >= 5)
      )
        matchesPurchase = false;
      if (purchaseHistory === "one-time" && totalOrders !== 1)
        matchesPurchase = false;
    }
    return matchesSearch && matchesStatus && matchesType && matchesPurchase;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setCustomerStatus("all");
    setCustomerType("all");
    setRegistrationDate({ start: "", end: "" });
    setPurchaseHistory("all");
    setShowStatusFilter(false);
    setShowTypeFilter(false);
    setShowDateFilter(false);
    setShowPurchaseFilter(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        <div className="py-3 px-3">
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            customerStatus={customerStatus}
            setCustomerStatus={setCustomerStatus}
            customerType={customerType}
            setCustomerType={setCustomerType}
            registrationDate={registrationDate}
            setRegistrationDate={setRegistrationDate}
            purchaseHistory={purchaseHistory}
            setPurchaseHistory={setPurchaseHistory}
            showStatusFilter={showStatusFilter}
            setShowStatusFilter={setShowStatusFilter}
            showTypeFilter={showTypeFilter}
            setShowTypeFilter={setShowTypeFilter}
            showDateFilter={showDateFilter}
            setShowDateFilter={setShowDateFilter}
            showPurchaseFilter={showPurchaseFilter}
            setShowPurchaseFilter={setShowPurchaseFilter}
            clearFilters={clearFilters}
          />
          <CustomersTable
            filteredCustomers={filteredCustomers}
            setSelectedCustomer={setSelectedCustomer}
            setShowCustomerDetails={setShowCustomerDetails}
            getStatusColor={getStatusColor}
            setCount={setCount}
            total={total}
            setChange={setChange}
          />
        </div>
      </div>
      <CustomerDetailModal
        showCustomerDetails={showCustomerDetails}
        setShowCustomerDetails={setShowCustomerDetails}
        selectedCustomer={selectedCustomer}
        customers={customers}
        getStatusColor={getStatusColor}
        setShowEditModal={setShowEditModal}
        setEditingCustomer={setEditingCustomer}
      />
      <EditCustomerModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editingCustomer={editingCustomer}
      />
      <AnimatePresence>
        {showToast && <ToastNotification text={"All filters cleared!"} />}
      </AnimatePresence>
    </div>
  );
};

export default Customers;
