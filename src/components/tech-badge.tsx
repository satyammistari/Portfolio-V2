"use client";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

interface TechBadgeProps {
  name: string;
  icon?: React.ReactNode;
}

const techIcons: Record<string, React.ReactNode> = {
  // Core Languages
  "Python": <Icons.python className="w-3.5 h-3.5" />,
  "PYTHON": <Icons.python className="w-3.5 h-3.5" />,
  
  // AI/ML/DL Frameworks
  "PyTorch": <Icons.pytorch className="w-3.5 h-3.5" />,
  "PYTORCH": <Icons.pytorch className="w-3.5 h-3.5" />,
  "TensorFlow": <Icons.tensorflow className="w-3.5 h-3.5" />,
  "TENSORFLOW": <Icons.tensorflow className="w-3.5 h-3.5" />,
  "scikit-learn": <Icons.sklearn className="w-3.5 h-3.5" />,
  "Sklearn": <Icons.sklearn className="w-3.5 h-3.5" />,
  "SKLEARN": <Icons.sklearn className="w-3.5 h-3.5" />,
  "Hugging Face": <Icons.huggingface className="w-3.5 h-3.5" />,
  "HuggingFace": <Icons.huggingface className="w-3.5 h-3.5" />,
  "HUGGINGFACE": <Icons.huggingface className="w-3.5 h-3.5" />,
  
  // AI/ML Libraries
  "OpenCV": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" className="w-3.5 h-3.5" alt="OpenCV" />,
  "OPENCV": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" className="w-3.5 h-3.5" alt="OpenCV" />,
  
  // Cloud Providers
  "AWS": <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" className="w-3.5 h-3.5" alt="AWS" />,
  "Azure": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" className="w-3.5 h-3.5" alt="Azure" />,
  "GCP": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" className="w-3.5 h-3.5" alt="GCP" />,
  "Cloudflare": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" className="w-3.5 h-3.5" alt="Cloudflare" />,
  
  // DevOps & Deployment
  "Docker": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" className="w-3.5 h-3.5" alt="Docker" />,
  "Kubernetes": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" className="w-3.5 h-3.5" alt="Kubernetes" />,
  "Vercel": <img src="https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" className="w-3.5 h-3.5" alt="Vercel" />,
  
  // Big Data
  "Apache Spark": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" className="w-3.5 h-3.5" alt="Apache Spark" />,
  "Spark": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" className="w-3.5 h-3.5" alt="Spark" />,
  "Hadoop": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg" className="w-3.5 h-3.5" alt="Hadoop" />,
  "Kafka": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" className="w-3.5 h-3.5" alt="Kafka" />,
  
  // Databases
  "PostgreSQL": <Icons.postgresql className="w-3.5 h-3.5" />,
  "MongoDB": <Icons.mongodb className="w-3.5 h-3.5" />,
  "Firebase": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" className="w-3.5 h-3.5" alt="Firebase" />,
  "Redis": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" className="w-3.5 h-3.5" alt="Redis" />,
  
  // Web Development
  "React": <Icons.react className="w-3.5 h-3.5" />,
  "Bun": <Icons.bun className="w-3.5 h-3.5" />,
  "Javascript": <Icons.javascript className="w-3.5 h-3.5" />,
  "JavaScript": <Icons.javascript className="w-3.5 h-3.5" />,
  "TypeScript": <Icons.typescript className="w-3.5 h-3.5" />,
  "TS": <Icons.typescript className="w-3.5 h-3.5" />,
  "Node.js": <Icons.nodejs className="w-3.5 h-3.5" />,
  "Next.js": <Icons.nextjs className="w-3.5 h-3.5" />,
  "N": <Icons.nextjs className="w-3.5 h-3.5" />,
  "Prisma": <Icons.prisma className="w-3.5 h-3.5" />,
  "Tailwind CSS": <Icons.tailwindcss className="w-3.5 h-3.5" />,
  "Flask": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" className="w-3.5 h-3.5" alt="Flask" />,
  "FLASK": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" className="w-3.5 h-3.5" alt="Flask" />,
};

export function TechBadge({ name, icon }: TechBadgeProps) {
  const displayIcon = icon || techIcons[name] || null;

  return (
    <div className="bg-[#161616] dark:bg-[#161616] light:bg-zinc-100 border border-white/10 dark:border-white/10 light:border-zinc-300 rounded-md px-2 py-1 flex items-center gap-1.5 hover:border-dashed hover:bg-[#1a1a1a] dark:hover:bg-[#1a1a1a] light:hover:bg-zinc-200 transition-all">
      {displayIcon && <span className="flex-shrink-0">{displayIcon}</span>}
      <span className="text-white dark:text-white light:text-zinc-900 uppercase text-[9px] font-medium tracking-tight">{name.toUpperCase()}</span>
    </div>
  );
}

