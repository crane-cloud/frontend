import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import RoundAddButton from "../RoundAddButton";
import AppStatus from "../AppStatus";
import PrimaryButton from "../PrimaryButton";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import { ReactComponent as BackButton } from "../../assets/images/arrow-left.svg";
import "./InformationBar.css";
import { ReactComponent as User } from "../../assets/images/user.svg";
import { ReactComponent as Users } from "../../assets/images/users.svg";
import useMedia from "../../hooks/mediaquery";
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
  selectedProjects,
  handleTabChange,
  handleSharedProjectsTabChange,
  myProjectsList = [],
  sharedProjectsList = [],
  onFilterSelect,
  viewFilter = false,
}) => {
  //const [selectedTab, setSelectedTab] = useState("MyProjects");
  const [Searchword, setSearchword] = useState("");
  const callbackSearchWord = ({ target }) => {
    const { value } = target;
    setSearchword(value);
    searchAction(value);
  };
  const history = useHistory();
  const isDesktop = useMedia();
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
              {(viewFilter && isDesktop)  && (
                <div className="InfoProjectCategories">
                  <button
                    className={
                      selectedProjects === "My projects"
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
                      selectedProjects === "Shared Projects"
                        ? "InfoCurrentTab"
                        : "InfoTab"
                    }
                    onClick={() =>
                      handleSharedProjectsTabChange("SharedProjects")
                    }
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
          {(viewFilter && !isDesktop) && (
            <div className="MobileInfoProjectCategories">
              <button
                className={
                  selectedProjects === "My projects"
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
                  selectedProjects === "Shared Projects"
                    ? "InfoCurrentTab"
                    : "InfoTab"
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
