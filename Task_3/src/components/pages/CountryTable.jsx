import React, { useState, useMemo } from "react";

const CountryTable = ({ data }) => {
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedData = useMemo(() => {
    let sorted = [...data];

    if (sortBy === "population") {
      sorted.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.population - b.population;
        } else {
          return b.population - a.population;
        }
      });
    } else if (sortBy === "area") {
      sorted.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.area - b.area;
        } else {
          return b.area - a.area;
        }
      });
    } else if (sortBy === "density") {
      sorted.sort((a, b) => {
        const densityA = a.population / a.area;
        const densityB = b.population / b.area;

        if (sortOrder === "asc") {
          return densityA - densityB;
        } else {
          return densityB - densityA;
        }
      });
    }

    if (searchTerm) {
      sorted = sorted.filter((country) => {
        return country.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return sorted;
  }, [data, sortBy, sortOrder, searchTerm]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="mx-12 px-4 py-3">

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="px-4 pb-4 bg-white dark:bg-gray-900">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mt-2">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                class="px-6 py-3"
                onClick={() => handleSort("name")}
              >
                Country Name
              </th>
              <th
                scope="col"
                class="px-6 py-3"
                onClick={() => handleSort("population")}
              >
                Population
              </th>
              <th
                scope="col"
                class="px-6 py-3"
                onClick={() => handleSort("area")}
              >
                Land Area
              </th>
              <th
                scope="col"
                class="px-6 py-3"
                onClick={() => handleSort("density")}
              >
                Density
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((country) => (
              <tr
                key={country.name}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {country.name}
                </th>
                <td class="px-6 py-4">{formatNumber(country.population)}</td>
                <td class="px-6 py-4">{formatNumber(country.area)}</td>
                <td class="px-6 py-4">
                  {formatNumber(country.population / country.area)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryTable;
