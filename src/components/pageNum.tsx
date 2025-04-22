import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

interface PageNumProps {
  setPage: (page: number) => void;
  pageNum: number;
  totalPage: number;
}

// for table list- don't use
const PageNum = ({ setPage, pageNum, totalPage }: PageNumProps) => {
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={() => handlePageChange(Math.max(1, pageNum - 1))} className="border border-[#d9d9d9]/30" />
        </PaginationItem>
        {/* {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === pageNum}
              onClick={() => handlePageChange(page)}
              className="border-[#d9d9d9]/30"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))} */}
        <PaginationItem>
          <PaginationNext href="#" onClick={() => handlePageChange(Math.min(totalPage, pageNum + 1))} className="border border-[#d9d9d9]/30"  />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PageNum