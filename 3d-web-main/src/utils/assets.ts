import banner from "../../public/images/banner.png";
import express from "../../public/images/express.webp";
import icon from "../../public/images/icon.ico";
import javascript from "../../public/images/javascript.webp";
import logo from "../../public/images/logo.png";
import mongo from "../../public/images/mongo.webp";
import mysql from "../../public/images/mysql.webp";
import next from "../../public/images/next.webp";
import node from "../../public/images/node.webp";
import placeholder from "../../public/images/placeholder.webp";
import react from "../../public/images/react.webp";
import typescript from "../../public/images/typescript.webp";
import character from "../../public/models/character.enc?url";
import environmentUrl from "../../public/models/char_enviorment.hdr?url";

const environment = environmentUrl.replace(
  /^data:application\/octet-stream/,
  "data:application/hdr"
);

export const imageAssets = {
  banner,
  express,
  icon,
  javascript,
  logo,
  mongo,
  mysql,
  next,
  node,
  placeholder,
  react,
  typescript,
};

export const modelAssets = {
  character,
  environment,
};
