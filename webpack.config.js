//Para configurar la ruta
const path = require("path");
//Para trabajar con html
const HtmlWebpackPlugin = require("html-webpack-plugin");
//Para trabajar con Css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Para trabajar con Archivos
const CopyPlugin = require ('copy-webpack-plugin');
//Para Comprimir Archivos
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//Para trabajar Con las Variables de entorno
const Dotenv = require('dotenv-webpack');
//Para limpiar las versiones anteriores de los archivos comprimidos
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  //Para comprimir todo los js
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  resolve: {
    extensions: [".js"],
    alias:{
      '@utils':path.resolve(__dirname,'src/utils/'),
      '@templates':path.resolve(__dirname,'src/templates/'),
      '@styles':path.resolve(__dirname,'src/styles/'),
      '@images':path.resolve(__dirname,'src/assets/images/')
    }
  },
  //Necesario para usar babel
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.css$/i,
        use:[MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.png/,
        type:'asset/resource'
      }
    ]
  },
  plugins: [
    //Para el plugin de html
    new HtmlWebpackPlugin({
      inject:true,
      template:'./public/index.html',
      filename:'./index.html'
    }),
    //Para el plugin de css
    new MiniCssExtractPlugin({
      filename:'assets/[name].[contenthash].css'
    }),
    //Para el plugin de Archivos
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname,"src","assets/images"),
          to:"assets/images"
        }
      ]
    }),
    new Dotenv(),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize:true,
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
}
