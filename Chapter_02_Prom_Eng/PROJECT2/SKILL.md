RICE-POT Prompt Builder Skill
Purpose
This skill helps users create a high-quality RICE-POT prompt for any task by collecting structured inputs and transforming them into a reusable prompt.
________________________________________
Step 1: Ask the User Questions
Please answer the following questions.
1. Objective
What is the objective?
Examples:
•	Generate test cases
•	Create automation scripts
•	Analyze logs
•	Create user stories
•	Review code
•	Generate API test cases
Your Answer: ________________________
________________________________________
2. Desired Outcome
What do you want to achieve?
Examples:
•	100% requirement coverage
•	Regression-ready test suite
•	Detailed bug report
•	Jira-ready user stories
•	Production-ready code
Your Answer: ________________________
________________________________________
3. Role
What role should the AI play?
Examples:
•	QA Engineer with 15 years experience
•	Automation Architect
•	Product Manager
•	Business Analyst
•	Scrum Master
•	Security Tester
•	Performance Engineer
Your Answer: ________________________
________________________________________
4. Instructions
What specific tasks should the AI perform?
Examples:
•	Generate positive and negative test cases
•	Review requirements
•	Create API test scenarios
•	Generate SQL queries
•	Create automation framework
Your Answer: ________________________
________________________________________
5. Context
What background information should the AI know?
Examples:
•	PRD attached
•	Jira story attached
•	Screenshot attached
•	API documentation attached
•	Production logs attached
Your Answer: ________________________
________________________________________
6. Example
Do you have an example output?
Examples:
•	Existing test case
•	Jira ticket format
•	CSV template
•	JSON response
•	Sample report
Your Answer: ________________________
________________________________________
7. Output Format
What should the output look like?
Examples:
•	CSV
•	Excel
•	Markdown Table
•	JSON
•	Jira Format
•	TestRail Format
Your Answer: ________________________
________________________________________
8. Parameters / Constraints
Any restrictions?
Examples:
•	Do not assume behavior
•	Use only attached documents
•	Do not invent APIs
•	Generate exactly 20 test cases
•	Follow ISTQB standards
Your Answer: ________________________
________________________________________
9. Tone
What tone should the AI use?
Examples:
•	Technical
•	Enterprise-grade
•	Executive
•	Beginner-friendly
•	Audit-compliant
•	Formal
Your Answer: ________________________
________________________________________
Step 2: Generate the RICE-POT Prompt
After collecting answers, generate the prompt using the following structure.
R — Role
Act as: {ROLE}
Your objective is: {OBJECTIVE}
________________________________________
I — Instructions
Perform the following tasks:
{INSTRUCTIONS}
Desired outcome:
{DESIRED_OUTCOME}
________________________________________
C — Constraints
Follow these rules:
{PARAMETERS}
If information is missing:
“Insufficient information to determine.”
If information is inferred:
“Inference (low confidence)”
________________________________________
E — Example
Use the following example as reference:
{EXAMPLE}
________________________________________
P — Product / Problem Context
Context:
{CONTEXT}
________________________________________
O — Output Format
Generate output in:
{OUTPUT_FORMAT}
________________________________________
T — Tone
Use the following tone:
{TONE}
________________________________________
Validation Checklist
Before generating the final answer, verify:
✓ Objective is defined
✓ Role is defined
✓ Instructions are clear
✓ Context is available
✓ Example is provided (if available)
✓ Output format is specified
✓ Constraints are specified
✓ Tone is specified
If any required section is missing, ask the user for clarification before generating the final output.
