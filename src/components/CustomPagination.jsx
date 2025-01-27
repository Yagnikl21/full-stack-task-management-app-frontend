/* eslint-disable react/prop-types */
import { useSearchParams } from 'react-router';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const CustomPagination = ({ pageInformation, page, setPage, totalPages }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Function to update searchParams while preserving other query parameters
    const updatePageParam = (newPage) => {
        const currentParams = Object.fromEntries(searchParams.entries());
        const updatedParams = {
            ...currentParams,
            pageno: newPage,
        };
        setSearchParams(new URLSearchParams(updatedParams));
    };

    // Function to create a range of page numbers with ellipses
    const getPaginationRange = () => {
        const range = [];
        const delta = 2; // Number of pages to display around the current page

        // Calculate the range of pages to display
        const leftBoundary = Math.max(2, page - delta);
        const rightBoundary = Math.min(totalPages - 1, page + delta);

        // First page always displayed
        range.push(1);

        // Show left ellipsis if needed
        if (leftBoundary > 2) {
            range.push('...');
        }

        // Show the range of pages around the current page
        for (let i = leftBoundary; i <= rightBoundary; i++) {
            range.push(i);
        }

        // Show right ellipsis if needed
        if (rightBoundary < totalPages - 1) {
            range.push('...');
        }

        // Last page always displayed
        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    };

    return (
        pageInformation && totalPages > 1 && (
            <div>
                <nav aria-label="Page navigation example">
                    <ul className="flex items-center -space-x-px text-sm pt-3 justify-end">
                        <div
                            className={`${pageInformation?.previous_page === 0 ? 'cursor-not-allowed' : ''} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg`}
                            onClick={() => {
                                if (pageInformation?.previous_page !== 0) {
                                    setPage(page - 1);
                                    updatePageParam(page - 1);
                                }
                            }}
                        >
                            <ChevronLeftIcon
                                className={`h-5 w-5 ${pageInformation?.previous_page === 0 ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}
                            />
                        </div>
                        {getPaginationRange().map((pageNum, i) => (
                            <li key={i}>
                                {pageNum === '...' ? (
                                    <span className="px-3 h-8 leading-tight text-gray-500">...</span>
                                ) : (
                                    <div
                                        onClick={() => {
                                            setPage(pageNum);
                                            updatePageParam(pageNum);
                                        }}
                                        className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-[#282828]-900 ${page === pageNum ? 'bg-[#F4F4F4]' : 'bg-white'} border border-gray-300`}
                                    >
                                        {pageNum}
                                    </div>
                                )}
                            </li>
                        ))}
                        <li>
                            <div
                                className={`${page === pageInformation?.last_page && 'cursor-not-allowed'} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg`}
                                onClick={() => {
                                    if (page !== pageInformation?.last_page) {
                                        setPage(page + 1);
                                        updatePageParam(page + 1);
                                    }
                                }}
                            >
                                <ChevronRightIcon
                                    className={`h-5 w-5 ${page === pageInformation?.last_page ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}
                                />
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    );
};

export default CustomPagination;
