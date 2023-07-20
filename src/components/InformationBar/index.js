import React, { useState } from "react";
import { Link } from "react-router-dom";
//import RoundAddButton from "../RoundAddButton";
import AppStatus from "../AppStatus";
import PrimaryButton from "../PrimaryButton";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import "./InformationBar.css";
import { ReactComponent as User } from "../../assets/images/user.svg";
import { ReactComponent as Users } from "../../assets/images/users.svg";
const InformationBar = ({
  header,
  buttontext,
  status,
  showBtn,
  btnAction,
  btntype = "new",
  viewAppLink,
  credits,
  showSearchBar,
  placeholder,
  searchAction,
  adminRoute,
  adminProjects,
  selectedProjects,
  handleTabChange,
  handleSharedProjectsTabChange,
  myProjectsList = [],
  sharedProjectsList = [],
  onFilterSelect,
  viewFilter = "False",
}) => {
  const [Searchword, setSearchword] = useState("");
  const callbackSearchWord = ({ target }) => {
    const { value } = target;
    setSearchword(value);
    searchAction(value);
  };
return (
    <div className="InformationBar SmallContainer">
      {status ? (
        <div className="InformationBarWithButton">
          <div className="AppUrl">
            <a target="_blank" rel="noopener noreferrer" href={header}>
              {header}
            </a>
          </div>
          <div className="RoundAddButtonWrap">
            <AppStatus appStatus={status} />
          </div>
        </div>
      ) : showSearchBar ? (
        <div className="InformationBarColumnView">
          <div className="InformationBarWithButton">
            <div className="InfoHeader">
              {header}
              {viewFilter && (
                <div className="InfoProjectCategories">
                  <button
                    className={
                      selectedProjects === "MyProjects"
                        ? "InfoCurrentTab"
                        : "InfoTab"
                    }
                    onClick={() => handleTabChange("MyProjects")}
                  >
                    <User className="SmallerIcon" />
                    <span>
                      MyProjects{" "}
                      <span title="Projects">{`(${myProjectsList.length})`}</span>
                    </span>
                  </button>
                  <button
                    className={
                      selectedProjects === "SharedProjects"
                        ? "CurrentTab"
                        : "Tab"
                    }
                    onClick={() => handleSharedProjectsTabChange("SharedProjects")}
                  >
                    <span>
                      <Users className="SmallerIcon" />
                    </span>
                    <span>
                      {" "}
                      Shared Projects{" "}
                      <span title="Projects">{`(${sharedProjectsList.length})`}</span>{" "}
                    </span>
                  </button>
                </div>
              )}
            </div>
            <div className="InfoContent">
              <div className="SearchBar DesktopView">
                <div className="SearchInput">
                  <input
                    type="text"
                    className="searchTerm"
                    name="Searchword"
                    placeholder={placeholder}
                    value={Searchword}
                    onChange={callbackSearchWord}
                  />
                  <SearchButton className="SearchIcon" />
                </div>
              </div>
              <div className="ButtonWrap">
                {adminRoute &&
                  (adminProjects ? (
                    <Link
                      to={{
                        pathname: `/projects`,
                      }}
                    >
                      <PrimaryButton color="primary">
                        Admin Projects
                      </PrimaryButton>
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: `/clusters`,
                      }}
                    >
                      <PrimaryButton color="primary">Dashboard</PrimaryButton>
                    </Link>
                  ))}
                <PrimaryButton btntype={btntype} onClick={btnAction}>
                  {buttontext}
                </PrimaryButton>
              </div>
            </div>
          </div>
          <div className="InfoContent MobileView">
            <div className="SearchBar ">
              <div className="SearchInput">
                <input
                  type="text"
                  className="searchTerm"
                  name="Searchword"
                  placeholder={placeholder}
                  value={Searchword}
                  onChange={callbackSearchWord}
                />
                <SearchButton className="SearchIcon" />
              </div>
            </div>
          </div>
        </div>
      ) : showBtn ? (
        <div className="InformationBarWithButton">
          <div className="InfoHeader">{header}</div>
          <div className="ButtonWrap">
            {adminRoute &&
              (adminProjects ? (
                <Link
                  to={{
                    pathname: `/projects`,
                  }}
                >
                  <PrimaryButton color="primary">Admin Projects</PrimaryButton>
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: `/clusters`,
                  }}
                >
                  <PrimaryButton color="primary">Dashboard</PrimaryButton>
                </Link>
              ))}
            <PrimaryButton btntype={btntype} onClick={btnAction}>
              {buttontext}
            </PrimaryButton>
          </div>
        </div>
      ) : viewAppLink ? (
        <div className="InformationBarWithButton">
          <div className="InfoHeader">{header}</div>
          <a href={viewAppLink} rel="noopener noreferrer" target="_blank">
            <PrimaryButton color="primary-outline">Open App</PrimaryButton>
          </a>
        </div>
      ) : credits ? (
        <div className="InformationBarWithButton">
          <div className="InfoHeader">{header}</div>
          {/**appears if user has credits */}
          <div className="CreditsCorner" title="credits">
            {credits > 0 ? credits : 0}
            <Coin />
          </div>
        </div>
      ) : (
        <div className="InfoHeader">{header}</div>
      )}
    </div>
  );
};

export default InformationBar;
