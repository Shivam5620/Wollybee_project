import Image from 'next/image';
import { ICONS, navBarRoutesClient } from '@repo/ui/lib';
import { useEffect, useState } from 'react';
import MobileProductCard from '../product/MobileProductCard';
import { MultipleItemsCarousel } from '../common/CustomCarousel';
import { IProduct } from '@repo/ui/types';
import { useAppSelector } from '../../../lib/hooks';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { Input } from '../../../ui/components/ui/input';

interface Props {
  searchText: string;
  suggestion: string;
}

const HighlightSuggestion: React.FC<Props> = ({ searchText, suggestion }) => {
  const index =
    suggestion?.toLowerCase()?.indexOf(searchText.toLowerCase()) ?? -1;

  if (index === -1) {
    return <p className="text-primary-gray">{suggestion}</p>;
  }

  const beforeStr = suggestion.substring(0, index);
  const highlightStr = suggestion.substring(index, index + searchText.length);
  const afterStr = suggestion.substring(index + searchText.length);

  return (
    <p className="cursor-pointer">
      {beforeStr.length + highlightStr.length + afterStr.length > 15 ? (
        <>
          <span className="text-primary-gray">{beforeStr}</span>
          <span className="text-black">{highlightStr}</span>
          <span className="text-primary-gray">{afterStr}</span>
        </>
      ) : (
        <>
          <span className="text-primary-gray">{beforeStr}</span>
          <span className="text-black">{highlightStr}</span>
          <span className="text-primary-gray">{afterStr}</span>
        </>
      )}
    </p>
  );
};

interface ISearchContainer {
  close: () => void;
}

const SearchContainer: React.FC<ISearchContainer> = ({ close }) => {
  const { products: productsFromState } = useAppSelector(
    (state) => state.configuration,
  );
  const [productsState, setProductsState] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<
    { title: string; id: number }[]
  >([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (productsFromState.length > 0) {
      setProductsState(productsFromState);
    }
  }, [productsFromState]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText) {
        const filteredProducts: IProduct[] = [];
        const fs = new Fuse(productsState, {
          keys: ['name'],
          threshold: 0.5,
        });
        const result =
          fs.search(searchText)?.map((a) => {
            filteredProducts.push(a.item);
            return { title: a.item.name, id: a.item.id };
          }) ?? [];
        setSuggestions(result);
        setProducts(filteredProducts);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  return (
    <div className="lg:h-[190px] mt-16 lg:mt-0 flex lg:items-center w-full">
      <div className="relative flex gap-2 justify-center w-full">
        <div className="w-[90%] lg:w-[60%] relative flex justify-center">
          <Input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value?.toLowerCase() ?? '');
            }}
            className="lg:ml-10 py-2 px-4 font-heyComic rounded-full border-2 border-secondary-color focus:border-primary-color"
          />

          <Image
            onClick={() => {
              close();
            }}
            alt="close"
            className="cursor-pointer h-10"
            src={ICONS.closeIcon}
            width={40}
            height={40}
          />

          <Image
            className="absolute right-12 top-2 opacity-60 p-1 lg:p-0"
            src={ICONS.searchIcon}
            width={32}
            height={32}
            alt="search"
          />
        </div>
        {searchText && (
          <div className="md:shadow-md rounded-xl bg-white absolute top-11 w-screen md:w-[70%] xl:w-[55%]  md:h-[435px] lg:h-[320px] px-1 py-2 no-scrollbar overflow-y-scroll max-h-screen">
            <div className="grid grid-cols-12 gap-3 p-2 lg:h-[265px] mb-32 md:mb-0">
              <div className="col-span-12 lg:col-span-3 text-left">
                <p className="font-heyComic text-md text-primary-gray">
                  Suggestions
                </p>

                <div className="font-heyComic font-light mt-4">
                  {suggestions.slice(0, 4).map((a) => (
                    <HighlightSuggestion
                      key={a.id} // Use a unique identifier for the key
                      searchText={searchText}
                      suggestion={a.title}
                    />
                  ))}
                </div>
              </div>

              {products.map((a) => (
                <div className="md:hidden col-span-6 sm:col-span-3" key={a.id}>
                  <MobileProductCard product={a} />
                </div>
              ))}

              <div className="hidden md:block col-span-12 lg:col-span-9">
                {products.length < 3 ? (
                  <div className="flex gap-2">
                    {products.map((a) => (
                      <div className="" key={a.id}>
                        <MobileProductCard product={a} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="">
                    <MultipleItemsCarousel
                      Component={(product) => (
                        <MobileProductCard product={product} />
                      )}
                      slidesPerView={3}
                      carouselId="search-card-carousel"
                      data={products}
                      arrows={{
                        left: ICONS.carouselArrows.grayLeft,
                        right: ICONS.carouselArrows.grayRight,
                      }}
                      className="p-2"
                      defaultSlidesPerView={3}
                      loop={true}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="hidden w-full px-5 lg:flex justify-between border-t-2 border-primary-color py-2">
              <p className="font-heyComic text-lg text-primary-gray">
                Search for "{searchText}"
              </p>
              <Link href={navBarRoutesClient.shopAll}>
                <Image
                  onClick={() => close()}
                  className="cursor-pointer"
                  src={ICONS.rightArrowIcon}
                  width={20}
                  height={20}
                  alt="enter"
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
