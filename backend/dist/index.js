import dotenv from 'dotenv';
import { HfInference } from "@huggingface/inference";
dotenv.config();
const client = new HfInference(process.env.HUGGINGFACE_API_KEY);
let out = "";
async function getAnswer(input) {
    const stream = client.chatCompletionStream({
        model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
        messages: [
            { role: "user", content: input }
        ],
        temperature: 0.5,
        max_tokens: 1000,
        top_p: 0.7
    });
    for await (const chunk of stream) {
        if (chunk.choices && chunk.choices.length > 0) {
            const newContent = chunk.choices[0].delta.content;
            out += newContent;
            process.stdout.write(newContent.replace(/\n/g, '') + '');
        }
    }
    process.stdout.write('\n');
}
getAnswer("What is the capital ddss why say it in a funny way");
