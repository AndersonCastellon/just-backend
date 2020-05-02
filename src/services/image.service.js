var fs = require('fs');
var path = require('path');

function getImage(collection, filename) {
  return new Promise((resolve, reject) => {
    var imagePath = path.resolve(
      __dirname,
      `../uploads/${collection}/${filename}`
    );

    if (fs.existsSync(imagePath)) {
      resolve(imagePath);
    } else {
      var noImagePath = path.resolve(__dirname, '../assets/no-img.jpg');
      resolve(noImagePath);
    }
  });
}

module.exports = {
  getImage
};
