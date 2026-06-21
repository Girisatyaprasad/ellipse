export type ExtractedArtifactType = "task" | "decision" | "blocker";

export type ExtractedArtifact = {
  type: ExtractedArtifactType;
  title: string;
  summary: string | null;
  sourceQuote: string;
  assignee: string | null;
  dueDate: string | null;
};

const artifactTypes = new Set<ExtractedArtifactType>(["task", "decision", "blocker"]);

function cleanSentence(value: string) {
  return value.trim().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
}

function titleCase(value: string) {
  return cleanSentence(value)
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function asExtractedArtifact(value: unknown, fallbackQuote: string): ExtractedArtifact | null {
  if (!value || typeof value !== "object") return null;

  const item = value as Record<string, unknown>;
  const type = typeof item.type === "string" ? item.type.toLowerCase() : "";
  const title = typeof item.title === "string" ? cleanSentence(item.title) : "";
  const summary = typeof item.summary === "string" ? cleanSentence(item.summary) : "";
  const sourceQuote = typeof item.sourceQuote === "string" ? cleanSentence(item.sourceQuote) : "";
  const assignee = typeof item.assignee === "string" ? cleanSentence(item.assignee) : "";
  const dueDate = typeof item.dueDate === "string" ? cleanSentence(item.dueDate) : "";

  if (!artifactTypes.has(type as ExtractedArtifactType) || !title) return null;

  return {
    type: type as ExtractedArtifactType,
    title,
    summary: summary || null,
    sourceQuote: sourceQuote || fallbackQuote,
    assignee: type === "task" && assignee ? assignee : null,
    dueDate: type === "task" && dueDate ? dueDate : null,
  };
}

function normalizeArtifacts(value: unknown, fallbackQuote: string) {
  const parsed = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const rawArtifacts = Array.isArray(parsed.artifacts) ? parsed.artifacts : [];

  return rawArtifacts
    .map((item) => asExtractedArtifact(item, fallbackQuote))
    .filter((item): item is ExtractedArtifact => Boolean(item))
    .slice(0, 5);
}

function heuristicExtract(message: string): ExtractedArtifact[] {
  const sourceQuote = message.trim();
  const text = cleanSentence(message);
  const lower = text.toLowerCase();
  const artifacts: ExtractedArtifact[] = [];

  const taskMatch = text.match(/^([A-Z][a-zA-Z.'-]*)\s+(finish|complete|handle|prepare|review|send|create|build|fix|ship|deliver|update)\s+(.+?)(?:\s+by\s+(.+))?$/i);
  if (taskMatch) {
    const assignee = taskMatch[1];
    const work = cleanSentence(taskMatch[3]).replace(/^the\s+/i, "");
    const deadline = taskMatch[4] ? cleanSentence(taskMatch[4]) : "";
    const summaryParts = [`Assignee: ${assignee}.`];

    if (deadline) summaryParts.push(`Deadline: ${deadline}.`);

    artifacts.push({
      type: "task",
      title: titleCase(work),
      summary: summaryParts.join(" "),
      sourceQuote,
      assignee,
      dueDate: deadline || null,
    });
  }

  const delayMatch = text.match(/^delay\s+(.+?)\s+until\s+(.+?)(?:\s+(?:is|are|gets|get|has been|have been)\s+fixed)?$/i);
  if (delayMatch) {
    const subject = cleanSentence(delayMatch[1]);
    const reason = cleanSentence(delayMatch[2]);

    artifacts.push({
      type: "decision",
      title: `${titleCase(subject)} delayed`,
      summary: `Reason: ${reason}.`,
      sourceQuote,
      assignee: null,
      dueDate: null,
    });
  } else if (lower.startsWith("let's postpone ") || lower.startsWith("postpone ")) {
    const decisionText = text.replace(/^let's\s+/i, "").replace(/^postpone\s+/i, "");
    artifacts.push({
      type: "decision",
      title: titleCase(decisionText),
      summary: null,
      sourceQuote,
      assignee: null,
      dueDate: null,
    });
  }

  if (/\b(blocked by|blocker|stuck on|waiting on|cannot|can't)\b/i.test(text)) {
    artifacts.push({
      type: "blocker",
      title: titleCase(text),
      summary: null,
      sourceQuote,
      assignee: null,
      dueDate: null,
    });
  }

  return artifacts.slice(0, 5);
}

async function extractWithOpenAI(message: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Extract reviewable work artifacts from one team conversation message. Return only JSON with an artifacts array. Each artifact must have type task, decision, or blocker; title; summary; sourceQuote; assignee; dueDate. Tasks need a concise work title, assignee when present, and dueDate when present. Decisions need the decision in title and reason in summary when present. Blockers need the obstacle in title. Use null for missing assignee or dueDate. If nothing should be reviewed, return an empty artifacts array. Never mark artifacts accepted.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI extraction failed with ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return [];

  return normalizeArtifacts(JSON.parse(content), message);
}

export async function extractArtifactsFromMessage(message: string): Promise<ExtractedArtifact[]> {
  const sourceMessage = message.trim();
  const text = cleanSentence(sourceMessage);
  if (!text) return [];

  try {
    const openAIArtifacts = await extractWithOpenAI(sourceMessage);
    if (openAIArtifacts) return openAIArtifacts;
  } catch (error) {
    console.error("AI extraction failed. Falling back to local extraction.", error);
  }

  return heuristicExtract(text);
}
