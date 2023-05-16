import React, { useState } from "react";

const Search = ({ placeName, data = [], setData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const handleSearchTermChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length > 0) {
      setFilteredSubjects(
        data.filter((subject) =>
          Object.values(subject).some(
            (value) =>
              typeof value === "string" && value.toLowerCase().includes(term)
          )
        )
      );
    } else {
      setFilteredSubjects([]);
    }
  };

  const handleSelectSubject = (subject) => {
    setData(subject);
    setSearchTerm(subject.nombre);
    setFilteredSubjects([]);
  };

  return (
    <div className="w-full">
      <input
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder={placeName}
      />
      {filteredSubjects.length > 0 && (
        <ul className="mt-2 bg-white shadow rounded-lg">
          {filteredSubjects.map((value, index) => (
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              key={index}
              onClick={() => handleSelectSubject(value)}
            >
              {value.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
