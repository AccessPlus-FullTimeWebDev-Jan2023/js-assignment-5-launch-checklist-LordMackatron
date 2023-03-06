// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.

   let missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`
   
}

function validateInput(testInput) {
   if (testInput === "") {
    return "Empty";
  }else if (isNaN(testInput)) {
    return "Not a Number";
  }else if (!isNaN(testInput)) {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
   } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
        alert("Must be a number!");
   } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number"){
        alert("Enter a valid name!");
   } else {
   let captain = document.getElementById("pilotStatus");
   let firstMate = document.getElementById("copilotStatus");
   let fuelTank = document.getElementById("fuelStatus");
   let theStuff = document.getElementById("cargoStatus");
   let canWeLaunch = document.getElementById("launchStatus");
   captain.innerHTML = `Pilot ${pilot} is ready for launch`;
   firstMate.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    list.style.visibility = 'visible';
    if (fuelLevel < 10000 && cargoLevel > 10000) {
       fuelTank.innerHTML = "Fuel level too low for launch";
       theStuff.innerHTML = "Cargo mass too heavy for launch";
       canWeLaunch.innerHTML = "Shuttle Not Ready for Launch";
       canWeLaunch.style.color = "rgb(199, 37, 78)";
   } else if (fuelLevel < 10000 && cargoLevel <= 10000) {
       fuelTank.innerHTML = "Fuel level too low for launch";
       theStuff.innerHTML = "Cargo mass low enough for launch"
       canWeLaunch.innerHTML = "Shuttle Not Ready for Launch";
       canWeLaunch.style.color = "rgb(199, 37, 78)";       
   } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
       fuelTank.innerHTML = "Fuel level high enough for launch";
       theStuff.innerHTML = "Cargo mass too heavy for launch";
       canWeLaunch.innerHTML = "Shuttle Not Ready for Launch";
       canWeLaunch.style.color = "rgb(199, 37, 78)";
   } else if (fuelLevel >= 10000 && cargoLevel <= 10000) {
       fuelTank.innerHTML = "Fuel level high enough for launch";
       theStuff.innerHTML = "Cargo mass low enough for launch";
       canWeLaunch.innerHTML = "Shuttle is Ready for Launch";
       canWeLaunch.style.color = "rgb(65, 159, 106)";
   }
   
//    else if (fuelLevel >= 10000) {
        
//    }
}
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
