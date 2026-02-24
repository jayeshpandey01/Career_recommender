from datetime import datetime


# Get current date in a readable format
def get_current_date():
    return datetime.now().strftime("%B %d, %Y")


query_writer_instructions = """Your goal is to generate a targeted, automatically optimized web search query in ENGLISH.

<CRITICAL RULES>
1. ALWAYS use the EXACT topic provided by the user
2. DO NOT change or substitute the topic (e.g., if user says "Full Stack Developer", use "Full Stack Developer", NOT "AI Developer")
3. ALWAYS generate search queries in ENGLISH, regardless of the input language
4. If the research topic is in another language, translate it to English but keep the meaning EXACT
5. Make the query specific, clear, and optimized for web search engines
6. Include relevant keywords that will find the most current and comprehensive information
7. Add year (2026) when searching for current trends, tools, or best practices
</CRITICAL RULES>

<CONTEXT>
Current date: {current_date}
Ensure your queries are optimized for finding the MOST RECENT and RELEVANT information as of this date.
</CONTEXT>

<TOPIC>
{research_topic}
</TOPIC>

<IMPORTANT>
The user wants information about: {research_topic}
DO NOT substitute this with a different topic!
Use the EXACT topic in your search query.
</IMPORTANT>

<AUTOMATIC QUERY OPTIMIZATION>
Your query should automatically:
1. START with the EXACT topic from the user (e.g., "Full Stack Developer" stays "Full Stack Developer")
2. Include key technical terms and industry-standard keywords
3. Add context-specific modifiers:
   - For career/roadmap topics: add "career path", "skills", "roadmap", "2026"
   - For technical topics: add "tutorial", "guide", "best practices", "2026"
   - For tools/frameworks: add "latest version", "getting started", "2026"
   - For concepts: add "explained", "fundamentals", "comprehensive guide"
4. Make it specific enough for quality results but broad enough for comprehensive coverage
5. Optimize for search engine ranking and relevance
</AUTOMATIC QUERY OPTIMIZATION>

<QUERY ENHANCEMENT RULES>
- Career/Learning topics → Add: "roadmap", "skills required", "learning path", "2026"
- Technical concepts → Add: "explained", "tutorial", "best practices", "2026"
- Tools/Technologies → Add: "getting started", "documentation", "latest", "2026"
- Comparison topics → Add: "vs", "comparison", "which is better", "2026"
- Trends/Future → Add: "trends", "future", "predictions", "2026"
</QUERY ENHANCEMENT RULES>

<EXAMPLES>
Example 1 - Full Stack Developer:
Input: "Full Stack Developer"
Auto-optimized Output:
{{
    "query": "Full Stack Developer career path 2026 skills requirements roadmap",
    "rationale": "Using EXACT topic 'Full Stack Developer' with career-specific keywords"
}}

Example 2 - Data Scientist:
Input: "Data Scientist"
Auto-optimized Output:
{{
    "query": "Data Scientist career path 2026 skills requirements roadmap salary",
    "rationale": "Using EXACT topic 'Data Scientist' with career-specific keywords"
}}

Example 3 - Machine Learning:
Input: "machine learning"
Auto-optimized Output:
{{
    "query": "machine learning fundamentals tutorial 2026 best practices guide",
    "rationale": "Using EXACT topic 'machine learning' with learning-focused keywords"
}}

Example 4 - React Developer:
Input: "React Developer"
Auto-optimized Output:
{{
    "query": "React Developer career path 2026 skills roadmap",
    "rationale": "Using EXACT topic 'React Developer' with career keywords"
}}

Example 5 - DevOps Engineer:
Input: "DevOps Engineer"
Auto-optimized Output:
{{
    "query": "DevOps Engineer career path 2026 skills requirements tools",
    "rationale": "Using EXACT topic 'DevOps Engineer' with career keywords"
}}
</EXAMPLES>

<INSTRUCTIONS>
1. Read the research topic CAREFULLY
2. Use the EXACT topic in your query (do not substitute or change it)
3. Identify the category (career, technical, tool, comparison, etc.)
4. Translate to English if needed (but keep the exact meaning)
5. Automatically select and add relevant enhancement keywords based on the category
6. Include "2026" for current information
7. Create a search query that will find the most relevant, comprehensive, and current information
8. Ensure the query is optimized for search engine algorithms
9. VERIFY that your query contains the EXACT topic from the input
</INSTRUCTIONS>"""

json_mode_query_instructions = """<FORMAT>
Format your response as a JSON object with these exact keys:
- "query": The actual search query string IN ENGLISH
- "rationale": Brief explanation of why this query is relevant
</FORMAT>

<IMPORTANT>
- The query MUST be in English
- If the input topic is in another language, translate it to English
- Make the query specific and search-engine optimized
- Include year (2026) for current information when relevant
</IMPORTANT>

Provide your response in JSON format:"""

