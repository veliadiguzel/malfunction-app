"use client";
// components/TreeComponent.js
import React, { useState } from 'react';
import styles from './TreeComponent.module.css';  // Import CSS module



const TreeComponent = ({ data }) => {
  const [activeItem,setActiveItem]=useState(false);

  const handleClick = (depart) => {
    console.log(`Item ${depart.name} clicked!`);
    setActiveItem(depart.id)
  };
  const buildHtmlTree = (data) => {
    return (
      <ul className={styles.tree}>
        {data.map((item,i) => (
          <li 
            key={item.id} 
            className={styles.treeItem}>
            <span
            className={activeItem==item.id ? styles.active : ""}
            onClick={()=>handleClick(item)}
            >{item.name}</span>
            {item.children && item.children.length > 0 && buildHtmlTree(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.treeContainer}>
      {buildHtmlTree(data)}
    </div>
  );
};

export default TreeComponent;