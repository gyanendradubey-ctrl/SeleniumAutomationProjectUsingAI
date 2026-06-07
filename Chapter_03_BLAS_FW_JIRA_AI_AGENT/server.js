import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchJiraIssue } from './tools/jiraClient.js';
import { generateTestPlan } from './tools/groqClient.js';
import { jsonToMarkdown, saveMarkdownLocally } from './tools/testPlan.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    try {
        const { jiraId, config } = req.body;
        
        // Favor UI settings but fallback to the global .env
        const finalConfig = {
            jiraUrl: config?.jiraUrl || process.env.JIRA_URL,
            jiraEmail: config?.jiraEmail || process.env.JIRA_EMAIL,
            jiraToken: config?.jiraToken || process.env.JIRA_TOKEN,
            groqKey: config?.groqKey || process.env.GROQ_KEY
        };

        // Layer 2 Routing logic
        const jiraData = await fetchJiraIssue(jiraId, finalConfig);
        const rawTestPlan = await generateTestPlan(jiraData, finalConfig);
        const testPlanJson = JSON.parse(rawTestPlan);
        const markdownOutput = jsonToMarkdown(testPlanJson);
        
        res.json({ success: true, jira: jiraData, testPlan: testPlanJson, markdown: markdownOutput });
    } catch (error) {
        console.error("B.L.A.S.T System Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/save', async (req, res) => {
    try {
        const { jiraId, testPlan } = req.body;
        const markdownContent = jsonToMarkdown(testPlan);
        const savedPath = saveMarkdownLocally(jiraId, markdownContent);
        
        res.json({ success: true, path: savedPath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));