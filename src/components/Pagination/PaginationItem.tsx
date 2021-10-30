import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{ gbColor: "pink.500", cursor: "default" }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      width="4"
      colorScheme="gray.700"
      _hover={{ gbColor: "pink.500" }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
