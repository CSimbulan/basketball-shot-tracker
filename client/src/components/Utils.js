/*
Calculate the classification of a shot given the x and y coordinates.
Clissify the shot based on distance, location, and amount of points.
*/
export const getShotClassifications = (x, y) => {
    // Bounds for shots in the paint.
    if (x >= 7 && x <= 11) {
        if (y >= 0 && y <= 7) {
            return ["Close Range", "Paint", "2PT"];
        }
        else if (y >= 8 && y <= 10) {
            return ["Mid Range", "Top of the Key", "2PT"]
        }
        else if (y >= 11 && y <= 13) {
            return ["Long Range", "Top of the Key", "3PT"]
        }
    }
    if ((x >= 2 && x <= 6) || (x >= 12 && x <= 16)) {
        // Bounds for short corner jumper.
        if (y >= 0 && y <= 3) {
            return ["Mid Range", "Short Corner", "2PT"];
        }
        // Bounds for mid range elbow.
        else if (((y === 4 || y === 5) && ((x >= 2 & x <= 6) || (x >= 12 && x <= 16))) || ((y === 6 || y === 7) && ((x >= 3 & x <= 6) || (x >= 12 && x <= 15))) ||
            (y === 8 && ((x >= 4 & x <= 6) || (x >= 12 && x <= 14))) || (y === 9 && ((x >= 5 & x <= 6) || (x >= 12 && x <= 13)))) {
            return ["Mid Range", "Elbow", "2PT"];
        }
    }
    if ((x >= 0 && x <= 6) || (x >= 12 && x <= 18)) {
        //Bounds for corner three pointers.
        if ((y >= 0 && y <= 3) && (x === 0 || x === 1 || x === 17 || x === 18)) {
            return ["Long Range", "Corner", "3PT"]
        }
        //Bounds for elbow three pointers.
        if (((y === 4 || y === 5) && ((x >= 0 & x <= 1) || (x >= 17 && x <= 18))) || ((y === 6 || y === 7) && ((x >= 0 & x <= 2) || (x >= 16 && x <= 18))) ||
            (y === 8 && ((x >= 0 & x <= 3) || (x >= 15 && x <= 18))) || (y === 9 && ((x >= 0 & x <= 4) || (x >= 14 && x <= 18))) ||
            (y >= 10 && y <= 13)) {
            return ["Long Range", "Elbow", "3PT"];
        }
    }
    // Bounds for half court shots.
    if (y >= 14) {
        return ["Long Range", "Half Court", "3PT"];
    }
    // Default.
    return ["?", "?", "?"];
}

/*
Create a random pairing a marker and color.
*/
export const generateRandomMarker = () => {
    let symbols = ["fab fa-canadian-maple-leaf",
        "fas fa-apple-alt", "fas fa-star", "far fa-star", "fas fa-circle",
        "fas fa-square", "fas fa-moon", "fas fa-basketball-ball", "fas fa-crown",
        "fas fa-times", "far fa-gem"];
    let colors = ["red", "royalblue", "gold", "black", "#22ff00", "#32a852", "#f27500", "#640af5", "#0ad2f5", "white", "#f78cff"];
    let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return [randomSymbol, randomColor];
}