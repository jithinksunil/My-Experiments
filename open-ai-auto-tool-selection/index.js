import OpenAI from 'openai';
import dotenv from 'dotenv';
import { zodTextFormat } from 'openai/helpers/zod';
import { z } from 'zod';
dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  // const data = fs.readFileSync('pitchdeck.pdf');
  // const base64String = data.toString('base64');
  // const file = await client.files.create({
  //   file: fs.createReadStream('pitchdeck.pdf'),
  //   purpose: 'user_data',
  // });

  const Details = z.object({
    details: z.string(),
  });

  const stream = await client.responses.create({
    model: 'gpt-5-nano', // Best for tool use
    text: {
      format: zodTextFormat(Details, 'details'),
    },
    input: [
      {
        role: 'user',
        content: [
          {
            type: 'input_file',
            file_id: 'file-2ene4X3QUnpqBzRCkYoXEX',
          },
          {
            type: 'input_text',
            text: 'What is the document about? Who are the founders, check if the company is still running or not and give current status',
          },
        ],
      },
    ],
    reasoning: { effort: 'low' },
    tools: [
      { type: 'web_search', search_context_size: 'high' }, // lets model search the web
      //   { type: 'code_interpreter' }, // python execution
    ],
    // optional — allows the model to choose ANY tool or NONE
    tool_choice: 'auto',
    stream: true,
  });
  for await (const event of stream) {
    // console.log(event);
    if (event.type === 'response.output_text.delta') {
      process.stdout.write(event.delta);
    }
  }
}

run();
