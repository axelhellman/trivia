import React from "react";
import StartTrivia from "./StartTrivia";

const CategoryElements = ({ startTrivia, topics, selectedCategory }) => (
  <StartTrivia
    startTrivia={startTrivia}
    topics={topics}
    selectedCategory={selectedCategory}
  />
);

export default CategoryElements;
