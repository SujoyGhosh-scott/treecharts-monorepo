import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="flex items-center space-x-1 text-xs font-light mb-6"
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="text-base-content/60 hover:text-primary transition-colors"
      >
        Home
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <svg
            className="w-4 h-4 text-base-content/40"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>

          {item.href ? (
            <Link
              href={item.href}
              className={`transition-colors ${
                index === items.length - 1
                  ? "text-primary font-normal"
                  : "text-base-content/60 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-primary font-normal">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
