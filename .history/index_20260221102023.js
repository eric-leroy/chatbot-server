  const express = require('express');
  const cors = require('cors');
  const OpenAI = require('openai');

  const app = express();
  app.use(cors());
  app.use(express.json());

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  app.post('/chat', async (req, res) => {
    try {
      const { message } = req.body;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      });

      res.json({ reponse: response.choices[0].message.content
  });
    } catch (error) {
      res.status(500).json({ erreur: error.message });
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
  });