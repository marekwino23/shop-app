import { useState } from "react"
import './pagination.css';

interface Props {
    page: number
    count: number
    perPage?: number
    updatePage(page: number): void
}

export const Pagination = ({ count , page, perPage = 3, updatePage }: Props) => {
    const pagesNum = Math.ceil(count / perPage);

    const handlePrevClick = () => {
        if (page < 1) {
            return;
        }
        updatePage(page - 1);
    }

    const handleNextClick = () => {
        updatePage(page + 1);
    }

    const handlePageCLick = (pageNum: number) => {
        updatePage(pageNum);
    }

    if (count <= perPage) {
        return null;
    }

    return (
        <div className="pagination">
            <button className="pagination-btn" disabled={page === 1} onClick={handlePrevClick}>&lt;</button>
            <div className="pages">
                {Array(pagesNum).fill(0).map((_, index) => (
                    <button className={`pagination-btn" ${page === index + 1 ? 'active' : ''}`} onClick={() => handlePageCLick(index + 1)}>{index + 1}</button>
                ))}
            </div>
            <button className="pagination-btn" disabled={page === pagesNum} onClick={handleNextClick}>&gt;</button>
        </div>
    )
}