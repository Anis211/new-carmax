import React, { useState } from "react";

const App = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you with auto parts today?",
      isUser: false,
    },
  ]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    try {
      setMessages([...messages, { text: message, isUser: true }]);
      setMessage("");

      const response = await fetch("/api/n8n", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: message }),
      });

      const result = await response.json();
      console.log("Success:", result);

      const res = await fetch("/api/recieveData", {
        method: "POST",
      });

      const data = await res.json();
      if (data.message != undefined) {
        console.log(data);
        setMessages((prev) => [...prev, { text: data.message, isUser: false }]);
      } else {
        setMessages([
          ...messages,
          { text: "Sorry we can't answer on that question?", isUser: false },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDropdownOpen(false);
  };

  const vehicles = [
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative bg-gray-900 rounded-lg overflow-hidden mb-12">
          <div className="relative min-h-[600px]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/background.jpg"
                alt="Luxury Car"
                className="w-full h-full object-cover object-center opacity-30 z-50"
              />
              <div className="absolute inset-0 backdrop-blur-xs bg-opacity-80"></div>
            </div>
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 py-20">
              <div className="flex flex-col items-center justify-center flex-grow">
                <div className="mb-8">
                  <h2 className="text-yellow-400 font-bold mb-1 text-4xl">
                    CARMAX
                  </h2>
                </div>
                <div className="mb-12">
                  <p className="text-gray-200 text-lg mb-6">
                    GET THE BEST AUTO PARTS
                  </p>
                  <h1 className="text-6xl font-bold mb-4 text-white">
                    FOR HUNDREDS
                  </h1>
                  <h1 className="text-6xl font-bold mb-10">
                    OF <span className="text-yellow-400">VEHICLES</span>
                  </h1>
                  <button className="bg-yellow-400 text-black px-10 py-4 rounded-full font-medium hover:bg-yellow-300 transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap text-lg">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    SHOP AUTO PARTS
                  </button>
                </div>
              </div>
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Search Section */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              FIND AUTO PARTS FOR ANY MODEL
            </h2>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Vehicle Selector */}
                <div className="relative">
                  <label className="block text-gray-400 mb-2">
                    Select Vehicle
                  </label>
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded text-left flex justify-between items-center cursor-pointer whitespace-nowrap !rounded-button"
                    >
                      <span>{selectedVehicle || "Choose vehicle brand"}</span>
                      <i
                        className={`fas fa-chevron-${
                          isDropdownOpen ? "up" : "down"
                        }`}
                      ></i>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded shadow-lg">
                        <ul>
                          {vehicles.map((vehicle, index) => (
                            <li
                              key={index}
                              className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                              onClick={() => handleVehicleSelect(vehicle)}
                            >
                              {vehicle}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* Part Search */}
                <div>
                  <label className="block text-gray-400 mb-2">
                    Search Part
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter part name or number"
                      className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                {/* Search Button */}
                <div className="flex items-end">
                  <button className="w-full bg-yellow-400 text-black px-4 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors cursor-pointer whitespace-nowrap !rounded-button">
                    SEARCH PARTS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Popular Categories */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              POPULAR CATEGORIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Category 1 */}
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Close-up%20of%20modern%20car%20engine%20parts%2C%20showing%20high-quality%20brake%20discs%20and%20calipers%20with%20professional%20lighting%20against%20dark%20background.%20The%20image%20has%20sharp%20details%20of%20metallic%20surfaces%20with%20a%20premium%20finish&width=400&height=300&seq=3&orientation=landscape"
                    alt="Brakes & Suspension"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Brakes & Suspension
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Premium quality brake pads, rotors, calipers and suspension
                    components
                  </p>
                  <a
                    href="#"
                    className="text-yellow-400 inline-flex items-center cursor-pointer"
                  >
                    Shop Now <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
              {/* Category 2 */}
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%20image%20of%20car%20engine%20components%20and%20electronics%2C%20showing%20high-quality%20engine%20parts%20with%20detailed%20wiring%20and%20electronic%20modules%20against%20dark%20background.%20The%20image%20highlights%20precision%20engineering%20with%20clean%20metallic%20surfaces&width=400&height=300&seq=4&orientation=landscape"
                    alt="Engine & Electronics"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Engine & Electronics
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Engine components, sensors, control modules and wiring
                    harnesses
                  </p>
                  <a
                    href="#"
                    className="text-yellow-400 inline-flex items-center cursor-pointer"
                  >
                    Shop Now <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
              {/* Category 3 */}
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Car%20interior%20parts%20and%20accessories%20with%20premium%20finish%2C%20showing%20steering%20wheel%2C%20dashboard%20components%20and%20trim%20pieces%20against%20dark%20background.%20The%20image%20displays%20luxury%20automotive%20interior%20elements%20with%20professional%20lighting&width=400&height=300&seq=5&orientation=landscape"
                    alt="Interior & Comfort"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Interior & Comfort
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Seats, trim, climate control and entertainment system
                    components
                  </p>
                  <a
                    href="#"
                    className="text-yellow-400 inline-flex items-center cursor-pointer"
                  >
                    Shop Now <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
              {/* Category 4 */}
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Car%20exterior%20body%20parts%20including%20headlights%2C%20mirrors%20and%20trim%20pieces%20with%20professional%20lighting%20against%20dark%20background.%20The%20image%20shows%20premium%20automotive%20exterior%20components%20with%20metallic%20and%20glossy%20finishes&width=400&height=300&seq=6&orientation=landscape"
                    alt="Body & Exterior"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Body & Exterior
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Bumpers, lights, mirrors, grilles and other exterior
                    components
                  </p>
                  <a
                    href="#"
                    className="text-yellow-400 inline-flex items-center cursor-pointer"
                  >
                    Shop Now <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Featured Products */}
        <section className="py-16 px-4 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              FEATURED PRODUCTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Product 1 */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=High-performance%20brake%20caliper%20and%20rotor%20with%20red%20finish%20against%20dark%20background.%20Professional%20product%20photography%20of%20premium%20automotive%20brake%20component%20with%20detailed%20engineering%20features%20and%20metallic%20texture&width=400&height=300&seq=7&orientation=landscape"
                    alt="Performance Brake Kit"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">
                      Performance Brake Kit
                    </h3>
                    <button className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    High-performance brake kit for sports vehicles
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">$249.99</span>
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product 2 */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=LED%20headlight%20assembly%20for%20modern%20car%20with%20clear%20lens%20and%20complex%20reflector%20design%20against%20dark%20background.%20Professional%20product%20photography%20of%20automotive%20lighting%20with%20sharp%20details%20and%20premium%20finish&width=400&height=300&seq=8&orientation=landscape"
                    alt="LED Headlight Assembly"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">
                      LED Headlight Assembly
                    </h3>
                    <button className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    Advanced LED headlight with improved visibility
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">$189.99</span>
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product 3 */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Performance%20air%20intake%20system%20with%20carbon%20fiber%20housing%20and%20metal%20components%20against%20dark%20background.%20Professional%20product%20photography%20of%20automotive%20engine%20part%20with%20detailed%20engineering%20features%20and%20premium%20materials&width=400&height=300&seq=9&orientation=landscape"
                    alt="Performance Air Intake"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">
                      Performance Air Intake
                    </h3>
                    <button className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    Cold air intake system for improved engine performance
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">$129.99</span>
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product 4 */}
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Premium%20car%20suspension%20coilover%20kit%20with%20adjustable%20dampers%20and%20springs%20against%20dark%20background.%20Professional%20product%20photography%20of%20automotive%20suspension%20components%20with%20detailed%20engineering%20features%20and%20metallic%20finish&width=400&height=300&seq=10&orientation=landscape"
                    alt="Adjustable Coilover Kit"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">
                      Adjustable Coilover Kit
                    </h3>
                    <button className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    Performance suspension system with adjustable height
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">$349.99</span>
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors cursor-pointer whitespace-nowrap !rounded-button">
                VIEW ALL PRODUCTS
              </button>
            </div>
          </div>
        </section>
        {/* Brands Section */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              TOP BRANDS WE CARRY
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {/* Brand logos with text */}
              <div className="flex flex-col items-center">
                <i className="fab fa-bmw text-4xl mb-2"></i>
                <span className="text-sm">BMW</span>
              </div>
              <div className="flex flex-col items-center">
                <i className="fab fa-mercedes-benz text-4xl mb-2"></i>
                <span className="text-sm">Mercedes</span>
              </div>
              <div className="flex flex-col items-center">
                <i className="fab fa-audi text-4xl mb-2"></i>
                <span className="text-sm">Audi</span>
              </div>
              <div className="flex flex-col items-center">
                <i className="fas fa-car text-4xl mb-2"></i>
                <span className="text-sm">Toyota</span>
              </div>
              <div className="flex flex-col items-center">
                <i className="fas fa-car-side text-4xl mb-2"></i>
                <span className="text-sm">Honda</span>
              </div>
              <div className="flex flex-col items-center">
                <i className="fab fa-ford text-4xl mb-2"></i>
                <span className="text-sm">Ford</span>
              </div>
            </div>
          </div>
        </section>
        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              WHY CHOOSE US
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-black text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Quality Guaranteed
                </h3>
                <p className="text-gray-400">
                  All our parts meet or exceed OEM specifications for
                  reliability and performance.
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shipping-fast text-black text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Shipping</h3>
                <p className="text-gray-400">
                  Same-day shipping on orders placed before 3 PM with real-time
                  tracking.
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-headset text-black text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
                <p className="text-gray-400">
                  Our technical team is available 7 days a week to help with
                  your questions.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Gallery Section */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              OUR GALLERY
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20automotive%20workshop%20interior%20with%20modern%20equipment%20and%20luxury%20cars%20being%20serviced%2C%20showing%20high-end%20tools%20and%20clean%20environment%20with%20dramatic%20lighting%20against%20industrial%20background&width=600&height=400&seq=11&orientation=landscape"
                  alt="Workshop"
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    Professional Workshop
                  </span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=Close%20up%20of%20pristine%20engine%20bay%20with%20chrome%20and%20carbon%20fiber%20details%2C%20professional%20automotive%20photography%20with%20perfect%20lighting%20showing%20mechanical%20precision%20against%20dark%20background&width=600&height=400&seq=12&orientation=landscape"
                  alt="Engine Bay"
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    Performance Parts
                  </span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20car%20interior%20detail%20shot%20focusing%20on%20premium%20materials%20and%20technology%2C%20showing%20leather%20dashboard%20and%20digital%20displays%20with%20ambient%20lighting%20against%20luxury%20background&width=600&height=400&seq=13&orientation=landscape"
                  alt="Interior"
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    Interior Excellence
                  </span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20automotive%20repair%20process%20showing%20mechanic%20working%20on%20suspension%20system%20with%20specialized%20tools%20and%20equipment%2C%20clean%20workshop%20environment%20with%20dramatic%20lighting&width=600&height=400&seq=14&orientation=landscape"
                  alt="Repair Process"
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    Expert Repairs
                  </span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=High%20performance%20car%20wheels%20and%20brake%20system%20installation%2C%20professional%20automotive%20photography%20showing%20premium%20alloy%20wheels%20and%20red%20brake%20calipers%20with%20perfect%20lighting%20against%20dark%20background&width=600&height=400&seq=15&orientation=landscape"
                  alt="Wheels and Brakes"
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    Wheels & Brakes
                  </span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20automotive%20diagnostic%20process%20with%20advanced%20computer%20systems%20and%20scanning%20tools%2C%20professional%20technician%20working%20in%20high%20tech%20environment%20with%20dramatic%20lighting&width=600&height=400&seq=16&orientation=landscape"
                  alt="Diagnostics"
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    Advanced Diagnostics
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors cursor-pointer whitespace-nowrap !rounded-button">
                VIEW MORE PHOTOS
              </button>
            </div>
          </div>
        </section>
      </main>
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="bg-white text-black rounded-lg shadow-xl w-80 md:w-96 overflow-hidden transition-all duration-300 ease-in-out">
            <div className="bg-yellow-400 p-4 flex justify-between items-center">
              <h3 className="font-bold text-black">Chat with us</h3>
              <button
                onClick={toggleChat}
                className="text-black hover:text-gray-800 cursor-pointer"
              >
                <img src="/close.png" rel="chat" className="w-6 h-6" />
              </button>
            </div>

            <div className="h-80 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 ${msg.isUser ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.isUser
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={sendMessage}
              className="p-4 border-t border-gray-200"
            >
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-yellow-400"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 text-black p-2 rounded-r-lg hover:bg-yellow-500 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <img src="/send.png" rel="chat" className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick={toggleChat}
            className="bg-yellow-400 text-black w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-500 transition-colors cursor-pointer"
          >
            <img src="/chat.png" rel="chat" className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
};
export default App;
