import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronFirst, ChevronLast } from "lucide-react"

export function PaginationNumber({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    onNextPage, 
    onPrevPage, 
    showInfo = false,
    totalItems,
    itemsPerPage 
}) {
    // Generate page numbers to display
    const generatePageNumbers = () => {
        const pages = [];
        const delta = 2; // Number of pages to show around current page
        
        if (totalPages <= 7) {
            // Show all pages if total is 7 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (currentPage <= delta + 3) {
                // Current page is near the beginning
                for (let i = 2; i <= Math.min(delta + 3, totalPages - 1); i++) {
                    pages.push(i);
                }
                if (totalPages > delta + 3) {
                    pages.push('ellipsis-end');
                }
            } else if (currentPage >= totalPages - delta - 2) {
                // Current page is near the end
                if (totalPages > delta + 3) {
                    pages.push('ellipsis-start');
                }
                for (let i = Math.max(totalPages - delta - 2, 2); i <= totalPages - 1; i++) {
                    pages.push(i);
                }
            } else {
                // Current page is in the middle
                pages.push('ellipsis-start');
                for (let i = currentPage - delta; i <= currentPage + delta; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis-end');
            }
            
            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const handlePageClick = (page, e) => {
        e.preventDefault();
        if (page !== currentPage && onPageChange) {
            onPageChange(page);
        }
    };

    const handlePrevClick = (e) => {
        e.preventDefault();
        if (onPrevPage) {
            onPrevPage();
        }
    };

    const handleNextClick = (e) => {
        e.preventDefault();
        if (onNextPage) {
            onNextPage();
        }
    };

    // Handle first page click
    const handleFirstPageClick = (e) => {
        e.preventDefault();
        if (currentPage !== 1 && onPageChange) {
            onPageChange(1);
        }
    };

    // Handle last page click
    const handleLastPageClick = (e) => {
        e.preventDefault();
        if (currentPage !== totalPages && onPageChange) {
            onPageChange(totalPages);
        }
    };

    const pageNumbers = generatePageNumbers();
    const canGoToFirst = currentPage > 1;
    const canGoToLast = currentPage < totalPages;

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Pagination Info */}
            {showInfo && totalItems && itemsPerPage && (
                <div className="text-sm text-gray-600">
                    Menampilkan {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} item
                </div>
            )}

            {/* Pagination Controls */}
            <Pagination>
                <PaginationContent>
                    {/* First Page Button */}
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={handleFirstPageClick}
                            className={`px-2 ${!canGoToFirst ? "pointer-events-none opacity-50" : "hover:bg-gray-100"}`}
                            size="sm"
                            aria-label="Halaman pertama"
                        >
                            <ChevronFirst className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>

                    {/* Previous Button */}
                    <PaginationItem>
                        <PaginationPrevious 
                            href="#"
                            onClick={handlePrevClick}
                            className={!onPrevPage ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {pageNumbers.map((page, index) => (
                        <PaginationItem key={index}>
                            {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink 
                                    href="#"
                                    onClick={(e) => handlePageClick(page, e)}
                                    isActive={page === currentPage}
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* Next Button */}
                    <PaginationItem>
                        <PaginationNext 
                            href="#"
                            onClick={handleNextClick}
                            className={!onNextPage ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {/* Last Page Button */}
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={handleLastPageClick}
                            className={`px-2 ${!canGoToLast ? "pointer-events-none opacity-50" : "hover:bg-gray-100"}`}
                            size="sm"
                            aria-label="Halaman terakhir"
                        >
                            <ChevronLast className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}