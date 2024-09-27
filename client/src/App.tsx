import { useState, useEffect, useReducer } from "react";
import { initialState, reducer } from "./store/reducer.js";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import CreateNew from "./components/CreateNew.jsx";
import CreateNewList from "./components/CreateNewList.jsx";
import CreateNewTab from "./components/CreateNewTab.jsx";
import CreateNewGoal from "./components/CreateNewGoal.jsx";
import MakeEdits from "./components/MakeEdits.jsx";
import HomePage from "./components/HomePage.jsx";
import Tab from "./components/Tab.jsx";
import { fetchAllTabs, fetchAllGoals } from "./ApiService.jsx";
import "./App.css";
import { AppContext } from "./AppContext.js";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { goals, tabs, isLoading } = state;

  // Combined function to fetch tabs and goal data
  const loadData = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      // Fetch tabs and goals simultaneously
      const [tabsData, fetchedGoals] = await Promise.all([
        fetchAllTabs(),
        fetchAllGoals(),
      ]);

      // Dispatch tabs data
      dispatch({ type: "SET_TABS", payload: tabsData });

      // Process and dispatch goals data
      if (
        fetchedGoals &&
        Array.isArray(fetchedGoals.simple) &&
        Array.isArray(fetchedGoals.progbars) &&
        Array.isArray(fetchedGoals.levels) &&
        Array.isArray(fetchedGoals.sets)
      ) {
        const allGoals = [
          ...fetchedGoals.simple,
          ...fetchedGoals.progbars,
          ...fetchedGoals.levels,
          ...fetchedGoals.sets,
        ];
        dispatch({ type: "SET_GOALS", payload: allGoals });
      } else {
        dispatch({ type: "SET_GOALS", payload: [] });
      }
    } catch (error) {
      console.error("There was an error loading data:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Fetches tabs and goals once on app mount.
  useEffect(() => {
    loadData();
  }, []);

  // If there are any goals, calculates the goal XP and updates the centralised state.
  useEffect(() => {
    if (goals.length > 0) {
      dispatch({ type: "CALCULATE_GOAL_XP", payload: goals });
    }
  }, [goals, dispatch]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="wrapper">
        <NavBar />
        <Routes>
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/create-new" element={<CreateNew />} />
          <Route path="/create-new/list" element={<CreateNewList />} />
          <Route path="/create-new/tab" element={<CreateNewTab />} />
          <Route path="/create-new/goal" element={<CreateNewGoal />} />
          <Route path="/edit" element={<MakeEdits />} />
          {!isLoading &&
            tabs.length > 0 &&
            tabs.map((tab) => {
              if (tab.name) {
                return (
                  <Route key={tab.name} path={`/:tabName`} element={<Tab />} />
                );
              }
            })}
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
