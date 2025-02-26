const CardList = () => {
  return ();
import React, { useState, useEffect } from "react";
import Button from "./Button";
import Card from "./Card";
import Search from "./Search";

const CardList = ({ data }) => {

  const limit = 10;
  const defaultDataset = data.slice(0, limit);
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);

  const handlePageChange = (step) => {
    const newOffset = offset + step;
    if (newOffset >= 0 && newOffset < products.length) {
      setOffset(newOffset);
    }
  };

  useEffect(() => {
    // set the products state variable to the next 10 products
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data]);


  const filterTags = (searchTerm) => {  
    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    const filtered = data.filter(product =>
      product.tags &&
      Array.isArray(product.tags) &&
      product.tags.some(tag => 
        tag.title && String(tag.title).toLowerCase().includes(lowerCaseSearch)
      )
    );

    setOffset(0); 
    setProducts(filtered.slice(0, limit));
  };


  return (
    <div className="cf pa2">

      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {/* Using the data prop, we map over the list of products and render a Card component for each product */}
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePageChange(-limit)} disabled={offset === 0} />
        <Button text="Next" handleClick={() => handlePageChange(limit)} disabled={offset + limit >= products.length} />
      </div>
    </div>
  )
}

export default CardList;