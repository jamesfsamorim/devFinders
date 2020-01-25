module.exports = function parseStringAsArray(stringAsArray) {
    return stringAsArray.split(',').map( text => text.trim() )
}