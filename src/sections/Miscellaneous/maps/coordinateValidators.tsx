/**
 * @brief Validators and Converters for Geo Coordinate formats.
 */

enum CoordinateFormat {
    GlobalDecimalDegrees = 'DECIMAL_DEGREES',
    GlobalDegreesDecimalMinutes = 'DEGREES_DECIMAL_MINUTES',
    GlobalDegreesMinutesSeconds = 'DEGREES_MINUTES_SECONDS',
    LocalPosition = 'LOCAL_POSITION',
    Invalid = 'INVALID',
}

function parseDecimalDegreeLatitude(dd: string): number {
    dd = parseCoordinateDirection(dd);

    // Verify if the latitude is a valid coordinate.
    if (!isLatDD(dd)) {
        return NaN;
    }

    // Split the coordinate e.g. -14.55°  -> [-14.55]
    const latitudeArr = splitCoordinate(dd);

    // Format the coordinate.
    const decimalDegree: number = Number(Number(latitudeArr[0]).toFixed(5));

    return isLatDD(decimalDegree.toString()) ? decimalDegree : NaN;
}

function parseDecimalDegreeLongitude(dd: string): number {
    dd = parseCoordinateDirection(dd);

    // Verify if the Longitude is a valid coordinate.
    if (!isLongDD(dd)) {
        return NaN;
    }

    // Split the coordinate e.g. -14.55°  -> [-14.55]
    const longitudeArr = splitCoordinate(dd);

    // Format the coordinate.
    const decimalDegree: number = Number(Number(longitudeArr[0]).toFixed(5));

    return isLongDD(decimalDegree.toString()) ? decimalDegree : NaN;
}

// Convert Latitude from Degree Minutes Seconds to Decimal Degree
function convertLatitudeDMStoDD(dms: string): number {
    dms = parseCoordinateDirection(dms);

    // If the coordinate is an invalid DMS lat & an invalid DMS long.
    if (!isLatDMS(dms)) {
        return NaN;
    }

    // Split the coordinate e.g. -14° 27' 56.1'' -> [-14, 27, 56.1]
    const dmsArr = dms.split(/[^\d\w.-]+/);
    let deg: number = Number(dmsArr[0]);
    const min: number = Number(dmsArr[1]);
    const sec: number = Number(dmsArr[2]);
    let direction: number = 1;

    // Separate direction from degree
    if (deg <= 0) {
        direction = -1;
        deg = deg * -1;
    }

    // Standard formula
    let decimalDegree: number = Number(deg) + Number(min / 60) + Number(sec / 3600);
    decimalDegree = Number((decimalDegree * direction).toFixed(5));

    return isLatDD(decimalDegree.toString()) ? decimalDegree : NaN;
}

// Convert Longitude from Degree Minutes Seconds to Decimal Degree
function convertLongitudeDMStoDD(dms: string): number {
    dms = parseCoordinateDirection(dms);

    // If the coordinate is an invalid DMS lat & an invalid DMS long.
    if (!isLongDMS(dms)) {
        return NaN;
    }

    // Split the coordinate e.g. -14° 27' 56.1'' -> [-14, 27, 56.1]
    const dmsArr = dms.split(/[^\d\w.-]+/);
    let deg: number = Number(dmsArr[0]);
    const min: number = Number(dmsArr[1]);
    const sec: number = Number(dmsArr[2]);
    let direction: number = 1;

    // Separate direction from degree
    if (deg <= 0) {
        direction = -1;
        deg = deg * -1;
    }

    // Standard formula
    let decimalDegree: number = Number(deg) + Number(min / 60) + Number(sec / 3600);
    decimalDegree = Number((decimalDegree * direction).toFixed(5));

    return isLongDD(decimalDegree.toString()) ? decimalDegree : NaN;
}

// Convert Latitude from Degree Decimal Minutes to Decimal Degree
function convertLatitudeDDMtoDD(ddm: string): number {
    ddm = parseCoordinateDirection(ddm);

    // If the coordinate is an invalid DMS lat & an invalid DMS long.
    if (!isLatDDM(ddm)) {
        return NaN;
    }

    // Split the coordinate e.g. -14° 27' -> [-14, 27]
    const ddmArr = ddm.split(/[^d\w\.-]+/);
    let deg = Number(ddmArr[0]);
    const decimalMin = Number(ddmArr[1]);
    let direction = Number(1);

    // Separate direction from degree
    if (deg <= 0) {
        direction = -1;
        deg = deg * -1;
    }

    // Standard formula
    let decimalDegree: number = Number(deg) + Number(decimalMin / 60);
    decimalDegree = Number((decimalDegree * direction).toFixed(5));

    return isLatDD(decimalDegree.toString()) ? decimalDegree : NaN;
}

