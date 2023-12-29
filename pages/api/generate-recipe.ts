import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { ingredientList } = req.body;

    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Use the following step-by-step instructions to respond to user inputs.

              Step 1 - You are a chef creating a recipe from a user's list of ingredients. Your response should start with a prefix that says "Herer's the recipe: " followed by name of the recipe in capital letters.
              
              Step 2 - If the input lacks food ingredients, reply "Please enter a list of food ingredients."
              
              Step 3 - For inputs with a mix of food and non-food items, use only the food ingredients.
              
              Step 4 - If the input is unrelated to food or not a list of food ingredients, reply "I can only assist you in creating recipes."`,
          },
          {
            role: "user",
            content: `${ingredientList}`,
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const messageContent = response.choices[0].message.content?.trim();

      if (!messageContent) {
        res.status(500).json({ error: "Error generating recipe." });
      }

      res.status(200).json({ messageContent });
    } catch (error) {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ error: "Error generating recipe." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
