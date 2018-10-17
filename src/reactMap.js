import React from "react";

export class MapComponent extends React.Component {
  componentDidMount() {
    var google_script_tag = document.getElementById("google_api");
    console.log("google script tag=" + google_script_tag);

    if (google_script_tag === null) {
//      window.googleReady = this.displayCallback;
      const script = document.createElement("script");
      script.defer = true;
      script.id = "google_api";
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPL1Ofx-vSERWL0kk3JYTtugha2sgv_Xs&callback=googleReady";
      script.async = true;
      document.body.appendChild(script);
    }
    console.log("Did mount");
  }

  displayMap() {
    console.log("this inside displa map :" + this);
    console.log("displayMap called ");
    var mapElement = document.getElementById("map");
    if (mapElement === null) {
      const map = document.createElement("div")
    }

    var map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: this.averageLoction()
    });
    if (this.props.shops != null) {
      console.log("about to add shop markers ");
      /// Add markers here///
      
      for (var i = 0; i < this.props.shops.length; i++) {
        /* Developer tool says that shops is undefined. Shops is defined but only inside of another frame. Forgot how to access the information of a frame that is not a parent. */
        var shop = this.props.shops[i];
        var marker = new window.google.maps.Marker({
          position: shop.location,
          map: map,
          title: shop.shopName,
          clickable: true,
          label: shop.shopName,
          zoom: 5
          /// Label allows for name to be seen at all times for every location. Find a way to have it show you less of them as you zoom out
        });
        this.addClickHandler(shop, marker, this.props.onResultClick)
        this.addHoverHandler(shop, marker, this.props.onResultHover)
      }
    }
  }

  addHoverHandler(aShop, aMarker, hoverFunction) {
    aMarker.addListener("mouseover", function(event) {   
      hoverFunction(aShop.id);
    });
  }
  
  addClickHandler(aShop, aMarker, clickFunction) {
    aMarker.addListener("click", function(event) {
 //     this.props.onResultClick(aShop.id)
      clickFunction(aShop.id);
    });
  } 

  averageLoction() {
    var lat = 0;
    var lng = 0;
    for (var i = 0; i < this.props.shops.length; i++) {
      console.log(i);
      lat = this.props.shops[i].location.lat + lat;
      lng = this.props.shops[i].location.lng + lng;
    }
    lat = lat / this.props.shops.length;
    lng = lng / this.props.shops.length;
    return { lat: lat, lng: lng };
  }

  constructor(props) {
    super(props);
//   this.displayCallback = this.displayMap.bind(this);
    var obj = this
    window.googleReady = this.displayMap.bind(obj)
    console.log("constructor is done");
    // intentionally empty
  }
  render() {
    const style = {
      width: "100vw",
      height: "100vh",
      backgroundColor: "blue"
    };
    return (
      <div>
        <div style={style} id="map">
          Map here
        </div>
      </div>
    );
  }
}
