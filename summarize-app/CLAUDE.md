# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack AI text summarization application using OpenAI's Responses API (GPT-4o-mini). It features both standard and streaming summarization with configurable modes and tones.

**Architecture**: Monorepo with separate `backend/` and `client/` directories.

## Development Commands

### Backend (Express server)
```bash
cd backend
npm install
npm run dev     # Development with nodemon
npm start       # Production
```

Backend runs on port 3000 (configurable via `PORT` env var).

### Client (React + Vite)
```bash
cd client
npm install
npm run dev     # Development server
npm run build   # Production build
npm run lint    # ESLint
npm run preview # Preview production build
```

## Environment Setup

**Backend** (`backend/.env`):
- `OPENAI_API_KEY` - Required for OpenAI API access

**Client** (`client/.env.local`):
- `VITE_API_URL` - Backend URL (defaults to `http://localhost:3000`)

## Architecture

### Backend (`backend/`)

**Entry**: `server.js` - Express server with CORS and JSON middleware

**Key Endpoints**:
- `GET /` - Health check
- `GET /api/options` - Returns available summarization modes/tones
- `POST /summarize` - Standard summarization (waits for full response)
- `POST /api/summarize/stream` - Server-Sent Events (SSE) streaming

**Core Logic**: `services/openai.js`
- `generateSummary()` - Uses OpenAI Responses API for standard requests
- `generateSummaryStream()` - Streams responses in real-time via SSE
- Handles token counting and cost calculation (input: $0.4/1M tokens, output: $1.6/1M)
- Configuration objects: `SUMMARIZATION_MODES` (short/medium/bullets/detailed) and `TONES` (professional/casual/academic/simple)

### Client (`client/`)

**Entry**: `src/main.jsx` → `src/App.jsx`

**State Management**: Custom hook `hooks/useSummarize.js` centralizes all state and API logic

**API Layer**: `services/api.js`
- `summarizeText()` - Axios POST for standard requests
- `summarizeTextStream()` - Fetch API with ReadableStream for SSE
- `getOptions()` - Fetches available modes/tones

**Components** (in `components/`):
- `TextInput` - Textarea for input text
- `Select` - Dropdown for mode/tone selection
- `Button` - Action buttons
- `SummaryResult` - Displays summarized output (supports markdown via react-markdown)
- `StatsDisplay` - Shows token usage and cost
- `ErrorMessage` - Error display

**Note**: Streaming mode is enabled by default (`useStreaming: true` in hook) but UI toggle is currently commented out in App.jsx.

## Key Implementation Details

- **OpenAI Responses API**: Uses `openai.responses.create()` and `openai.responses.stream()` (not the Chat Completions API)
- **Streaming Flow**: Backend emits SSE events → Client uses Fetch ReadableStream → Chunks appended to UI in real-time
- **Validation**: Max 10,000 character limit enforced on both client and server
- **Error Handling**: Status-specific error messages for 401 (invalid key), 429 (rate limit), 500 (service error)

## Testing

API tests are located in `backend/API_TEST/` (Bruno format).
- When add new text into the website always keep the style, font, color, size consistent with the rest of the website