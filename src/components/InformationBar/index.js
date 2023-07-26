import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppStatus from "../AppStatus";
import PrimaryButton from "../PrimaryButton";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import { ReactComponent as BackButton } from "../../assets/images/arrow-left.svg";
import "./InformationBar.css";
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
  showBackBtn = false,
  myProjectsList = [],
  sharedProjectsList = [],
  onFilterSelect,
  viewFilter = false,
}) => {
  const [Searchword, setSearchword] = useState("");
  const callbackSearchWord = ({ target }) => {
    const { value } = target;
    setSearchword(value);
    searchAction(value);
  };
  const [selectedOption, setSelectedOption] = useState("All");
  const allProjects = myProjectsList.concat(sharedProjectsList);
  console.log(viewFilter, typeof viewFilter);
  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    let displayProjects;
    if (selectedOption === "My Projects") {
      displayProjects = myProjectsList;
    } else if (selectedOption === "Shared Projects") {
      displayProjects = sharedProjectsList;
    } else {
      displayProjects = allProjects;
    }
    setSelectedOption(selectedOption);
    onFilterSelect(selectedOption, displayProjects);
  };
  const history = useHistory();
  const goToBackPage = () => {
    history.goBack();
  };
  return (
    <div className="InformationBar SmallContainer">
      {showBackBtn && (
        <button className="InfoBackBtn" onClick={goToBackPage}>
          <BackButton color="#000" />
        </button>
      )}

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
                  <select
                    className="InfoFilterOption"
                    value={selectedOption}
                    onChange={handleDropdownChange}
                  >
                    <option value="My Projects">
                      My Projects ({myProjectsList.length})
                    </option>
                    <option value="Shared Projects">
                      Shared Projects ({sharedProjectsList.length})
                    </option>
                    <option value="All">All ({allProjects.length})</option>
                  </select>
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
