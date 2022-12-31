function states_US(location) { 
    let states = {
      "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut",
      "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "llinois", "IN": "Indiana", "IA": "Iowa",
      "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Míchigan",
      "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire",
      "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma",
      "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas",
      "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
    };
  
    let goodLocation = location;
    if (location.split(",").length - 1 == 2) {
      let city = location.split(",")[0].trim();
      let state = location.split(",")[1].trim().toUpperCase();
      if (typeof states[state] != "undefined") {
        goodLocation = capitalize(city + ", " + states[state]) + ", US";
      } else {
        console.log("State ", state, " not found");
      }
    } else if (location.split(",").length - 1 == 1) {
      let city = location.split(",")[0].trim();
      let state = location.split(",")[1].trim().toUpperCase();
      if (typeof states[state] != "undefined") {
        goodLocation = capitalize(city + ", " + states[state]) + ", US";
      } else {
        console.log("State ", state, " not found");
      }
    } else if (location.split(",").length - 1 == 0) {
      let state = location.trim().toUpperCase();
      if (typeof states[state] != "undefined") {
        goodLocation = capitalize(states[state]) + ", US";
      } else {
        console.log("State ", state, " not found");
      }
    }
    return goodLocation;
  
    function capitalize(str, lower = true) {
      return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    }
  }