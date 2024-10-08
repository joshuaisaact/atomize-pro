import { Link } from "react-router-dom";
import HomeButton from "../assets/navigation/home-button.png";
import CreateButton from "../assets/navigation/createnew-button.png";
import EditButton from "../assets/navigation/edit-button.png";
import "../styles/ProgressBar.css";
import "../styles/NavBar.css";
import { useAppContext } from "../AppContext";
import { State } from "../types/types";

export default function NavBar() {
  // const [hoveredText, setHoveredText] = ('');
  const { state } = useAppContext() as {
    state: State;
  };
  const { tabs, goalXPBar, currentXP } = state;
  console.log("NavBar state:", state);

  const formatDate = (date: Date) => {
    const dateFormat = date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const parts = dateFormat.split(" ");
    const dayOfWeek = parts[0];
    const restOfDate = parts.slice(1).join(" ");
    return `${dayOfWeek}, ${restOfDate}`;
  };

  const formattedDate = formatDate(new Date());

  return (
    <>
      <div className="nav-container">
        <div className="home">
          <Link to="/home">
            <img src={HomeButton} className="nav-icon" />
          </Link>
        </div>
        <div className="categories">
          {tabs.length > 0 &&
            tabs.map((tab) => {
              if (tab.name) {
                const hyphenatedName = tab.name.replace(/\s+/g, "-");
                return (
                  <Link to={`/${hyphenatedName}`} key={tab.name}>
                    <img src={`/icons/${tab.icon_name}`} className="nav-icon" />
                  </Link>
                );
              }
              return null;
            })}
        </div>
        <div className={`${tabs.length ? "categories" : null}`}>
          <Link to="/create-new">
            <img src={CreateButton} alt="Create New" className="nav-icon" />
          </Link>
          <Link to="/edit">
            <img src={EditButton} alt="Edit" className="nav-icon" />
          </Link>
        </div>
        <div className="date-display">{formattedDate}</div>
        <div className="barBox" id="nav-completion-bar-box">
          <div className="progress-container" id="nav-completion-bar">
            <div
              className="progress-bar xpbar-fill"
              role="progressbar"
              style={{ width: `${(currentXP / (goalXPBar || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
