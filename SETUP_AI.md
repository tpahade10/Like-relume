# AI Feature Setup

The "Edit with AI" feature requires a Mistral AI API key to work.

## Getting Your API Key

1. Go to https://console.mistral.ai/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key

## Setting Up the API Key

### Option 1: Environment Variable (Recommended)

Set the `MISTRAL_API_KEY` environment variable:

**Windows (PowerShell):**
```powershell
$env:MISTRAL_API_KEY="your_api_key_here"
```

**Windows (Command Prompt):**
```cmd
set MISTRAL_API_KEY=your_api_key_here
```

**Linux/macOS:**
```bash
export MISTRAL_API_KEY="your_api_key_here"
```

### Option 2: Create a .env file

Create a `.env` file in the root directory:

```
MISTRAL_API_KEY=your_api_key_here
```

Note: Make sure `.env` is in your `.gitignore` to avoid committing your API key.

## Testing

1. Start the development server: `npm run dev`
2. Navigate to the builder page
3. Add a section
4. Click the AI (sparkles) icon on a section
5. Enter a prompt like "Make the background darker and add a gradient"
6. Click "Generate Changes"

The AI will generate Tailwind CSS classes and apply them to the section.

