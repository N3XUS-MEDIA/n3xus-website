import type { ServicePageContent } from '../blocks';

/**
 * /services/ai
 *
 * Project pricing (one-off builds) is NOT superseded by the retainer matrix,
 * so "from $X" figures stay — with one exception: the AI chatbot price is
 * contested (the homepage JSON-LD says $1,500, blog/index.html says
 * $500/$1,160/$2,370 across three tiers). Claims register C4 is still open, so
 * that one is quoted per build rather than picking a side.
 *
 * "Serving US and global clients from South Africa, at world-class quality"
 * loses the self-assessment; what's left is the verifiable half.
 */
export const aiPage: ServicePageContent = {
  eyebrow: 'AI & LLM development',
  title: 'We build AI into the business, end to end.',
  lede: 'From LLM integrations and RAG knowledge bases to autonomous agents and full custom software — production-grade AI systems that solve a real business problem, not prototypes that break at scale.',

  blocks: [
    {
      type: 'chips',
      eyebrow: 'Engineering stack',
      title: 'The tools we actually build on.',
      lede: 'Frontier models, orchestration frameworks and the production infrastructure underneath — chosen per job rather than by habit.',
      items: [
        'Claude',
        'GPT-4o',
        'Gemini',
        'Llama 3',
        'Mistral',
        'LangChain',
        'LlamaIndex',
        'LangGraph',
        'CrewAI',
        'Pinecone',
        'Weaviate',
        'Chroma',
        'pgvector',
        'Qdrant',
        'Python',
        'TypeScript',
        'FastAPI',
        'Node.js',
        'Docker',
        'AWS / GCP / Azure',
      ],
    },

    {
      type: 'features',
      eyebrow: 'What we build',
      title: 'Where AI actually earns its keep.',
      lede: 'Every system we build is production-grade, documented and designed for long-term reliability.',
      columns: 2,
      items: [
        {
          title: 'LLM application development',
          body: 'Applications built on Claude, GPT-4o, Gemini or open-source Llama — well past simple API calls. Context architecture, prompt engineering, structured outputs, tool use, multi-modal inputs, streaming interfaces, evaluation and fallback strategies, and token-cost optimisation.',
          outcome: 'From $3,500 — work that needed a specialist runs on demand',
        },
        {
          title: 'RAG systems & knowledge bases',
          body: 'Retrieval-augmented generation connects the model to your own data, so it retrieves exact information from your documents and databases instead of guessing. Ingestion and chunking, embeddings, vector store, hybrid semantic and keyword search, reranking, and the generation layer.',
          outcome: 'From $5,500 — an assistant that genuinely knows your business',
        },
        {
          title: 'AI agents & multi-agent systems',
          body: 'Autonomous agents that plan, use tools and complete multi-step work, built on LangChain, LangGraph or CrewAI, with human-in-the-loop checkpoints where the stakes justify them.',
          outcome: 'From $6,000 — processes that ran on people now run on demand',
        },
        {
          title: 'Custom AI software',
          body: 'Full-stack applications, SaaS products and enterprise systems with AI capability built in from the architecture up rather than bolted on afterwards.',
          outcome: 'From $8,000 — a product, not an integration',
        },
        {
          title: 'AI chatbots & assistants',
          body: 'LLM-powered assistants for web, WhatsApp and Slack, with CRM integration, lead qualification and clean handoff to a human at the right moment.',
          // Claims register C4: the published price is contested. Quoted rather
          // than guessed.
          outcome: 'Quoted per build — scope decides the number',
        },
        {
          title: 'Predictive analytics & ML',
          body: 'Forecasting, scoring and classification models trained on your own operational data, deployed where the decision actually gets made rather than in a notebook nobody opens.',
          outcome: 'Decisions made on evidence rather than instinct',
        },
      ],
    },

    {
      type: 'chips',
      eyebrow: 'Where it applies',
      title: 'Sectors we have built for.',
      items: [
        'Healthcare',
        'Financial services',
        'Legal',
        'E-commerce',
        'Real estate',
        'Education',
        'Logistics',
        'Marketing & media',
      ],
    },

    {
      type: 'process',
      eyebrow: 'How we build',
      title: 'What exists at the end of each stage.',
      steps: [
        {
          n: '01',
          title: 'Discovery',
          body: 'We establish what the system has to do, what it must never do, and how success will be measured — before any code is written.',
        },
        {
          n: '02',
          title: 'Architecture',
          body: 'Model choice, data flow, retrieval strategy, evaluation approach and cost envelope, written down and agreed. Fixed-price scope comes out of this stage.',
        },
        {
          n: '03',
          title: 'Prototype',
          body: 'A working slice against your real data, so the approach is proven — or corrected — while changing direction is still cheap.',
        },
        {
          n: '04',
          title: 'Production build',
          body: 'Hardening, evaluation harness, fallbacks, monitoring, cost controls and documentation. The difference between a demo and something you can depend on.',
        },
        {
          n: '05',
          title: 'Deploy & optimise',
          body: 'Live, monitored, and tuned against real usage — accuracy, latency and token cost — rather than handed over and forgotten.',
        },
      ],
    },

    { type: 'faq', items: [] },

    {
      type: 'cta',
      eyebrow: 'Next step',
      title: 'Ready to build something intelligent?',
      lede: 'Bring the problem, not a spec. We will tell you whether AI is the right tool for it — including when it isn’t.',
      secondary: { href: '/services/software', label: 'Custom software' },
    },
  ],

  faqs: [
    {
      q: 'Which model do you use?',
      a: 'Whichever fits the job. Claude, GPT-4o, Gemini and open-source Llama all have different strengths in reasoning, cost, latency and context length, and the right answer changes per use case — and over time. Systems are built so the model can be swapped without rewriting the application around it.',
    },
    {
      q: 'How do you stop it making things up?',
      a: 'Mostly by not asking it to remember. RAG grounds answers in your actual documents and data, so the model retrieves rather than recalls. On top of that: structured outputs, an evaluation harness that tests against known-correct answers, and explicit fallbacks when confidence is low.',
    },
    {
      q: 'Is our data used to train anyone’s model?',
      a: 'No. We use provider APIs under terms that exclude your data from training, and the retrieval layer keeps your documents in infrastructure you control. Data handling is specified in writing before a build starts.',
    },
    {
      q: 'What does it cost to run once it’s live?',
      a: 'Token cost, hosting and any vector database. We model that during architecture and design for it — caching, context trimming and model routing all materially change the running cost, and it is cheaper to plan for than to retrofit.',
    },
  ],
};