// Convert Longitude from Degree Minutes Seconds to Decimal Degree
function convertLongitudeDDMtoDD(ddm: string): number {
    ddm = parseCoordinateDirection(ddm);

    // If the coordinate is an invalid DMS lat & an invalid DMS long.
    if (!isLongDDM(ddm)) {
        return NaN;
    }

    // Split the coordinate e.g. -14° 27' -> [-14, 27]
    const ddmArr = ddm.split(/[^d\w\.-]+/);
    let deg = Number(ddmArr[0]);
    const decimalMin = Number(ddmArr[1]);
    let direction = Number(1);

    // Separate direction from degree
    if (deg <= 0) {
        direction = -1;
        deg = deg * -1;
    }

    // Standard formula
    let decimalDegree: number = Number(deg) + Number(decimalMin / 60);
    decimalDegree = Number((decimalDegree * direction).toFixed(5));

    return isLongDD(decimalDegree.toString()) ? decimalDegree : NaN;
}

// Converts the Coordinate direction from N/E/W/S to +/- e.g. 14° 27' 56.1''S to -14° 27' 56.1''
function parseCoordinateDirection(coordinate: string) {
    // Trim whitespace before parsing.
    coordinate = coordinate.trim();

    // Detect the direction letter i.e. N/E/W/S. It is the last element in the string.
    const direction = coordinate[coordinate.length - 1];
    const isDirection = direction.length == 1 && direction.match(/[newsNEWS]/) != null;

    if (isDirection) {
        // If direction letter is found, the coordinate shouldn't have a negative symbol.
        if (coordinate[0] == '-') {
            return '';
        }

        // If direction is South or West, prepend negative symbol to the coordinate.
        if (direction.toUpperCase() == 'S' || direction.toUpperCase() == 'W') {
            coordinate = '-' + coordinate;
        }

        // Return the coordinate without the direction letter.
        coordinate = coordinate.substring(0, coordinate.length - 1);
    }

    // Trim whitespace after parsing.
    return coordinate.trim();
}

// Split the coordinate on occurrence of degree(°), minutes (') or seconds ('' / ")
// e.g. -14° 27' 56.1'' -> [-14, 27, 56.1]
function splitCoordinate(coordinate: string) {
    return coordinate.split(/[°'"]+/).filter(function (el) {
        return el.length !== 0;
    });
}

// Check all the coordinate format to verify if latitude is correct.
function parseLatitudeFormat(latitude: string) {
    latitude = parseCoordinateDirection(latitude);
    if (isLatDD(latitude)) return CoordinateFormat.GlobalDecimalDegrees;
    else if (isLatDMS(latitude)) return CoordinateFormat.GlobalDegreesMinutesSeconds;
    else if (isLatDDM(latitude)) return CoordinateFormat.GlobalDegreesDecimalMinutes;
    else return CoordinateFormat.Invalid;
}

// Check all the coordinate format to verify if longitude is correct.
function parseLongitudeFormat(longitude: string) {
    longitude = parseCoordinateDirection(longitude);
    if (isLongDD(longitude)) return CoordinateFormat.GlobalDecimalDegrees;
    else if (isLongDMS(longitude)) return CoordinateFormat.GlobalDegreesMinutesSeconds;
    else if (isLongDDM(longitude)) return CoordinateFormat.GlobalDegreesDecimalMinutes;
    else return CoordinateFormat.Invalid;
}

// Check if Latitude is of valid Decimal Degree format
function isLatDD(latitude: string) {
    const latitudeArr = splitCoordinate(latitude);

    // Latitude array must only contain 1 element i.e. Decimal Degrees
    if (latitudeArr.length === 1) {
        const degree = Number(latitudeArr[0].trim());
        const validDegree = !Number.isNaN(degree) && degree >= -90 && degree <= 90;
        return latitudeArr.length === 1 && validDegree;
    } else {
        return false;
    }
}

// Check if Latitude is of valid Degree. Minutes and Seconds format
function isLatDMS(latitude: string) {
    const latitudeArr = splitCoordinate(latitude);

    // Latitude array must only contain 3 element i.e. Degrees, Minutes and Seconds.
    if (latitudeArr.length === 3) {
        let degree = Number(latitudeArr[0]);
        const minutes = Number(latitudeArr[1]);
        const seconds = Number(latitudeArr[2]);
        let direction = 1;

        // Separate direction from degree
        if (degree <= 0) {
            direction = -1;
            degree = degree * -1;
        }

        // Range checks.
        const validDegree = !Number.isNaN(degree) && degree >= 0 && degree <= 90;
        const validMinutes = !Number.isNaN(minutes) && minutes >= 0 && minutes <= 60;
        const validSeconds = !Number.isNaN(seconds) && seconds >= 0 && seconds <= 60;
        return validDegree && validMinutes && validSeconds;
    } else {
        return false;
    }
}

