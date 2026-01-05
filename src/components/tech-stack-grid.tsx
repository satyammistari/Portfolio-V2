import Image from "next/image";

interface TechStackItem {
  name: string;
  logo: string;
  category: "ML/AI" | "Cloud" | "Dev Tools" | "Data Science";
}

const techStack: TechStackItem[] = [
  { name: "Python", logo: "/python.png", category: "ML/AI" },
  { name: "PyTorch", logo: "/pytorch.png", category: "ML/AI" },
  { name: "TensorFlow", logo: "/tensorflow.png", category: "ML/AI" },
  { name: "scikit-learn", logo: "/sklearn.png", category: "ML/AI" },
  { name: "HuggingFace", logo: "/huggingface.png", category: "ML/AI" },
  { name: "OpenCV", logo: "/opencv.png", category: "ML/AI" },
  { name: "Pandas", logo: "/pandas.png", category: "Data Science" },
  { name: "Docker", logo: "/docker.png", category: "Dev Tools" },
  { name: "AWS", logo: "/aws.png", category: "Cloud" },
  { name: "GCP", logo: "/gcp.png", category: "Cloud" },
];

export function TechStackGrid() {
  const categories = ["ML/AI", "Cloud", "Dev Tools", "Data Science"] as const;

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const items = techStack.filter((item) => item.category === category);
        if (items.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {items.map((tech) => (
                <div
                  key={tech.name}
                  className="group relative p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 relative flex items-center justify-center">
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs text-white/80 font-medium text-center">
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