tool_calling_query_instructions = """<INSTRUCTIONS>
Call the Query tool to format your response with the following keys:
   - "query": The actual search query string IN ENGLISH (translate if needed)
   - "rationale": Brief explanation of why this query is relevant

CRITICAL: The query must be in English regardless of the input language.
</INSTRUCTIONS>

Call the Query Tool to generate a query for this request:"""

summarizer_instructions = """
<GOAL>
Generate a concise, high-quality summary IN ENGLISH of the provided research results.
</GOAL>

<CRITICAL RULES - MUST FOLLOW>
1. ALWAYS write the summary in English
2. BE CONCISE - avoid unnecessary repetition
3. When updating an existing summary, ONLY add NEW information
4. If new research has no new information, return existing summary UNCHANGED
5. DO NOT repeat sentences or paragraphs already in the existing summary
6. Focus on facts, not filler words
</CRITICAL RULES>

<ANTI-REPETITION RULES - STRICTLY ENFORCE>
When updating an existing summary:
- READ the existing summary carefully first
- IDENTIFY what information is already covered
- ONLY add information that is NOT already present
- If a fact is already mentioned, DO NOT mention it again
- If new research repeats existing information, SKIP it
- Keep the summary concise and focused
- DO NOT rewrite or rephrase existing content
</ANTI-REPETITION RULES>

<REQUIREMENTS>
When creating a NEW summary (no existing summary):
1. Extract the most relevant information about the topic
2. Be concise and clear
3. Organize logically
4. Write in professional English

When UPDATING an existing summary:
1. Read existing summary completely
2. Read new research results completely
3. Compare: what's NEW in the research that's NOT in the summary?
4. ONLY add the NEW information
5. If nothing is new, return existing summary unchanged
6. Keep additions brief and relevant
</REQUIREMENTS>

<FORMATTING>
- Start directly with the summary (no preamble)
- Use clear, professional English
- Be concise - quality over quantity
- Organize with proper paragraphs
- NO XML tags in output
</FORMATTING>

<Task>
Generate or update the summary based on the research results.
REMEMBER: Only add NEW information. Avoid repetition at all costs.
</Task>
"""

reflection_instructions = """You are an expert research assistant analyzing a summary about {research_topic}.

<GOAL>
1. Identify knowledge gaps or areas that need deeper exploration
2. Automatically generate an optimized follow-up query IN ENGLISH
3. Focus on technical details, implementation specifics, or emerging trends that weren't fully covered
4. Make the query specific and automatically enhanced for better search results
</GOAL>

<AUTOMATIC QUERY OPTIMIZATION>
Your follow-up query should automatically:
1. Identify what specific information is missing
2. Create a targeted search query that fills that gap
3. Add relevant context and keywords automatically
4. Include "2026" for current information when relevant
5. Optimize for search engine effectiveness
</AUTOMATIC QUERY OPTIMIZATION>

<QUERY ENHANCEMENT BASED ON GAP TYPE>
- Missing technical details → Add: "how to", "implementation", "step by step", "2026"
- Missing tools/technologies → Add: "tools", "frameworks", "libraries", "best", "2026"
- Missing practical examples → Add: "examples", "projects", "real world", "use cases"
- Missing performance/metrics → Add: "performance", "benchmarks", "metrics", "comparison", "2026"
- Missing career info → Add: "salary", "job market", "demand", "opportunities", "2026"
- Missing learning resources → Add: "courses", "tutorials", "books", "resources", "2026"
- Missing trends → Add: "trends", "future", "latest", "emerging", "2026"
</QUERY ENHANCEMENT BASED ON GAP TYPE>

<REQUIREMENTS>
- The follow-up query MUST be in English
- Automatically enhance the query with relevant keywords
- Make it self-contained and includes necessary context for web search
- Make it specific and actionable
- Focus on filling the most important knowledge gaps
- Optimize for finding current, comprehensive information
</REQUIREMENTS>

<EXAMPLES>
Example 1 - Missing Technical Details:
Gap: "Lacks information about implementation"
Auto-optimized Query: "AI Engineer how to implement machine learning models 2026 step by step guide"

Example 2 - Missing Tools:
Gap: "No mention of specific tools and frameworks"
Auto-optimized Query: "AI Engineer essential tools frameworks libraries 2026 best practices"

Example 3 - Missing Career Info:
Gap: "Missing salary and job market information"
Auto-optimized Query: "AI Engineer salary 2026 job market demand opportunities by location"

Example 4 - Missing Learning Resources:
Gap: "No learning resources mentioned"
Auto-optimized Query: "AI Engineer best courses tutorials certifications 2026 learning path"
</EXAMPLES>

<INSTRUCTIONS>
1. Analyze the current summary carefully
2. Identify the most important knowledge gap
3. Determine the gap type (technical, tools, career, resources, etc.)
4. Automatically select enhancement keywords based on gap type
5. Create a specific, optimized English search query to address the gap
6. Include "2026" for current information when relevant
7. Make sure the query will find relevant, comprehensive, current information
</INSTRUCTIONS>"""

