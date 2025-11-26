import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const response = await client.responses.create({
    model: 'gpt-5.1', // Best for tool use
    input: 'Find the latest news about Tesla and summarize it.',

    tools: [
      { type: 'web_search' }, // lets model search the web
      { type: 'deep_research' }, // long-form reasoning
      { type: 'code_interpreter' }, // python execution
      { type: 'file_search' }, // for file-based tasks
    ],

    // optional — allows the model to choose ANY tool or NONE
    tool_choice: 'auto',
  });

  console.log(JSON.stringify(response.output[0].content, null, 2));
}

run();
