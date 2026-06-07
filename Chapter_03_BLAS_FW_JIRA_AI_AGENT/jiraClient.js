import fetch from 'node-fetch';

export async function fetchJiraIssue(jiraId, config) {
    const url = `${config.jiraUrl}/rest/api/3/issue/${jiraId}`;
    const auth = Buffer.from(`${config.jiraEmail}:${config.jiraToken}`).toString('base64');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Jira API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return flattenJiraData(data);
}

function flattenJiraData(issue) {
    return {
        key: issue.key,
        summary: issue.fields.summary,
        // Simplistic ADF to Text extraction to keep B.L.A.S.T. tool lightweight
        description: issue.fields.description?.content
            ?.map(block => block.content?.map(node => node.text).join('') || '')
            .join('\n') || "TBD",
        issueType: issue.fields.issuetype?.name,
        status: issue.fields.status?.name,
        priority: issue.fields.priority?.name
    };
}