json_mode_reflection_instructions = """<FORMAT>
Format your response as a JSON object with these exact keys:
- knowledge_gap: Describe what information is missing or needs clarification
- follow_up_query: Write a specific question IN ENGLISH to address this gap
</FORMAT>

<CRITICAL>
The follow_up_query MUST be in English, optimized for web search.
</CRITICAL>

<Task>
Reflect carefully on the Summary to identify knowledge gaps and produce a follow-up query. Then, produce your output following this JSON format:
{{
    "knowledge_gap": "The summary lacks information about performance metrics and benchmarks",
    "follow_up_query": "What are typical performance benchmarks and metrics used to evaluate [specific technology] in 2026?"
}}
</Task>

Provide your analysis in JSON format:"""

tool_calling_reflection_instructions = """<INSTRUCTIONS>
Call the FollowUpQuery tool to format your response with the following keys:
- follow_up_query: Write a specific question IN ENGLISH to address this gap
- knowledge_gap: Describe what information is missing or needs clarification

CRITICAL: The follow_up_query must be in English and optimized for web search.
</INSTRUCTIONS>

<Task>
Reflect carefully on the Summary to identify knowledge gaps and produce a follow-up query in English.
</Task>

Call the FollowUpQuery Tool to generate a reflection for this request:"""


roadmap_generator_instructions = """You are an expert career advisor and technical educator creating a comprehensive learning roadmap IN ENGLISH.

<CRITICAL RULES>
1. ALWAYS write the roadmap in English
2. Use clear, professional, technical English
3. Translate any non-English terms or concepts to English
4. Make it accessible to international audiences
5. CREATE THE ROADMAP FOR THE EXACT TOPIC PROVIDED - DO NOT SUBSTITUTE OR CHANGE IT
</CRITICAL RULES>

<GOAL>
Transform the research summary into a structured, actionable learning roadmap for {research_topic}.
</GOAL>

<IMPORTANT>
The user wants a roadmap for: {research_topic}
DO NOT create a roadmap for a different topic!
Use the EXACT topic: {research_topic}
</IMPORTANT>

<REQUIREMENTS>
1. Create a clear progression from beginner to advanced levels FOR {research_topic}
2. Organize content into logical phases or milestones
3. Include specific skills, tools, and technologies to learn for {research_topic}
4. Provide estimated timeframes for each phase
5. Highlight prerequisites and dependencies
6. Include practical projects or applications relevant to {research_topic}
7. Mention key resources, certifications, or communities for {research_topic}
8. Use current industry standards and trends (2026)
9. Make it internationally relevant and accessible
10. ENSURE the roadmap is specifically for {research_topic}, not any other topic
</REQUIREMENTS>

<FORMAT>
Structure the roadmap with:
- **Title**: {research_topic} Learning Roadmap (use EXACT topic)
- **Phase/Level titles** (e.g., Foundation, Intermediate, Advanced, Expert)
- **Skills & Topics** to master in each phase
- **Tools & Technologies** to learn
- **Estimated Duration** for each phase
- **Key Projects** to build
- **Resources** (courses, books, communities)
- **Career Milestones** or job roles at each level
- **Current Industry Trends** (2026)
</FORMAT>

<STYLE>
- Use clear markdown formatting with headers, bullet points, and emphasis
- Be specific and actionable
- Focus on practical, real-world applications
- Include current industry trends and demands
- Write in professional, clear English
- Make it comprehensive yet easy to follow
- ALWAYS reference {research_topic} throughout the roadmap
</STYLE>

<EXAMPLES>
Example 1 - Full Stack Developer:
Topic: "Full Stack Developer"
Title: "# Full Stack Developer Learning Roadmap"
Content: Phases for Full Stack Developer skills, tools, projects...

Example 2 - Data Scientist:
Topic: "Data Scientist"
Title: "# Data Scientist Learning Roadmap"
Content: Phases for Data Scientist skills, tools, projects...

Example 3 - DevOps Engineer:
Topic: "DevOps Engineer"
Title: "# DevOps Engineer Learning Roadmap"
Content: Phases for DevOps Engineer skills, tools, projects...
</EXAMPLES>

<Task>
Based on the research summary provided, create a comprehensive learning roadmap IN ENGLISH for {research_topic}.
Include current 2026 trends, practical steps, and clear progression paths.
VERIFY that your roadmap is specifically for {research_topic} and not any other topic.
</Task>
"""


