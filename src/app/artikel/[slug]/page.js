"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Clock, User, Calendar, Tag, Share2, BookOpen, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useArticleDetail } from '@/hooks/useArticlesDetail';
import { Button } from '@/components/ui/button';
import { BreadcrumbDynamic } from '@/components/breadcrumb-dynamic';

const ArticleDetail = ({ slug }) => {
    const {
        article,
        relatedArticles,
        loading,
        error,
        refresh,
        shareArticle,
        readingTime,
        formattedDate
    } = useArticleDetail(slug);

    const handleShare = async () => {
        await shareArticle();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat artikel...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p className="font-medium">Error memuat artikel:</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                    <button
                        onClick={refresh}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Artikel tidak ditemukan</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="space-y-5">
                <div className='max-w-4xl mx-auto my-5'>
                    <BreadcrumbDynamic />
                </div>
                <div className="max-w-4xl mx-auto mb-5">

                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">

                        {article.createdAt && (
                            <div className="flex hover:text-foreground items-center gap-1">
                                <Calendar size={16} />
                                <span>{formattedDate}</span>
                            </div>
                        )}

                        {article.category && (
                            <div className="flex hover:text-foreground items-center gap-1">
                                <BookOpen size={16} />
                                <span>{article.category}</span>
                            </div>
                        )}

                        <button
                            onClick={handleShare}
                            className="flex hover:text-foreground items-center gap-2 text-muted-foreground transition-colors"
                        >
                            <Share2 size={18} />
                            Bagikan
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {article.coverImage && (
                <div className="max-w-4xl mx-auto mb-6">
                    <Image
                        width={800}
                        height={450}
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                    />
                </div>
            )}


            {article.excerpt && (
                <p className="max-w-4xl mx-auto text-xl text-muted-foreground mb-6 mt-3 border-b pb-3 leading-relaxed">
                    {article.excerpt}
                </p>
            )}

            {/* Content */}
            <div className="max-w-4xl mx-auto pb-12">
                <div className="">
                    <div
                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                        dangerouslySetInnerHTML={{ __html: article.content || article.body }}
                    />
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                    <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 mt-6">
                        <h3 className="font-semibold text-gray-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                            <Tag size={18} />
                            Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 dark:bg-blue-950 dark:text-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Articles or Call to Action */}
                <div className="bg-linear-to-br/srgb from-mainColorDark  to-secondaryColorLight dark:from-mainColorLight dark:to-secondaryColorLight rounded-lg shadow-sm p-6 mt-6 text-white text-center">

                    <h3 className="font-semibold text-xl mb-2">Artikel Bermanfaat?</h3>
                    <p className="mb-4 opacity-90">Bagikan dengan teman atau kolega Anda!</p>
                    <Button
                        onClick={handleShare}
                        variant={"outline"}
                    >
                        Bagikan Artikel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;





