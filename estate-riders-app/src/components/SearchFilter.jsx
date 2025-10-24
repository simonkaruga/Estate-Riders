import React from "react";
const [searchTerm, setsearchTerm]=userState("");
const data = [
    "bicycle",
    "scooter",
    "skateboard",
    "skateshoes",
]
const filteredData = data.filter((item) =>
  item.toLowerCase().includes(searchTerm.toLowerCase())
);
<ul>
  {filteredData.length ? (
    filteredData.map((item, index) => <li key={index}>{item}</li>)
  ) : (
    <p>no results</p>
  )}
</ul>
export default SearchFilter;