const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

async function getShutterStockQueryInfo(searchTerm, pageNumber = 1) {
  const formattedSearchTerm = searchTerm.toLowerCase().replace(" ", "-");
  const response = await axios.get(
    `https://www.shutterstock.com/_next/data/XDH1eJTLkmLwt9S0_KfwF/en/_shutterstock/search/
    ${formattedSearchTerm}.json?page=${pageNumber}&term=${formattedSearchTerm}&sort=relevant`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Encoding": "gzip,deflate,compress",
      },
    }
  );

  return response.data;
}

function getNumberOfPages(queryInfo) {
  return queryInfo.pageProps.meta.pagination.totalPages;
}

function getPageSize(queryInfo) {
  return queryInfo.pageProps.meta.pagination.pageSize;
}

async function getRandomShutterStockImage(searchTerm) {
  const imagesInfo = await getShutterStockQueryInfo(searchTerm);

  const total_pages = getNumberOfPages(imagesInfo);
  const page_size = getPageSize(imagesInfo);

  const contractionFactor = 100;
  let randomPageNumber = Math.floor(Math.random() * total_pages);
  randomPageNumber = Math.floor(randomPageNumber / 10);
  randomPageNumber = Math.max(randomPageNumber, 1);
  const randomImageIndex = Math.floor(Math.random() * page_size);

  const randomImageInfo = await getShutterStockQueryInfo(
    searchTerm,
    randomPageNumber
  );
  const randomImage = randomImageInfo.pageProps.assets[randomImageIndex];
  const randomImageSrc = randomImage.src;

  return randomImageSrc;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banan")
    .setDescription("Sends a random picture of a banan."),

  async execute(interaction) {
    const url = await getRandomShutterStockImage("yellow banana fruit");
    await interaction.reply(url);
  },
};
