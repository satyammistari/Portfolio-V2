import { CategorizedSkills } from "@/components/categorized-skills";
import { PublicationCard } from "@/components/publication-card";
import { ResearchProjectCard } from "@/components/research-project-card";
import { OpenSourceCard } from "@/components/opensource-card";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { SectionsWrapper } from "@/components/sections-wrapper";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

export default async function Page() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <div className="w-full mx-auto py-12 space-y-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Categorized Skills */}
        <section id="skills">
          <SectionsWrapper>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Technical Skills</h2>
            <CategorizedSkills />
          </SectionsWrapper>
        </section>

        {/* Academic Publications */}
        <section id="publications">
          <SectionsWrapper>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Academic Publications</h2>
            <div className="space-y-4">
              <PublicationCard
                title="Nayana: A Foundation for Document-Centric Vision-Language Models"
                venue="ICCV"
                year="2025"
                status="Accepted"
                tags={["Dataset Generation", "Multimodal AI", "Document Understanding"]}
                paperUrl="https://arxiv.org"
                arxivUrl="https://arxiv.org"
                codeUrl="https://github.com"
              />
              <PublicationCard
                title="ViViD - Vision Language Model for Unified Visual Understanding"
                venue="CVPR"
                year="2025"
                status="Accepted"
                tags={["Vision-Language", "Unified Model", "Visual Understanding"]}
                paperUrl="https://arxiv.org"
                arxivUrl="https://arxiv.org"
                codeUrl="https://github.com"
              />
            </div>
          </SectionsWrapper>
        </section>

        {/* Research Projects */}
        <section id="research">
          <SectionsWrapper>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Research Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ResearchProjectCard
                title="Multi-agent LLM Orchestration"
                description="A system integrating textual and visual information to enhance contextual precision in agent-based workflows."
                metric="60% improvement in contextual precision"
                tags={["LLM", "Multi-Agent", "Vision-Language"]}
                demoUrl="https://demo.com"
                codeUrl="https://github.com"
              />
              <ResearchProjectCard
                title="Test-Time Compute for Code Generation"
                description="A coding agent that generates an internal Verification Plan and uses a Tree of Thoughts approach to backtrack if unit tests fail."
                novelty="Critic-Actor Loop"
                tags={["Code Generation", "Tree of Thoughts", "Reasoning"]}
                codeUrl="https://github.com"
              />
              <ResearchProjectCard
                title="Ambari-7b"
                description="India's first Kannada bilingual LLM with specialized tokenization for Indian languages."
                metric="85% tokenization efficiency"
                tags={["LLM", "Bilingual", "Tokenization"]}
                demoUrl="https://huggingface.co"
                codeUrl="https://github.com"
              />
              <ResearchProjectCard
                title="VARAG"
                description="Vision-Augmented Retrieval and Generation system that combines visual and textual context for enhanced information retrieval."
                tags={["RAG", "Vision-Language", "Retrieval"]}
                codeUrl="https://github.com"
              />
            </div>
          </SectionsWrapper>
        </section>

        {/* Featured Open Source Work */}
        <section id="opensource">
          <SectionsWrapper>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Open Source Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <OpenSourceCard
                platform="Hugging Face"
                title="omniparse & Model Contributions"
                description="Active contributor to the Hugging Face ecosystem with multiple repositories and models for NLP and multimodal AI."
                stats={{ stars: 6771, repos: 12 }}
                tags={["NLP", "Transformers", "Multimodal"]}
                url="https://huggingface.co"
              />
              <OpenSourceCard
                platform="Kaggle / AI-Engineering.academy"
                title="Mastering Applied AI"
                description="Comprehensive tutorials and notebooks covering fine-tuning, inference optimization, and practical ML engineering."
                stats={{ contributions: 250 }}
                tags={["Fine-tuning", "Inference", "Jupyter Notebooks"]}
                url="https://kaggle.com"
              />
            </div>
          </SectionsWrapper>
        </section>

        {/* Quote & Visitor Counter */}
        <section className="pt-8 border-t border-white/10">
          <div className="text-center space-y-4">
            <p className="text-xs text-white/50 italic max-w-2xl mx-auto leading-relaxed">
              "You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction."
              <br />
              <span className="text-white/40">— Bhagavad Gita 2.47</span>
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge
                variant="outline"
                className="px-3 py-1 text-[10px] bg-white/5 border-white/10 text-white/60"
              >
                <Eye className="w-3 h-3 mr-1.5" />
                <span>1,234 visitors</span>
              </Badge>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
