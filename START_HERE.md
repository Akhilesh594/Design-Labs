# Start here — DesignLab submission

## What is included (assignment section 7)

| Requirement | Location |
|---|---|
| Research note | docs/RESEARCH.md |
| Design note | docs/DESIGN.md |
| Working prototype source | app/, lib/, components/ and project configuration |
| Tests | tests/practice.test.ts |
| Run instructions and limitations | README.md and this file |
| AI-assisted decisions | AI_USAGE.md |

Additional demo instructions are in DEMO_WALKTHROUGH.md. All source dependencies are pinned in package-lock.json. node_modules, local caches, credentials, and Git history are not bundled.

## Run on Windows (PowerShell)

1. Install Node.js 24 with npm from https://nodejs.org/en/download if needed. Restart PowerShell after installation.
2. Extract this ZIP using Extract All. Open the extracted DesignLab folder in VS Code, then choose Terminal > New Terminal. Make sure package.json is in the current folder.
3. Run these commands one at a time:

```powershell
node --version
npm.cmd --version
npm.cmd ci
npm.cmd run dev
```

Open http://localhost:5173 in your browser (or the exact local address printed by the terminal if it differs). Keep the terminal running; Ctrl+C stops the app. No API key, database setup, Java, or cloud account is required for this version. Using npm.cmd avoids PowerShell script execution-policy problems without changing your computer's policy.

If you open PowerShell separately, first use `cd` with the full path to your extracted DesignLab folder, for example `cd "C:\Users\YourName\Downloads\DesignLab-Submission\DesignLab"`. Replace that example with your actual folder path. Do not run npm commands from inside the ZIP preview.

## Run on macOS/Linux

With Node.js 24 installed, open a terminal in the extracted DesignLab folder:

```bash
npm ci
npm run dev
```

## Run tests (a second terminal in the same folder)

```powershell
node --experimental-transform-types --test tests/practice.test.ts
```

Expected: 17 passing tests. Node may print an experimental TypeScript warning; it does not indicate a failed test.

## Check types and build

```powershell
npx.cmd tsc --noEmit
npm.cmd run build
```

On macOS/Linux use npx and npm instead of npx.cmd and npm.cmd. Internet access is needed for initial dependency installation. The first install/build may take a few minutes.

## Review status

This is a local prototype supplied as previous-work evidence for the WhipScribe challenge. It is not a WhipScribe integration and has no public deployment.

All 17 domain tests passed in the current Windows review. Browser interaction and external user testing have not yet been verified. See REVIEW_STATUS.md for the build check results.

The evaluator is an offline heuristic rubric, not an LLM or a semantic correctness checker. Drafts and history live in the current browser. Export important designs before clearing browser data.

The .openai/hosting.json file is retained because the Vite configuration imports it. Its project ID is existing deployment metadata, not a credential or permission to deploy. No deployment is needed to run the app locally.
