"use client";
// components/TreeComponent.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen,faIndustry } from "@fortawesome/free-solid-svg-icons";
import styles from './TreeComponent.module.css';  // Import CSS module


const TreeComponent = ({ data }) => {
  const [activeItem,setActiveItem]=useState(false);

  const handleClick = (depart) => {
      setActiveItem(depart.id);
  };
  const buildHtmlTree = (data) => {
    return (
      <ul className={styles.tree}>
        {data.map((item,i) => (
          <li 
            key={item.id} 
            className={`${styles.treeItem} ${item.open ? "" : "hidden"}`}>             
            <span
            className={`${activeItem==item.id ? styles.active : ""} hover:bg-yellow-950 active:bg-yellow-950 hover:text-yellow-100 block`}
            onClick={()=>handleClick(item)}>
            {item.hasChild ? <FontAwesomeIcon icon={faFolderOpen} 
                                              className="fas fa-folder-open" style={{color:"#C07F00"}}/> 
                            :<FontAwesomeIcon icon={faIndustry} 
                                              className="fas fa-industry" style={{color:"#C07F00"}}/>}
            {" "}{item.name}</span>
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