// Check if Latitude is of valid Degree & Decimal Minutes format
function isLatDDM(latitude: string) {
    const latitudeArr = splitCoordinate(latitude);

    // Latitude array must only contain 2 element i.e. Degrees and Decimal Minutes
    if (latitudeArr.length === 2) {
        let degree = Number(latitudeArr[0]);
        const minutes = Number(latitudeArr[1]);
        let direction = 1;

        // Separate direction from degree
        if (degree <= 0) {
            direction = -1;
            degree = degree * -1;
        }

        // Range checks.
        const validDegree = !Number.isNaN(degree) && degree >= 0 && degree <= 90;
        const validMinutes = !Number.isNaN(minutes) && minutes >= 0 && minutes <= 60;
        return validDegree && validMinutes;
    } else {
        return false;
    }
}

// Check if Longitude is of valid Decical Degree format
function isLongDD(longitude: string) {
    const longitudeArr = splitCoordinate(longitude);

    // Longitude array must only contain 1 element i.e. Decical Degrees
    if (longitudeArr.length === 1) {
        const degree = Number(longitudeArr[0]);
        const validDegree = !Number.isNaN(degree) && degree >= -180 && degree <= 180;
        return validDegree;
    } else {
        return false;
    }
}

// Check if Longitude is of valid Degree, Minutes and Seconds format
function isLongDMS(longitude: string) {
    const longitudeArr = splitCoordinate(longitude);

    // Longitude array must only contain 3 element i.e. Degrees, Minutes and Seconds.
    if (longitudeArr.length === 3) {
        let degree = Number(longitudeArr[0]);
        const minutes = Number(longitudeArr[1]);
        const seconds = Number(longitudeArr[2]);
        let direction = 1;

        // Separate direction from degree
        if (degree <= 0) {
            direction = -1;
            degree = degree * -1;
        }

        // Range checks
        const validDegree = !Number.isNaN(degree) && degree >= 0 && degree <= 180;
        const validMinutes = !Number.isNaN(minutes) && minutes >= 0 && minutes <= 60;
        const validSeconds = !Number.isNaN(seconds) && seconds >= 0 && seconds <= 60;
        return validDegree && validMinutes && validSeconds;
    } else {
        return false;
    }
}

// Check if Longitude is of valid Degree and Decimal Minutes format
function isLongDDM(longitude: string) {
    const longitudeArr = splitCoordinate(longitude);

    // Longitude array must only contain 2 element i.e. Degrees and Decimal Minutes
    if (longitudeArr.length === 2) {
        let degree = Number(longitudeArr[0]);
        const minutes = Number(longitudeArr[1]);
        let direction = 1;

        // Separate direction from degree
        if (degree <= 0) {
            direction = -1;
            degree = degree * -1;
        }

        // Range checks
        const validDegree = !Number.isNaN(degree) && degree >= 0 && degree <= 180;
        const validMinutes = !Number.isNaN(minutes) && minutes >= 0 && minutes <= 60;
        return validDegree && validMinutes;
    } else {
        return false;
    }
}

export default function parseCoordinates(coordinates: string) {
    // #00. Split the single coordinates string into lat, long.
    const coordinateArr = coordinates.split(',');
    if (coordinateArr.length !== 2) return undefined;

    // #01. Parse the coordinate format.
    const latitude = coordinateArr[0];
    const longitude = coordinateArr[1];
    const latitudeFormat: CoordinateFormat = parseLatitudeFormat(latitude);
    const longitudeFormat: CoordinateFormat = parseLongitudeFormat(longitude);
    if (
        latitudeFormat === CoordinateFormat.Invalid ||
        longitudeFormat === CoordinateFormat.Invalid
    ) {
        return undefined;
    }

    // #02. Convert the coordinates into Decimal Degree format for Mapbox-gl
    const LAT_CONVERSION = {
        [CoordinateFormat.GlobalDegreesDecimalMinutes]: convertLatitudeDDMtoDD,
        [CoordinateFormat.GlobalDegreesMinutesSeconds]: convertLatitudeDMStoDD,
        [CoordinateFormat.GlobalDecimalDegrees]: parseDecimalDegreeLatitude,
        [CoordinateFormat.Invalid]: () => NaN,
    };
    const LONG_CONVERSION = {
        [CoordinateFormat.GlobalDegreesDecimalMinutes]: convertLongitudeDDMtoDD,
        [CoordinateFormat.GlobalDegreesMinutesSeconds]: convertLongitudeDMStoDD,
        [CoordinateFormat.GlobalDecimalDegrees]: parseDecimalDegreeLongitude,
        [CoordinateFormat.Invalid]: () => NaN,
    };
    const latitudeInDD: number = LAT_CONVERSION[latitudeFormat](latitude);
    const longitudeInDD: number = LONG_CONVERSION[longitudeFormat](longitude);
    if (Number.isNaN(latitudeInDD) || Number.isNaN(longitudeInDD)) return undefined;

    // #03. Returned the parsed coordinates.
    return {
        latitudeInDD: LAT_CONVERSION[latitudeFormat](latitude),
        longitudeInDD: LONG_CONVERSION[longitudeFormat](longitude),
        latitudeFormat,
        longitudeFormat,
    };
}
