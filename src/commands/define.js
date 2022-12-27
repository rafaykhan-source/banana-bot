const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

async function getWebsterDictionaryDefinition(term) {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${term}`
    );
    const formatted = formatWebsterDefinitionResponse(response.data);
    return formatted;
  } catch (error) {
    console.error(error);
    return `There was an error while fetching a definition for the term: ${term}`;
  }
}

function formatWebsterDefinitionResponse(data) {
  if (!data) {
    return "No definition found.";
  }
  closestDefinitions = data[0];
  const term = closestDefinitions.word;
  const phonetics = closestDefinitions.phonetics.map(
    (phonetic) => phonetic.text
  );
  const partOfSpeech = closestDefinitions.meanings.map(
    (meaning) => meaning.partOfSpeech
  );
  // Maps meanings to their parts of speech.
  // TODO: Clean this up
  const definitions = closestDefinitions.meanings.map(
    (meaning) =>
      `${meaning.partOfSpeech}:\n\t${meaning.definitions
        .map(
          (definition, index) =>
            `${index + 1}. ${definition.definition}${
              definition.example ? `\n\t\t\tExample: *${definition.example}*` : ``
            }`
        )
        .join("\n\t")}`
  );

  return `${term} | (${phonetics.join(", ")}) | ${partOfSpeech.join(
    ", "
  )}\n${definitions.join("\n\n")}`;
}

async function getUrbanDictionaryDefinition(term) {
  term = cleanUrbanDictionaryTerm(term);
  try {
    const response = await axios.get(
      `https://api.urbandictionary.com/v0/define?term=${term}`
    );
    const formatted = formatUrbanDictionaryDefinitionResponse(response.data);
    return formatted;
  } catch (error) {
    console.error(error);
    return `There was an error while fetching a definition for the phrase: ${term}`;
  }
}

function cleanUrbanDictionaryTerm(phrase) {
  return phrase.replace(/ /g, "+");
}

function formatUrbanDictionaryDefinitionResponse(data) {
  if (!data) {
    return "No definition found.";
  }
  const definitions = data.list.map(
    (definition, index) =>
      `${index + 1}. ${definition.definition}${
      definition.example ? `\nExample: *${definition.example}*` : ``
      }`
  );
  return `${data.list[0].word}\n${definitions.join("\n\n")}`;

}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("define")
    .setDescription("Defines a term.")
    .addStringOption((option) =>
      option
        .setName("method")
        .setDescription("The method to use to define the term.")
        .setRequired(true)
        .addChoices(
          { name: "webster-dictionary", value: "web" },
          { name: "urban-dictionary", value: "urb" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("term")
        .setDescription("The term to define.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const term = interaction.options.getString("term");
    const method = interaction.options.getString("method");
    let definition;
    if (method === "web") {
      definition = await getWebsterDictionaryDefinition(term);
    } else if (method === "urb") {
      definition = await getUrbanDictionaryDefinition(term);
    }
    if (!definition) {
      definition = "No definition found.";
    }
    
    await interaction.reply(definition.slice(0, 2000));

    let index = 2000;
    while (index < definition.length) {
      await interaction.followUp(definition.slice(index, index + 2000));
      index += 2000;
    }
  },
};
