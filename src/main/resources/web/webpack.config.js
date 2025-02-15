const path = require('path');

const isDev = true;

module.exports = {
  "entry": "./src/index.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js"
  },
  devtool: isDev && "source-map",
  "module": {
    "rules": [ {
      "test": /\.css$/,
      "use": [
        "style-loader",
        "css-loader",
      ]
    },
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [ "@babel/preset-env", ]
          }
        }
      },
    ]
  },
  plugins: [
  ],
  mode: isDev ? "development" : "production",
};