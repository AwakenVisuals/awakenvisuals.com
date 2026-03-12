import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  gold?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  gold = false,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("mb-12 md:mb-16", alignClass[align], className)}>
      <h2
        className={cn(
          "text-3xl font-bold tracking-wider md:text-4xl lg:text-5xl",
          gold ? "text-[#FFC95C]" : "text-white"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[#95B8D1] md:text-xl">{subtitle}</p>
      )}
    </div>
  );
}