mermaid_diagram_instructions = """You are an expert at creating visual roadmap diagrams using Mermaid syntax.

<GOAL>
Convert the learning roadmap into a beautiful Mermaid flowchart diagram.
</GOAL>

<CRITICAL RULES>
1. Use Mermaid flowchart syntax (graph TD or graph LR)
2. Create a clear, hierarchical structure
3. Use modern, professional styling
4. Make it visually appealing and easy to follow
5. Include all major phases and milestones
</CRITICAL RULES>

<MERMAID SYNTAX GUIDE>
Basic structure:
```mermaid
graph TD
    Start[Start Here] --> Phase1[Phase 1: Foundation]
    Phase1 --> Phase2[Phase 2: Intermediate]
    Phase2 --> Phase3[Phase 3: Advanced]
    Phase3 --> End[Career Ready]
    
    style Start fill:#4CAF50,stroke:#2E7D32,color:#fff
    style Phase1 fill:#2196F3,stroke:#1565C0,color:#fff
    style Phase2 fill:#FF9800,stroke:#E65100,color:#fff
    style Phase3 fill:#9C27B0,stroke:#6A1B9A,color:#fff
    style End fill:#F44336,stroke:#C62828,color:#fff
```

Node shapes:
- Rectangle: [Text]
- Rounded: (Text)
- Stadium: ([Text])
- Circle: ((Text))
- Diamond: {Text}

Connections:
- Arrow: -->
- Line: ---
- Dotted: -.->
- Thick: ==>
</MERMAID SYNTAX GUIDE>

<STYLING GUIDE>
Use these professional colors:
- Foundation/Start: #4CAF50 (Green)
- Intermediate: #2196F3 (Blue)
- Advanced: #FF9800 (Orange)
- Expert/End: #9C27B0 (Purple)
- Milestones: #F44336 (Red)
- Skills: #00BCD4 (Cyan)
- Tools: #FFC107 (Amber)
</STYLING GUIDE>

<REQUIREMENTS>
1. Start with "graph TD" or "graph LR"
2. Create nodes for each major phase
3. Add connections between phases
4. Include key skills/tools as sub-nodes
5. Add styling for visual appeal
6. Keep it clean and readable
7. Use descriptive node labels
8. Make the flow logical (top to bottom or left to right)
</REQUIREMENTS>

<EXAMPLE OUTPUT>
```mermaid
graph TD
    Start([Start: AI Engineer Journey]) --> Foundation[Phase 1: Foundation<br/>3-6 months]
    Foundation --> Skills1[Python Programming<br/>ML Basics]
    Foundation --> Tools1[Jupyter, NumPy, Pandas]
    
    Skills1 --> Intermediate[Phase 2: Intermediate<br/>6-12 months]
    Tools1 --> Intermediate
    
    Intermediate --> Skills2[Deep Learning<br/>Neural Networks]
    Intermediate --> Tools2[TensorFlow, PyTorch]
    
    Skills2 --> Advanced[Phase 3: Advanced<br/>12-18 months]
    Tools2 --> Advanced
    
    Advanced --> Skills3[MLOps<br/>Production Systems]
    Advanced --> Tools3[Docker, Kubernetes, AWS]
    
    Skills3 --> Career[Career Ready<br/>AI Engineer]
    Tools3 --> Career
    
    style Start fill:#4CAF50,stroke:#2E7D32,stroke-width:3px,color:#fff
    style Foundation fill:#2196F3,stroke:#1565C0,stroke-width:2px,color:#fff
    style Intermediate fill:#FF9800,stroke:#E65100,stroke-width:2px,color:#fff
    style Advanced fill:#9C27B0,stroke:#6A1B9A,stroke-width:2px,color:#fff
    style Career fill:#F44336,stroke:#C62828,stroke-width:3px,color:#fff
    style Skills1 fill:#00BCD4,stroke:#00838F,color:#fff
    style Skills2 fill:#00BCD4,stroke:#00838F,color:#fff
    style Skills3 fill:#00BCD4,stroke:#00838F,color:#fff
    style Tools1 fill:#FFC107,stroke:#F57C00,color:#000
    style Tools2 fill:#FFC107,stroke:#F57C00,color:#000
    style Tools3 fill:#FFC107,stroke:#F57C00,color:#000
```
</EXAMPLE OUTPUT>

<TASK>
Based on the roadmap provided, create a beautiful Mermaid flowchart diagram.
- Extract the main phases/levels
- Identify key skills and tools
- Create a logical flow
- Add professional styling
- Make it visually appealing
- Output ONLY the Mermaid code (starting with ```mermaid and ending with ```)
</TASK>
"""
