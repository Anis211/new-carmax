import React, { useState } from "react";

const Pagination = ({ setCount, tot, setChange }) => {
  const [chosen, setChosen] = useState(1);
  const [numbers, setNumbers] = useState([]);

  useState(() => {
    const func = () => {
      let newNumbers = [];
      new Array(Math.ceil(tot / 10))
        .fill("")
        .map((item, index) => newNumbers.push(index + 1));
      setNumbers(newNumbers);
    };

    tot != 0 && func();
  }, [tot]);

  return (
    <nav className="flex flex-col md:flex-row gap-4 justify-between overflow-x-hidden items-center mt-6">
      <div className="flex items-center space-x-2">
        <p className="text-sm text-gray-700">
          Showing 1 to 10 of {tot} entries
        </p>
      </div>
      <div className="flex space-x-2">
        {!numbers.includes(1) && tot > 3 && (
          <button
            onClick={() => {
              const number = numbers[0];
              const array = new Array(3).fill("");
              let newNumbers = [];

              array.map((item, index) =>
                newNumbers.unshift(number - index - 1)
              );
              newNumbers[0] > 0 && setNumbers(newNumbers);
            }}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            {"<"}
          </button>
        )}
        {numbers[2] != 3 && tot > 3 && (
          <p
            onClick={() => setNumbers([1, 2, 3])}
            className={`relative inline-flex items-center px-4 py-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 border text-sm font-medium`}
          >
            ...
          </p>
        )}
        {tot < 4
          ? numbers.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setCount([(index + 1) * 10 - 10, (index + 1) * 10]);
                  setChosen(index + 1);
                  setChange(true);
                }}
                className={`relative inline-flex items-center px-4 py-2 ${
                  chosen == index + 1
                    ? "border-gray-300 bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                } border text-sm font-medium`}
              >
                {index + 1}
              </button>
            ))
          : numbers.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setCount([item * 2 - 2, item * 2]);
                  setChosen(item);
                  setChange(true);
                }}
                className={`relative inline-flex items-center px-4 py-2 ${
                  chosen == index + 1
                    ? "border-gray-300 bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                } border text-sm font-medium`}
              >
                {item}
              </button>
            ))}
        {tot > 3 && numbers[numbers.length - 1] != tot && (
          <p
            onClick={() => {
              if (String(tot / 3).split(".")[1] == undefined) {
                setNumbers([tot - 2, tot - 1, tot]);
              } else {
                let close = 0;
                new Array(3)
                  .fill("")
                  .map((item, index) =>
                    String((tot + index + 1) / 3).split(".")[1] == undefined
                      ? (close = index + 1)
                      : ""
                  );

                let newNumbers = [];
                new Array(3 - close)
                  .fill("")
                  .map((item, index) =>
                    close == 1
                      ? newNumbers.push(tot - 1 + index)
                      : newNumbers.push(tot + index)
                  );
                setNumbers(newNumbers);
              }
            }}
            className={`relative inline-flex items-center px-4 py-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 border text-sm font-medium`}
          >
            ...
          </p>
        )}
        {!numbers.includes(tot) && tot > 3 && (
          <button
            onClick={() => {
              const limit = tot + 1 < numbers[2] + 3 ? tot - numbers[2] : 3;
              const number = numbers[2];

              const array = new Array(limit).fill("");
              let newNumbers = [];

              array.map((item, index) => newNumbers.push(number + index + 1));
              newNumbers.length != 0 && setNumbers(newNumbers);
            }}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            {">"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
