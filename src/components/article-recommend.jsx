"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RecommendedArticles = ({ articles, currentSlug }) => {
  if (!articles || articles.length === 0) return null;

  // Filter artikel yang bukan artikel saat ini
  const filteredArticles = articles.filter(article => article.slug !== currentSlug);
  
  if (filteredArticles.length === 0) return null;

  return (
    <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 mt-8">
      <h3 className="font-semibold text-xl text-gray-900 dark:text-neutral-100 mb-6 flex items-center gap-2">
        <BookOpen size={20} />
        Artikel Rekomendasi
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.slice(0, 3).map((article, index) => (
          <RecommendedArticleCard key={article.id || index} article={article} />
        ))}
      </div>
      
      {filteredArticles.length > 3 && (
        <div className="text-center mt-6">
          <Link href="/artikel">
            <Button variant="outline" className="gap-2">
              Lihat Semua Artikel
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export const RecommendedArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Link href={`/artikel/${article.slug}`} className="group block">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        {article.coverImage && (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title || ''}
              width={400}
              height={240}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-4">
          {article.category && (
            <span className="inline-block bg-secondaryColorLight/10 dark:bg-secondaryColorDark/15 text-secondaryColorLight dark:text-secondaryColorDark text-xs px-2 py-1 rounded-full mb-2 font-bold">
              {article.category}
            </span>
          )}
          
          <h4 className="font-semibold text-gray-900 dark:text-neutral-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h4>
          
          {article.excerpt && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
              {article.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
            {article.createdAt && (
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{formatDate(article.createdAt)}</span>
              </div>
            )}
            
            {article.readingTime && (
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{article.readingTime} min baca</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};