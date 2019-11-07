const fs = require('fs')

try {
  const data = fs.readFileSync('/Users/josephlee/Desktop/Projects/superWordSearch/input-nowrap.txt', 'utf8')
  // console.log(data)
  let dimensions = getDimensions( data );
  let lettersIn2DArray = getLettersIn2DArray( dimensions, data );

  console.log(lettersIn2DArray[2,1].toString());
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

  // get data and where the array of letters start/end
  let lettersInRow = data.trim().split('\n');
  var return2DArray = initializeLetterNode2DArray( dimensions.width, dimensions.height );
  const firstRowIndex = 1;
  const lastRowIndex = parseInt( dimensions.height );

  // add letters into 2d array as letternodes
  for( var rowIndex = 1; rowIndex < 1 + parseInt( dimensions.height ); rowIndex++ ) {

    for( var letterIndex = 0; letterIndex < dimensions.width; letterIndex++ )  {
      var node = new LetterNode( lettersInRow[ rowIndex ][ letterIndex ] );
      // initialize first row LetterNode - WORKS
      if( rowIndex === firstRowIndex ) {
        return2DArray[0][letterIndex] = node;
        if(letterIndex !== 0) {
          return2DArray[0][letterIndex].setLeftNode(return2DArray[0][letterIndex-1]);
        }
      }

      // initialize end row LetterNode
      else if( rowIndex === lastRowIndex ) {
        // assign letternode to 2d array
        return2DArray[ return2DArray.length-1 ][ letterIndex ] = node;
        // assigns the left node
        if( letterIndex !== 0 ) {
          let leftNode = return2DArray[ return2DArray.length - 1 ][ letterIndex - 1 ];
          return2DArray[ return2DArray.length - 1 ][ letterIndex ].setLeftNode( leftNode );
          return2DArray[ return2DArray.length - 1 ][ letterIndex ].setTopLeftNode( return2DArray[ return2DArray.length - 2 ][ letterIndex - 1 ] );
        }
        // assigns top right
        if( letterIndex !== return2DArray[0].length - 1 ) {
          return2DArray[ return2DArray.length -1 ][ letterIndex ].setTopRightNode( return2DArray[ return2DArray.length -2 ][ letterIndex + 1 ] );
        }
        // assigns the top middle node
        return2DArray[ return2DArray.length - 1 ][ letterIndex ].setTopMiddleNode(return2DArray[ return2DArray.length - 2 ][ letterIndex ]);
      }

      // initialize between row LetterNode
      else {
        return2DArray[ rowIndex-1 ][ letterIndex ] = node;
        // set left & top left node
        if( letterIndex !== 0 ) {
          return2DArray[ rowIndex - 1 ][ letterIndex ].setLeftNode( return2DArray[ rowIndex-1 ][ letterIndex - 1 ] );
          return2DArray[ rowIndex - 1 ][ letterIndex ].setTopLeftNode( return2DArray[ rowIndex - 2 ][ letterIndex - 1 ] );
        }
        // assigns top right
        if( letterIndex !== return2DArray[0].length - 1 ) {
          return2DArray[ rowIndex - 1 ][ letterIndex ].setTopRightNode( return2DArray[ rowIndex - 2 ][ letterIndex + 1 ] );
        }
        // set top node
        return2DArray[ rowIndex-1 ][ letterIndex ].setTopMiddleNode( return2DArray[ rowIndex - 2 ][ letterIndex ] );
      }
    }
  }

  return return2DArray;
}

// function printReturn2DArray(array) {
//   for(var i = 0; i < array.length; i++) {
//     for(var j = 0; j < array[0].length; j++) {
//       console.log(array[i][j]);
//     }
//   }
// }

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
      printString += array[i][j] + (( j !== array[0].length - 1 ) ? ', ' : '');
    }
    printString += "]\n";
  }
  console.log(printString);
}

function LetterNode( letter ) {
  this.topLeft = null;
  this.topMiddle = null;
  this.topRight = null;
  this.left = null;
  this.value = letter;
  this.right = null;
  this.botLeft = null;
  this.botMiddle = null;
  this.botRight = null;

  this.setTopLeftNode = function( otherNode ) {
    this.topLeft = otherNode;
    otherNode.botRight = this;
  },
  this.setTopMiddleNode = function( otherNode ) {
    this.topMiddle = otherNode;
    otherNode.botMiddle = this;
  },
  this.setTopRightNode = function( otherNode ) {
    this.topRight = otherNode;
    otherNode.botLeft = this;
  },
  this.setLeftNode = function( otherNode ) {
    this.left = otherNode;
    otherNode.right = this;
  },
  this.setRightNode = function( otherNode ) {
    this.right = otherNode;
    otherNode.left = this;
  },
  this.setBotLeftNode = function( otherNode ) {
    this.botLeft = otherNode;
    otherNode.topRight = this;
  },
  this.setBotMiddleNode = function( otherNode ) {
    this.botMiddle = otherNode;
    otherNode.topMiddle = this;
  },
  this.setBotRightNode = function( otherNode ) {
    this.botRight = otherNode;
    otherNode.topLeft = this;
  },
  this.getValue = function() {
    return ( null != this.value) ? this.value : 'n/a';
  },

  this.toString = function() {
    let tl = (this.topLeft != null) ? this.topLeft.getValue() : '';
    let tm = (this.topMiddle != null) ? this.topMiddle.getValue() : '';
    let tr = (this.topRight != null) ? this.topRight.getValue() : '';

    let l = (this.left != null) ? this.left.getValue() : '';
    let r = (this.right != null) ? this.right.getValue() : '';

    let bl = (this.botLeft != null) ? this.botLeft.getValue() : '';
    let bm = (this.botMiddle != null) ? this.botMiddle.getValue() : '';
    let br = (this.botRight != null) ? this.botRight.getValue() : '';

    console.log("tl:"+tl ,"tm:"+tm, "tr:"+tr);
    console.log("l:"+l, "v:"+this.value, "r:"+r);
    console.log("bl:"+bl, "bm:"+bm, "br:"+br);
    console.log("--------------------------");
  }
}
