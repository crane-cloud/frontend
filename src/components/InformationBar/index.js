import React, { useState } from "react";
import RoundAddButton from "../RoundAddButton";
import AppStatus from "../AppStatus";
import PrimaryButton from "../PrimaryButton";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";
import "./InformationBar.css";

const InformationBar = ({
  header,
  status,
  showBtn,
  btnAction,
  viewAppLink,
  showSearchBar,
  placeholder,
  searchAction,
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
        <div className="InformationBarWithButton">
          <div className="InfoHeader">{header}</div>
          <div className="InfoContent">
            <div className="SearchBar">
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
            <div className="RoundAddButtonWrap">
              <RoundAddButton onClick={btnAction} />
            </div>
          </div>
        </div>
      ) : showBtn ? (
        <div className="InformationBarWithButton">
          <div className="InfoHeader">{header}</div>
          <div className="RoundAddButtonWrap">
            <RoundAddButton onClick={btnAction} />
          </div>
        </div>
      ) : viewAppLink ? (
        <div className="InformationBarWithButton">
          <div className="InfoHeader">{header}</div>
          <a href={viewAppLink} rel="noopener noreferrer" target="_blank">
            <PrimaryButton label="Open App" className="ViewAppBtn" />
          </a>
        </div>
      ) : (
        <div className="InfoHeader">{header}</div>
      )}
    </div>
  );
};

export default InformationBar;
