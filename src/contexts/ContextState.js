import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const ContextList = createContext();
export const ContextState = ({ children }) => {
  const [tasks, settasks] = useState([
    {
      id: 1,
      title: "First Item",
      date: "4th feb,2024",
      category: "shopping",
    },
    {
      id: 2,
      title: "Second Item",
      date: "4th feb,2024",
      category: "Default",
    },
    {
      id: 3,
      title: "Third Item",
      date: "4th feb,2024",
      category: "Work",
    },
    {
      id: 45,
      title: "Third Item",
      date: "4th feb,2024",
      category: "Errands",
    },
    {
      id: 46,
      title: "Third Item",
      date: "4th feb,2024",
      category: "Errands",
    },
    {
      id: 47,
      title: "Third Item",
      date: "4th feb,2024",
      category: "WishList",
    },
    {
      id: 48,
      title: "Third Item",
      date: "4th feb,2024",
      category: "Personal",
    },
    {
      id: 41,
      title: "Third Item",
      category: "Personal",
    },
  ]);

  const addTask = (task) => {
    console.log(task);
    settasks([...tasks, task]);
  };
  return (
    <ContextList.Provider value={{ tasks, addTask }}>
      {children}
    </ContextList.Provider>
  );
};
