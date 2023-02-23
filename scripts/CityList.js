import { getWalkers } from "./database.js"

// changed getWalker to getWalkers to match imported fx from database.js
const walkers = getWalkers()


export const CityList = () => {
    // changed to an unordered list
    let citiesHTML = "<ul>"

    for (const walker of walkers) {
        // changed currentWalker to walker to match for..of loop
        citiesHTML += `<li>${walker.city}</li>`
    }

    citiesHTML += "</ul>"

    return citiesHTML
}

