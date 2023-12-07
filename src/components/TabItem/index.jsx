import "./TabItem.css";

const TabItem = ({ tabName, activeTab, setActiveTab }) => (
  <div
    className={`tabItem ${activeTab === tabName ? "activeTab" : "inactiveTab"}`}
    onClick={() => setActiveTab(tabName)}
  >
    {tabName}
  </div>
);

export default TabItem;
