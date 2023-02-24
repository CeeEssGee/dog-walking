// import getCites and assign it to cities
import { getWalkers, getWalkerCities, getCities } from "./database.js"
let cities = getCities()


// added eventListener code
document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {
        /*
            The target of a click event is the most specific HTML element
            that was clicked by the user.
        */
        const itemClicked = clickEvent.target

        /*
            Only run the rest of the logic if a walker <li> was clicked
        */
        if (itemClicked.id.startsWith("walker")) {

            /*
                Extract the primary key from the id attribute of the list
                item that you clicked on. Refer back to the code you
                wrote for each list item. Note the format of the id
                attribute ("walker--2" if you clicked on the second one).

                This code splits that string apart into an array, and
                captures the "2" and assigns it to be the value of the
                `walkerId` variable.

                Splitting a string in JavaScript:
                    https://www.youtube.com/watch?v=u2ZocmM93yU

                Destructuring in JavaScript:
                    https://www.youtube.com/watch?v=UgEaJBz3bjY
            */
            const [,walkerId] = itemClicked.id.split("--")

            /*
                Now that you have the primary key of a walker object,
                find the whole object by iterating the walkers array.
            */
           // PUTTING IT ALL TOGETHER
                for (const walker of walkers) {
                    if (walker.id === parseInt(walkerId)) {
                        const assignments = filterWalkerCitiesByWalker(walker) //Walkers.js module
                        const cities = assignedCityNames(assignments) // Walker.js module
                
                        window.alert(`${walker.name} services ${cities}`)
                    }
                }
            
        }
    }
)
//above is the added event listener code


const walkers = getWalkers()


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        // changed walker.fullName to walker.name to match key value pair in object
        // replaced this code with code from event listener chapter
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"

    // returned walkerHTML
    return walkerHTML
}

/* 
    ERD:
    city.name -> city.id -> walkerCity.cityId -> walkerCity.walkerId -> walker.id -> walker.name
    or
    walker.name -> walker.id -> walkerCity.walkerId -> walkerCity.cityId -> city.id -> city.name
*/


const walkerCities = getWalkerCities() // database.js module


// FINDING CITIES PER WALKER: First, define a function that will get all objects in the walkerCities array that are for the walker that was clicked on. It should return an array of all matching objects.
const filterWalkerCitiesByWalker = (walker) => {
    let assignments = []
    for (const assignment of walkerCities) {
        if (assignment.walkerId === walker.id) {
            assignments.push(assignment)
        }
    }
    return assignments
}

// BUILDING CITY NAMES STRING: Then, define a function that take in the array of matching objects, and use the cityId property on each one to find the matching city name. It should return a string containing all the city names.

const assignedCityNames = (assignments) => {
    let cityNames = ""
    for (const assignment of assignments) {
        for (const city of cities) {
            if (city.id === assignment.cityId) {
                cityNames = `${cityNames} and ${city.name}`
            }
        }
        
    }
    return cityNames
    
}

