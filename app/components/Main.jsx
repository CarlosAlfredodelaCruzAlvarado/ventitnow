'use client';
import React, { useState } from 'react';
import RightSection from './RightSection';
import ComplaintList from './ComplaintList';

const Main = ({ complaints }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filterByCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselecciona la categoría si ya está seleccionada
    } else {
      setSelectedCategory(category);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesCategory = selectedCategory ? complaint.category === selectedCategory : true;
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid grid-cols-[4fr_2fr] m-10 gap-10">
      <div >
        <ComplaintList complaints={filteredComplaints} />
      </div>
      <div>
        <RightSection onCategorySelect={filterByCategory} onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Main;
