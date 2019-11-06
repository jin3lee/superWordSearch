const fs = require('fs')

try {
  const data = fs.readFileSync('/Users/josephlee/Desktop/Projects/superWordSearch/input-nowrap.txt', 'utf8')
  // console.log(data)
  let dimensions = getDimensions( data );
  let lettersIn2DArray = getLettersIn2DArray( dimensions, data );
  // console.log(dimensions);
} catch (err) {
  console.error(err)
}

function getDimensions( data ) {
  let arrayOfLines = data.trim().split('\n');
  let dimensions = arrayOfLines[0].split(' ');
  let width = dimensions[0];
  let height = dimensions[1];
  let returnDimensionsObject = { width: width, height: height };
  return returnDimensionsObject;
}

function getLettersIn2DArray( dimensions, data ) {
  let lettersInRow = data.trim().split('\n');

  for( var rowIndex = 1; rowIndex < 1 + parseInt(dimensions.height); rowIndex++ ) {
    for( var letterIndex = 0; letterIndex < dimensions.width; letterIndex++ )  {
      // console.log( "getLettersIn2DArray: " + lettersInRow[rowIndex][letterIndex] );
    }
  }
}

function initializeLetterNode2DArray( width, height ) {
  var array = new Array( height );
  for(var i = 0; i < height; i++) {
    array[i] = new Array( width );
  }
  return array;
}

function print2DArray( array ) {
  var printString = "";
  for( var i = 0; i < array.length; i++ ) {
    printString += "[";
    for( var j = 0; j < array[0].length; j++) {
      printString += array[i][j] + ((j !== array[0].length-1) ? ', ' : '');
      console.log(array[i][j]);
    }
    printString += "]\n";
  }
  console.log(printString);
}

print2DArray(initializeLetterNode2DArray(3, 3));

function LetterNode( passedValue ) {
  this.topLeft = null;
  this.topMiddle = null;
  this.topRight = null;
  this.left = null;
  this.value = passedValue;
  this.right = null;
  this.botLeft = null;
  this.botMiddle = null;
  this.botRight = null;
}
