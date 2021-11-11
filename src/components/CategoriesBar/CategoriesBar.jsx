import React, { useState } from "react";
import "./_CategoriesBar.scss";

const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of api",
  "Redux",
  "Music",
  "Algorithm Art",
  "Guitar",
  "Coding",
  "Footbal",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "Sass",
  "typescript",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");

  const changeActiveElementHandler = (item) => {
    setActiveElement(item);
  };

  return (
    <div className="categories_bar">
      {keywords.map((item, i) => (
        <span
          key={i}
          onClick={() => changeActiveElementHandler(item)}
          className={activeElement === item ? "active" : ""}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
