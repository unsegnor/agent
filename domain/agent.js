require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

module.exports = function(context){
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    const openai = new OpenAIApi(configuration);
    const defaultContext = `Be concise. Use the minimum amount of characters to answer. If the answer can be just a single word, answer that word.`
    let messages = []

    function addContext(context){
        messages.push({role: "system", content: context})    
    }

    addContext(defaultContext)
    if(context) addContext(context)

    return Object.freeze({
        send
    })

    async function send(message){
        messages.push({role: "user", content: message})

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0
          });

          response = completion.data.choices[0].message.content;
          messages.push({role: "assistant", content: response})
          if(response[response.length - 1] == "."){ response = response.slice(0, -1) }

          console.log(response)
        return response
    }
}