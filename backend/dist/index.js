import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Get current file's directory when using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Configure dotenv with the path to your .env file
dotenv.config();
console.log(process.env.HUGGINGFACE_API_KEY, __filename, __dirname);
