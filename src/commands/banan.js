const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

function createShutterStockImageInfoUrl(imgId) {
  return `https://www.shutterstock.com/studioapi/images/${imgId}`;
}

async function getShutterStockQueryInfo(searchTerm, pageNumber = 1) {
  const response = await axios.get(
    `https://www.shutterstock.com/studioapi/images/search?searchterm=${searchTerm}&page=${pageNumber}`,
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

async function getRandomShutterStockImage(searchTerm) {
  const imagesInfo = await getShutterStockQueryInfo(searchTerm);

  const total_pages = imagesInfo.meta.pagination.total_pages;
  const page_size = imagesInfo.meta.pagination.page_size;

  const randomPageNumber = Math.floor(Math.random() * total_pages);
  const randomImageIndex = Math.floor(Math.random() * page_size);

  const randomImageInfo = await getShutterStockQueryInfo(
    searchTerm,
    randomPageNumber
  );
  const randomImage = randomImageInfo.data[randomImageIndex];
  const randomImageId = randomImage.id;
  const randomImageInfoUrl = createShutterStockImageInfoUrl(randomImageId);

  const randomImageInfoResponse = await axios.get(randomImageInfoUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Accept-Encoding": "gzip,deflate,compress",
    },
  });
  const randomImageUrl = randomImageInfoResponse.data.data.attributes.src;

  return randomImageUrl;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banan")
    .setDescription("Sends a random picture of a banan."),

  async execute(interaction) {
    const url = await getRandomShutterStockImage("banana");
    await interaction.reply(url);
  },
};
