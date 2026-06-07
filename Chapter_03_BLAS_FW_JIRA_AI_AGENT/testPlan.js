import fs from 'fs';
import path from 'path';

export function jsonToMarkdown(plan) {
    const safeMap = (arr) => Array.isArray(arr) ? arr.map(item => `- ${item}`).join('\n') : '- TBD';
    
    return `
# ${plan.title || 'QA Test Plan'}

**Test Plan ID:** ${plan.testPlanId || 'TBD'}  
**Source Issue:** ${plan.sourceIssue || 'TBD'}  

## 1. Objective
${plan.objective || 'TBD'}

## 2. Scope
### In Scope
${safeMap(plan.scope?.inScope)}

### Out of Scope
${safeMap(plan.scope?.outOfScope)}

## 3. Test Strategy
${safeMap(plan.testStrategy)}

## 4. Inclusions & Deliverables
**Inclusions:**
${safeMap(plan.inclusions)}

**Deliverables:**
${safeMap(plan.deliverables)}

## 5. Entry & Exit Criteria
**Entry Criteria:**
${safeMap(plan.entryCriteria)}

**Exit Criteria:**
${safeMap(plan.exitCriteria)}
    `.trim();
}

export function saveMarkdownLocally(jiraId, markdownContent) {
    const outputDir = path.join(process.cwd(), 'output');
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filePath = path.join(outputDir, `test-plan-${jiraId}.md`);
    fs.writeFileSync(filePath, markdownContent, 'utf-8');
    return filePath;
}