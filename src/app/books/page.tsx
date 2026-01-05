import { LifeCard } from "@/components/life-card";
import { LIFE_DATA } from "@/data/life";
import { SectionsWrapper } from "@/components/sections-wrapper";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <div className="w-[900px] max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Books</h1>
            <p className="text-white/60 text-sm">
              Books that have influenced my thinking and personal growth.
            </p>
          </div>
        </div>

        {/* Books Grid */}
        <SectionsWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIFE_DATA.books.map((book) => (
              <LifeCard
                key={book.title}
                title={book.title}
                author={book.author}
                year={book.year}
                category={book.category}
                rating={book.rating}
                coverImage={book.coverImage}
                description={book.description}
                keyTakeaways={book.keyTakeaways}
                link={book.link}
                type="book"
              />
            ))}
          </div>
        </SectionsWrapper>

        <Footer />
      </div>
    </div>
  );
}
