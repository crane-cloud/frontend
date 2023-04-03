import React, { useState } from "react";
//import RoundAddButton from "../RoundAddButton";
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
  btntype = "new",
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
        <div className="InformationBarColumnView">
          <div className="InformationBarWithButton">
            <div className="InfoHeader">{header}</div>
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
              <div className="RoundAddButtonWrap">
                {/*<RoundAddButton onClick={btnAction} />*/}
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
          <div className="RoundAddButtonWrap">
            {/*<RoundAddButton onClick={btnAction} />*/}
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
