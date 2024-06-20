import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const ContextList = createContext();
export const ContextState = ({ children }) => {
  // FlatList Data
  const [tasks, settasks] = useState([
    {
      id: 1,
      title: "First Item",
      itemDate: "4th feb,2024",
      category: "Birthday",
      initialCategory: "Birthday",
      completed: false,
    },
    {
      id: 2,
      title: "Second Item",
      date: "4th feb,2024",
      category: "Birthday",
      initialCategory: "Birthday",
      completed: false,
    },
    {
      id: 3,
      title: "Third Item",
      date: "4th feb,2024",
      category: "Work",
      initialCategory: "Work",
      completed: false,
    },
    {
      id: 45,
      title: "Third Item",
      date: "4th feb,2024",
      category: "Errands",
      initialCategory: "Errands",
      completed: false,
    },
    {
      id: 46,
      title: "Third Item",
      date: "4th feb,2024",
      category: "Errands",
      initialCategory: "Errands",
      completed: false,
    },
    {
      id: 47,
      title: "Third Item",
      date: "4th feb,2024",
      category: "WishList",
      initialCategory: "WishList",
      completed: false,
    },
    {
      id: 48,
      title: "Third Item",
      date: "4th feb,2024",
      category: "Personal",
      initialCategory: "Personal",
      completed: false,
    },
    {
      id: 41,
      title: "Third Item",
      category: "Personal",
      initialCategory: "Personal",
      completed: false,
    },
  ]);
  // DropdownPIcker Component data
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState("All Lists"); // value selcted in items
  const [items, setItems] = useState([
    { label: "All Lists", value: "All Lists" },
    { label: "Work", value: "Work" },
    {
      label: "Personal",
      value: "Personal",
    },
    {
      label: "Errands",
      value: "Errands",
    },
    {
      label: "Birthday",
      value: "Birthday",
    },
    {
      label: "School",
      value: "School",
    },
    { label: "Finished", value: "Finished" },
  ]);
  const filteredItems = items.filter((item) => item.value !== "Finished");
  // Adding new Task
  const addTask = (task) => {
    settasks([...tasks, task]);
  };
  // marking task and undoing task
  const updateItemCategory = (id) => {
    settasks((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newCategory =
            item.category === "Finished" ? item.initialCategory : "Finished";
          return { ...item, category: newCategory };
        }
        return item;
      })
    );
  };
  const editTask = (updatedTask) => {
    settasks((prevTasks) => {
      //console.log(prevTasks);
      return prevTasks.map((task) => {
        console.log(task);
        return task.id === updatedTask.id ? updatedTask : task;
      });
    });
  };
  return (
    <ContextList.Provider
      value={{
        tasks,
        addTask,
        settasks,
        items,
        setItems,
        isOpen,
        setOpen,
        value,
        setValue,
        updateItemCategory,
        editTask,
        filteredItems,
      }}
    >
      {children}
    </ContextList.Provider>
  );
};
