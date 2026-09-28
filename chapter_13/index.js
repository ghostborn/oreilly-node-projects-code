import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = "gemini-flash-latest:generateContent";
const API_URL = `${BASE}/${MODEL}?key=${process.env.GEMINI_API_KEY}`;

console.log(API_URL, "!!!!");
