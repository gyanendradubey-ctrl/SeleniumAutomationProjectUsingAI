import fetch from 'node-fetch';

export async function generateTestPlan(jiraData, config) {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    
    // Prompt derived dynamically from the flattened Jira Data payload
    const prompt = `
    Act as a Senior QA Functional Test Engineer. 
    Create a formal QA Test Plan for the following Jira Issue:
    Key: ${jiraData.key}
    Summary: ${jiraData.summary}
    Description: ${jiraData.description}
    Type: ${jiraData.issueType}
    
    Output strictly valid JSON matching the schema outlined in gemini.md:
    {
      "testPlanId": "TP-${jiraData.key}",
      "sourceIssue": "${jiraData.key}",
      "title": "Test Plan — <summary>",
      "objective": "string",
      "scope": { "inScope": ["string"], "outOfScope": ["string"] },
      "testStrategy": ["string"]
    }
    Do NOT fabricate details; output "TBD" if information is missing.
    `;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${config.groqKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const result = await response.json();
    return result.choices[0].message.content;
}