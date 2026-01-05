import Image from "next/image";

interface TechLogoBadgeProps {
  name: string;
  logo: string;
  size?: "sm" | "md" | "lg";
}

export function TechLogoBadge({ name, logo, size = "sm" }: TechLogoBadgeProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        <Image
          src={logo}
          alt={name}
          width={size === "sm" ? 24 : size === "md" ? 32 : 40}
          height={size === "sm" ? 24 : size === "md" ? 32 : 40}
          className="object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <span className="text-sm text-white/80 font-medium">{name}</span>
    </div>
  );
}
