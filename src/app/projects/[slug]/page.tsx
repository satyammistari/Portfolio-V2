import { DATA } from "@/data/resume";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { TechBadge } from "@/components/tech-badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { CheckCircle2, Globe, GitBranch, Repeat, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = DATA.projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = DATA.projects.findIndex(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === params.slug
  );
  const nextProject = DATA.projects[currentIndex + 1] || DATA.projects[0];
  const relatedProjects = DATA.projects
    .filter((p, idx) => idx !== currentIndex)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 space-y-12">
        {/* Header Section with Hero Image */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden border border-white/10">
          {project.video ? (
            <div className="relative w-full h-full">
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 hover:bg-white/30 transition-colors cursor-pointer">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>
            </div>
          ) : project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
              <span className="text-6xl opacity-50">🚀</span>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="bg-white text-black px-3 py-1 rounded-md text-xs font-medium">
            Completed
          </div>
          {project.technologies.slice(0, 5).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>

        {/* Hero Info */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            {project.title}
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            {project.description.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}
          </p>

          {/* Info Card */}
          <div className="bg-[#0c0c0c] border border-white/10 rounded-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-white/60 mb-1">Timeline</div>
              <div className="text-sm font-medium text-white">{project.dates}</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Role</div>
              <div className="text-sm font-medium text-white">ML Engineer</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Team</div>
              <div className="text-sm font-medium text-white">Solo</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Status</div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Completed</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4">
            {project.links?.find((l) => l.type === "Website") && (
              <Button
                asChild
                className="bg-white text-black hover:bg-white/90 border-0"
              >
                <Link
                  href={project.links.find((l) => l.type === "Website")?.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.links?.find((l) => l.type === "Source") && (
              <Button
                asChild
                variant="outline"
                className="border border-white/10 bg-transparent hover:bg-white/5 text-white"
              >
                <Link
                  href={project.links.find((l) => l.type === "Source")?.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch className="w-4 h-4 mr-2" />
                  Source Code
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 pt-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="text-zinc-400 leading-relaxed space-y-3">
              <p>
                <strong className="text-white">Architected and developed</strong> the complete
                frontend infrastructure for the platform, a comprehensive solution for creating and
                managing promotional campaigns.
              </p>
              <p>
                <strong className="text-white">Led a comprehensive codebase refactoring</strong>{" "}
                initiative that improved maintainability, scalability, and development velocity
                across the entire platform.
              </p>
            </div>
          </section>

          {/* What Users Can Do */}
          <section>
            <h2 className="text-2xl font-bold mb-4">What Users Can Do</h2>
            <div className="text-zinc-400 leading-relaxed space-y-2">
              <div className="flex items-start">
                <span className="mr-2 text-white/60">•</span>
                <span>
                  <strong className="text-white">Create and manage</strong> promotional campaigns
                  with an intuitive interface
                </span>
              </div>
              <div className="flex items-start">
                <span className="mr-2 text-white/60">•</span>
                <span>
                  <strong className="text-white">Track performance</strong> metrics and analytics
                  in real-time
                </span>
              </div>
              <div className="flex items-start">
                <span className="mr-2 text-white/60">•</span>
                <span>
                  <strong className="text-white">Collaborate</strong> with team members on campaign
                  strategies
                </span>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </section>

          {/* After Launch & Impact */}
          <section>
            <h2 className="text-2xl font-bold mb-4">After Launch & Impact</h2>
            <div className="text-zinc-400 leading-relaxed space-y-2">
              <div className="flex items-start">
                <span className="mr-2 text-white/60">•</span>
                <span>
                  <strong className="text-white">Enhanced user experience</strong> and interface
                  design through implementation of consistent design systems, accessibility
                  standards, and performance optimizations
                </span>
              </div>
              <div className="flex items-start">
                <span className="mr-2 text-white/60">•</span>
                <span>
                  <strong className="text-white">Integrated and optimized</strong> backend API
                  connections, implementing efficient data fetching strategies and error handling
                  mechanisms
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Next Project Card */}
        <div className="pt-8">
          <Link
            href={`/projects/${nextProject.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="block bg-[#0c0c0c] border border-white/10 rounded-lg p-6 hover:bg-[#111111] transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Repeat className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                <div>
                  <div className="text-sm text-white/60 mb-1">Next Project</div>
                  <div className="text-lg font-bold text-white">{nextProject.title}</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="pt-8">
            <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedProjects.map((related) => (
                <Link
                  key={related.title}
                  href={`/projects/${related.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="bg-[#0c0c0c] border border-white/10 rounded-lg p-4 hover:bg-[#111111] transition-colors group"
                >
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded mb-3 flex items-center justify-center">
                    <span className="text-3xl opacity-50">🚀</span>
                  </div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-white/80">
                    {related.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

