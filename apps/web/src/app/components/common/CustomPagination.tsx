"use client"
import {Pagination,PaginationContent,PaginationEllipsis,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,} from "../../../ui/components/ui/pagination"
import { useEffect, useState } from "react";

interface ICustomPaginationProps {
    items: any[];
    itemsPerPage: number;
    defaultPage: number;
    onChangePage: (items: any[]) => void;
}

function CustomPagination({ items, itemsPerPage = 8, defaultPage = 1, onChangePage } : ICustomPaginationProps) {

    const itemsCount = items.length;
    const [currentPage, setCurrentPage] = useState<number>(defaultPage);
    const totalPages = Math.ceil(itemsCount / itemsPerPage);
    
    useEffect(() => {
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        onChangePage(items.slice(startIdx, endIdx));
      }, [currentPage, items]);

    useEffect(() => {
        setCurrentPage(defaultPage);
      }, [items]);

    const handlePageClick = (page : number) => {
        setCurrentPage(page);
    };

    const renderPages = () => {
        let pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <PaginationItem key={i} className={`${i == currentPage ? 'bg-primary-color text-white': ''} rounded-full font-heyComic`} >
                        <PaginationLink className="hover:bg-transparent cursor-pointer text-lg text-primary-black" onClick={() => handlePageClick(i)}>{i}</PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            let startPage, endPage;
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }

            if (startPage > 1) {
                pages.push(
                    <PaginationItem key={1} className={`${startPage == currentPage ? 'bg-primary-color text-white': ''} rounded-full font-heyComic`}>
                        <PaginationLink className="hover:bg-transparent cursor-pointer text-lg text-primary-black"  onClick={() => handlePageClick(1)}>1</PaginationLink>
                    </PaginationItem>
                );
                pages.push(<PaginationEllipsis key="start-ellipsis" />);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <PaginationItem key={i} className={`${i == currentPage ? 'bg-primary-color text-white': ''} rounded-full font-heyComic`}>
                        <PaginationLink className="hover:bg-transparent cursor-pointer text-lg text-primary-black"  onClick={() => handlePageClick(i)}>{i}</PaginationLink>
                    </PaginationItem>
                );
            }

            if (endPage < totalPages) {
                pages.push(<PaginationEllipsis key="end-ellipsis" />);
                pages.push(
                    <PaginationItem key={totalPages} className={`${totalPages == currentPage ? 'bg-primary-color text-white': ''} rounded-full font-heyComic`}>
                        <PaginationLink className="hover:bg-transparent cursor-pointer text-lg text-primary-black"  onClick={() => handlePageClick(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                );
            }
        }
        return pages;
    };

    return (
        <Pagination className="">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => handlePageClick(Math.max(1, currentPage - 1))} />
                </PaginationItem>
                {renderPages()}
                <PaginationItem>
                    <PaginationNext href="#" onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default CustomPagination;