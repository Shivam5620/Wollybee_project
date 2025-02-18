'use client';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { Button } from '../../../ui/components/ui/button';

const FilterChipElement = ({
  item,
  className = '',
}: {
  item: any;
  className?: ClassNameValue;
}) => {
  const handleScroll = (id: string) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    const element = isMobile
      ? document.getElementById('shop-by-age-carousel-mobile-' + id)
      : document.getElementById('shop-by-age-carousel-desktop-' + id);
    if (element) {
      // Calculate the position to scroll to (200px above the element)
      const offset = 185;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = elementPosition - offset;
      // Smoothly scroll to the calculated position
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Button
      onClick={() => handleScroll(item.id)}
      style={{
        backgroundColor: item.color,
        color: 'white',
      }}
      className={twMerge(
        `mx-1 min-w-44 text-center cursor-pointer md:w-[85%] justify-center flex font-heyComic text-nowrap xl:py-3 md:py-2.5 text-lg  px-1 border-none md:text-base xl:text-lg rounded-full`,
        className,
      )}
    >
      {item.name}
    </Button>
  );
};

export default FilterChipElement;
