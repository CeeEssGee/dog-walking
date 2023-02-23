import { getPets } from "./database.js"

// Add a click event listener to your HTML document.
document.addEventListener("click", (clickEvent) => {
    // Store the target HTML element of the click event in a variable.
    const itemClicked = clickEvent.target
    // Check if the id property of the element starts with the string of "pet".
    if (itemClicked.id.startsWith("pet")) {
        // If it does, use the split() method on the id property to get an array of two string (e.g. ["pet", "4"])
        const [,petPrimaryKey] = itemClicked.id.split("--")
        // Use array deconstruction to assign the primary key to a variable named petPrimaryKey.
        for (const pet of pets) {
            if (pet.id === parseInt (petPrimaryKey)) {
                window.alert(`${pet.name} barkes at you`)
            }
        }
        
    }
})

// above is event listener code

const pets = getPets()

export const RegisteredPets = () => {
    let petHTML = "<ul>"

    for (const pet of pets) {
        // Update the code in RegisteredPets module so that the <li> for each pet has an id attribute with the following format id="pet--1". The primary key should be correct for each element.
        petHTML += `<li id="pet--${pet.id}">${pet.name}</li>`
    }

    petHTML += "</ul>"

    return petHTML
}

