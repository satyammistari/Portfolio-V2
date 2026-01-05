"use client";

import { useState } from "react";
import Image from "next/image";

interface Skill {
  name: string;
  logo: string;
  category: string;
}

const skills: Skill[] = [
  // AI / Machine Learning / Deep Learning - Core Frameworks
  { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", category: "AI/ML/DL" },
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "AI/ML/DL" },
  { name: "scikit-learn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg", category: "AI/ML/DL" },
  { name: "Hugging Face", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", category: "AI/ML/DL" },
  { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", category: "AI/ML/DL" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "AI/ML/DL" },
  
  // Cloud & Infrastructure - Providers
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", category: "Cloud" },
  { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", category: "Cloud" },
  { name: "GCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", category: "Cloud" },
  { name: "Cloudflare", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg", category: "Cloud" },
  
  // Cloud & Infrastructure - DevOps & Deployment
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "Cloud" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", category: "Cloud" },
  { name: "Vercel", logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png", category: "Cloud" },
  
  // Data & Databases - Big Data Tools
  { name: "Apache Spark", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg", category: "Data" },
  { name: "Hadoop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg", category: "Data" },
  { name: "Kafka", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg", category: "Data" },
  
  // Data & Databases - Databases
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Data" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Data" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "Data" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", category: "Data" },
];

const categories = ["All Skills", "AI/ML/DL", "Cloud", "Data"];

export function CategorizedSkills() {
  const [activeCategory, setActiveCategory] = useState("All Skills");

  const filteredSkills =
    activeCategory === "All Skills"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === category
                ? "bg-white text-black"
                : "bg-transparent text-white/70 border border-white/20 hover:bg-white/5 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center gap-3 p-4 bg-[#0a0a0a] border border-white/10 rounded-lg hover:border-white/30 transition-all group"
          >
            <div className="w-12 h-12 relative flex items-center justify-center">
              <Image
                src={skill.logo}
                alt={skill.name}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-xs font-medium text-white/90 text-center">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
