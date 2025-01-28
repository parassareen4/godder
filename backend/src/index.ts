import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

// Define the type for the queryLLM function parameters
interface QueryLLMParams {
    prompt: string;
    max_new_tokens?: number;
    temperature?: number;
    top_p?: number;
}

async function queryLLM({ prompt, max_new_tokens = 300, temperature = 0.3, top_p = 0.9 }: QueryLLMParams): Promise<string | undefined> {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",
            {
                inputs: prompt,
                parameters: {
                    max_new_tokens,
                    temperature,
                    top_p,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 15000, // 15-second timeout
            }
        );

        // Check if the response contains valid data
        if (response.data && Array.isArray(response.data) && response.data[0]?.generated_text) {
            return response.data[0].generated_text;
        } else {
            console.error("Unexpected response format:", response.data);
            return undefined;
        }
    } catch (error: any) {
        // Handle errors gracefully
        if (axios.isAxiosError(error)) {
            console.error(`LLM Error: ${error.response?.data?.error || error.message}`);
        } else {
            console.error(`LLM Error: ${error.message}`);
        }
        return undefined;
    }
}

// Usage
(async () => {
    const answer = await queryLLM({ prompt: "Make me a todo app" });
    if (answer) {
        console.log(answer);
    } else {
        console.log("Failed to get a response from the LLM.");
    }
})();