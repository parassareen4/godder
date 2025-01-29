import dotenv from 'dotenv';
import { HfInference } from "@huggingface/inference"
dotenv.config();

const client = new HfInference(process.env.HUGGINGFACE_API_KEY);

let out = "";

const stream = client.chatCompletionStream({
	model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
	messages: [
		{ role: "user", content: "hey wassup\n" }
	],
	temperature: 0.5,
	max_tokens: 2048,
	top_p: 0.7
});

for await (const chunk of stream) {
	if (chunk.choices && chunk.choices.length > 0) {
		const newContent = chunk.choices[0].delta.content;
		out += newContent;
		console.log(newContent);
	}  
}