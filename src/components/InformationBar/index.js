import React, { useState } from "react";
//import RoundAddButton from "../RoundAddButton";
import NewButton from "../NewButton";
import AppStatus from "../AppStatus";
import PrimaryButton from "../PrimaryButton";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import "./InformationBar.css";

const InformationBar = ({
  header,
  buttontext,
  status,
  showBtn,
  btnAction,
  viewAppLink,
  credits,
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
              {/*<RoundAddButton onClick={btnAction} />*/}
              <NewButton label={buttontext} type="new" onClick={btnAction} />
            </div>
          </div>
        </div>
      ) : showBtn ? (
        <div className="InformationBarWithButton">
          <div className="InfoHeader">{header}</div>
          <div className="RoundAddButtonWrap">
            {/*<RoundAddButton onClick={btnAction} />*/}
            <NewButton label={buttontext} type="new" onClick={btnAction} />
          </div>
        </div>
      ) : viewAppLink ? (
        <div className="InformationBarWithButton">
          <div className="InfoHeader">{header}</div>
          <a href={viewAppLink} rel="noopener noreferrer" target="_blank">
            <PrimaryButton className="ViewAppBtn">Open App</PrimaryButton>
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
