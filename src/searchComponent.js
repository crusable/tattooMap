import React from "react";
import ReactDOM from "react-dom";

import "./App.css";
import "./shop.js";
import "./index.js";
import "./ResultListComponent.js"


class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shops = props.shops;
    this.onHover = props.resultHover;
    this.onClick = props.resultClick;
    this.visiMarkers = props.visiMarkers


  }
  render() {
    return (
      <div>
        <ResultListComponent shops={this.shops} resultHover={this.onHover} />
        <MapComponent shops={this.shops} onResultHover={this.onHover} onResultClick={this.onClick} isVisible={this.visiMarkers} />
      </div>
    );
  }
}


ReactDOM.render(
  <SearchComponent shops={shops} resultHover={onResultHover} onResultClick={resultClick} isVisible={visiMarkers}/>,
  rootElement
);