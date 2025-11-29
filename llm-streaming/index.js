import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const stream = await client.responses.create({
  model: 'gpt-5-nano',
  input: [
    {
      role: 'user',
      content: "Tell a story",
    },
  ],
  stream: true,
});
console.log('reached');

for await (const event of stream) {
  if (event.type === 'response.output_text.delta') {
    process.stdout.write(event.delta);
  }
}
