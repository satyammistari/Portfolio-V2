import { BentoCard } from "@/components/bento-card";
import { BlogCard } from "@/components/blog-card";
import { MediumBlogCard } from "@/components/medium-blog-card";
import { EnhancedProjectCard } from "@/components/enhanced-project-card";
import { ExperienceCard } from "@/components/experience-card";
import { Footer } from "@/components/footer";
import { GitHubHeatmap } from "@/components/github-heatmap-live";
import { CategorizedSkills } from "@/components/categorized-skills";
import { PublicationCard } from "@/components/publication-card";
import { ResearchProjectCard } from "@/components/research-project-card";
import { OpenSourceStats } from "@/components/opensource-stats";
import { SpotifyWidget } from "@/components/spotify-widget";
import { DATA } from "@/data/resume";
import { getBlogPosts } from "@/data/blog";
import { BookOpen, Film, FileText, Settings, Eye } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SectionsWrapper } from "@/components/sections-wrapper";
import { Badge } from "@/components/ui/badge";

export default async function Page() {

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <div className="w-full mx-auto py-12 space-y-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Categorized Skills */}
        <section id="skills">
          <SectionsWrapper>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Technical Skills</h2>
            <CategorizedSkills />
          </SectionsWrapper>
        </section>

        {/* Academic Publications */}
        <section id="publications">
          <SectionsWrapper>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Academic Publications</h2>
            <div className="space-y-4">
              <PublicationCard
                title="Multi-agent LLM Orchestration"
                venue=""
                year="2023"
                status="Ongoing"
                tags={["LLM", "Multi-Agent", "Vision-Language"]}
                paperUrl="https://arxiv.org"
                arxivUrl="https://arxiv.org"
                codeUrl="https://github.com"
              />
              <PublicationCard
                title="Firewall for LLMs"
                venue=""
                year="2024"
                status="Ongoing"
                tags={["LLM Security", "Safety", "Guardrails"]}
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
            <h2 className="text-3xl font-bold tracking-tight mb-6">Research Projects</h2>
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
                title="Quadruped (Spot Robot) Moon Surface Simulation"
                description="Simulation of Boston Dynamics' Spot robot navigating lunar terrain using NVIDIA Isaac Sim and ROS for autonomous exploration and terrain adaptation."
                metric="Real-time physics simulation"
                tags={["Robotics", "NVIDIA Isaac Sim", "ROS", "Simulation"]}
                codeUrl="https://github.com"
              />
            </div>
          </SectionsWrapper>
        </section>

        {/* Featured Open Source Work */}
        <section id="opensource">
          <SectionsWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Featured Open Source Work</h2>
            <div className="space-y-6">
              <ExperienceCard
                logoUrl="https://www.kaggle.com/static/images/site-logo.png"
                altText="Kaggle"
                company="Kaggle"
                title="Open Source Contributor"
                period="2023 - Present"
                location="Remote"
                description="Active contributor to the Kaggle ecosystem with comprehensive tutorials and notebooks covering fine-tuning, inference optimization, and practical ML engineering. Published datasets and competition solutions helping the ML community learn and grow."
                href="https://www.kaggle.com/satyammistari"
                website="https://www.kaggle.com/satyammistari"
                techStack={[
                  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                  { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
                  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
                  { name: "scikit-learn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
                ]}
              />
              
              <ExperienceCard
                logoUrl="https://huggingface.co/front/assets/huggingface_logo-noborder.svg"
                altText="Hugging Face"
                company="Hugging Face"
                title="Open Source Contributor"
                period="2023 - Present"
                location="Remote"
                description="Active contributor to the Hugging Face ecosystem with multiple repositories and models for NLP and multimodal AI. Published transformer models, datasets, and spaces demonstrating state-of-the-art techniques in natural language processing and computer vision."
                href="https://huggingface.co/satyammistari"
                website="https://huggingface.co/satyammistari"
                techStack={[
                  { name: "Transformers", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
                  { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
                  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
                  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                ]}
              />
            </div>
          </SectionsWrapper>
        </section>

        {/* Experience Section */}
        <section id="work">
          <SectionsWrapper className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Experience</h2>
            
            {/* Current Role (First item - highlighted) */}
            {DATA.work.length > 0 && (
              <div className="space-y-4 pb-6 border-b border-white/10">
                <ExperienceCard
                  logoUrl={DATA.work[0].logoUrl}
                  altText={DATA.work[0].company}
                  company={DATA.work[0].company}
                  title={DATA.work[0].title}
                  period={`${DATA.work[0].start} - ${DATA.work[0].end ?? "Present"}`}
                  location={DATA.work[0].location}
                  description={DATA.work[0].description}
                  href={DATA.work[0].href}
                  isCurrent={!DATA.work[0].end}
                  technologies={[
                    "Python",
                    "PyTorch",
                    "TensorFlow",
                    "scikit-learn",
                    "OpenCV",
                    "Pandas",
                    "NumPy",
                    "Hugging Face",
                    "Keras",
                  ]}
                />
              </div>
            )}

            {/* Past Experience List */}
            <div className="space-y-6">
              {DATA.work.slice(1).map((work) => (
                <ExperienceCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  company={work.company}
                  title={work.title}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  location={work.location}
                  description={work.description}
                  href={work.href}
                  techStack={work.techStack ? [...work.techStack] : undefined}
                />
              ))}
            </div>

            {/* Show All Button */}
            <div className="pt-4">
              <button className="w-full bg-[#0c0c0c] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-[#111111] transition-colors">
                Show all work experiences
              </button>
            </div>
          </SectionsWrapper>
        </section>

        {/* Featured Projects */}
        <section id="projects">
          <SectionsWrapper className="space-y-8">
            <h2 className="text-3xl font-semibold tracking-tight">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DATA.projects.slice(0, 4).map((project) => {
                const slug = project.title.toLowerCase().replace(/\s+/g, "-");
                return (
                  <EnhancedProjectCard
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    technologies={[...project.technologies]}
                    href={`/projects/${slug}`}
                    image={project.image}
                    video={project.video}
                    links={project.links ? [...project.links] : undefined}
                  />
                );
              })}
            </div>
          </SectionsWrapper>
        </section>

        {/* GitHub Activity */}
        <section id="github">
          <GitHubHeatmap />
        </section>

        {/* Featured Blogs */}
        <section id="blogs">
          <SectionsWrapper className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Featured Blogs</h2>
            <MediumBlogCard />
            <div className="flex justify-center pt-4">
              <a
                href="https://medium.com/@mistarisatyam"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0c0c0c] border border-white/10 rounded-lg px-6 py-3 text-sm text-white/60 hover:text-white hover:bg-[#111111] transition-colors"
              >
                View all on Medium
              </a>
            </div>
          </SectionsWrapper>
        </section>

        {/* Bento Grid - Setup & Life */}
        <section id="setup-life">
          <div className="space-y-12">
            {/* Development Section */}
            <SectionsWrapper className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-white/60 uppercase tracking-wider">Development</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Setup</h2>
              </div>
              <div className="space-y-3">
                <BentoCard
                  icon={<Settings className="w-5 h-5 text-white/80" />}
                  title="Gears Used"
                  description="Productivity Tools, Gears i use daily."
                />
                <BentoCard
                  icon={<FileText className="w-5 h-5 text-white/80" />}
                  title="VSCode / Cursor Setup"
                  description="VSCode / Cursor setup i use daily."
                />
              </div>
            </SectionsWrapper>

            {/* Personal Section */}
            <SectionsWrapper className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-white/60 uppercase tracking-wider">Personal</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Life</h2>
              </div>
              <div className="space-y-3">
                <BentoCard
                  icon={<BookOpen className="w-5 h-5 text-white/80" />}
                  title="Books"
                  description="Books that have influenced my thinking and growth."
                  href="/books"
                  showCat
                />
                <BentoCard
                  icon={<Film className="w-5 h-5 text-white/80" />}
                  title="Movies"
                  description="Movies and shows that have inspired and entertained me."
                  href="/movies"
                  showCat
                />
              </div>
            </SectionsWrapper>
          </div>
        </section>

        {/* Quote & Visitor Counter */}
        <section className="pt-12 border-t border-white/10">
          <div className="text-center space-y-4">
            <p className="text-xs text-white/50 italic max-w-2xl mx-auto leading-relaxed">
              "You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction."
              <br />
              <span className="text-white/40">— Bhagavad Gita 2.47</span>
            </p>
            <div className="flex items-center justify-center gap-3">
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

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
