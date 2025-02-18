'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ICONS } from '@repo/ui/lib';
import { IFaq, IFaqCategory } from '@repo/ui/types/faq';
import { Input } from '../../ui/components/ui/input';

interface IFAQItem {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  setItem: (a: number) => void;
  selectedItem: number;
}
function FAQItem({
  index,
  question,
  answer,
  isOpen,
  setItem,
  selectedItem,
}: IFAQItem) {
  const handleClick = () => {
    if (isOpen) {
      if (selectedItem == index - 1) {
        setItem(-1);
      } else {
        setItem(index - 1);
      }
    } else {
      setItem(index - 1);
    }
  };

  return (
    <div className="">
      <div
        onClick={handleClick}
        className={`text-primary-black text-lg ${!isOpen ? `border-b-[1px]` : ''} py-3 sm:py-6 font-helveticaRoundedBold items-center justify-between flex`}
      >
        <p>{`${index}. ${question}`}</p>

        {isOpen ? (
          <Image
            className="cursor-pointer"
            width={25}
            height={25}
            src={ICONS.collapseMinusIcon}
            alt="close"
          />
        ) : (
          <Image
            className="cursor-pointer"
            width={25}
            height={25}
            src={ICONS.expandPlusIcon}
            alt="open"
          />
        )}
      </div>
      {isOpen && (
        <p
          className={`pb-5 font-helvetica md:border-b-2 border-b-[1px] text-md text-primary-black py-2`}
        >
          {answer}
        </p>
      )}
    </div>
  );
}

const FAQ = ({ categories }: { categories: IFaqCategory[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<IFaqCategory | null>(
    categories.length > 0 ? categories[0] : null,
  );

  const [selectedFAQItem, setSelectedFAQItem] = useState<number>(-1);
  const [searchText, setSearchText] = useState<string>('');
  const [searchedFAQS, setSearchedFAQS] = useState<IFaq[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  const handleSearch = () => {
    const searchedFAQSList: IFaq[] = [];
    categories.forEach((a) => {
      a.faqs.forEach((b) => {
        if (b.question.toLowerCase().includes(searchText.toLowerCase())) {
          searchedFAQSList.push(b);
        }
      });
    });
    setSearchedFAQS(searchedFAQSList);
    if (searchedFAQSList.length == 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    setSelectedCategory(null);
  };

  const colorOptionsForCategories: string[] = [
    'primary-color',
    'tertiary-red',
    'secondary-color',
    'venetian-red',
    'tertiary-green',
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText) {
        handleSearch();
      } else {
        setSearchedFAQS([]);
        setNoResults(false);
        setSelectedCategory(categories[0]);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  return (
    <div>
      <Image
        className="w-full  object-cover  sm:block hidden"
        width={1440}
        height={728}
        src="/backgrounds/faqBanner.svg"
        alt="faqbanner"
      />
      <Image
        className="w-full object-cover sm:hidden"
        width={1440}
        height={728}
        src="/backgrounds/faqBannerMobile.svg"
        alt="faqbanner"
      />

      <div className="grid grid-cols-12 md:mx-10 mx-4 py-10 md:px-16">
        <div className="col-span-12 md:col-span-3">
          <p className="text-2xl text-primary-black font-heyComic">
            Top Questions{' '}
          </p>

          <div className="flex items-center gap-1">
            <Input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              type="text"
              placeholder="Search"
              className="border-t-0 border-r-0 border-l-0 w-full md:w-44 p-2 outline-none md:border-b-2 border-b-[1px] md:border-media-button-gray border-media-button-gray mb-10"
            />
            <Image
              className="pb-5 cursor-pointer"
              src={ICONS.searchIcon}
              width={30}
              height={30}
              alt="searchIcon"
            />
          </div>

          <div className="hidden md:block">
            {categories.map((a, index) => (
              <div key={index}>
                <p
                  onClick={() => {
                    setSelectedCategory(a);
                    setSelectedFAQItem(0);
                    setSearchText('');
                    setSearchedFAQS([]);
                    setNoResults(false);
                  }}
                  className={` py-2 font-heyComic cursor-pointer text-xl ${a.name == selectedCategory?.name ? 'text-primary-color' : 'text-primary-black '}`}
                >
                  {a.name}
                </p>
              </div>
            ))}
          </div>
          <div className="md:hidden flex overflow-x-scroll no-scrollbar">
            {categories.map((a, index) => (
              <div
                onClick={() => {
                  setSelectedCategory(a);
                  setSelectedFAQItem(0);
                  setSearchText('');
                  setSearchedFAQS([]);
                  setNoResults(false);
                }}
                key={index}
              >
                <p
                  className={`${selectedCategory?.name == a.name ? `bg-${colorOptionsForCategories[index % colorOptionsForCategories.length]} text-white` : `border-2 border-${colorOptionsForCategories[index % colorOptionsForCategories.length]}`} text-${colorOptionsForCategories[index % colorOptionsForCategories.length]} whitespace-nowrap rounded-full px-2 py-1 mr-4 text-xl font-heyComic`}
                >
                  {a.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 mt-10">
          {searchText != '' &&
            searchedFAQS.length != 0 &&
            searchedFAQS.map((a, index) => (
              <FAQItem
                key={index}
                answer={a.answer}
                index={index + 1}
                isOpen={selectedFAQItem === index}
                question={a.question}
                selectedItem={selectedFAQItem}
                setItem={(ind) => setSelectedFAQItem(ind)}
              />
            ))}

          {noResults && (
            <p className="font-heyComic text-lg text-tertiary-green">
              No exact matches found.. Try searching something else.
            </p>
          )}

          {searchText == '' &&
            selectedCategory?.faqs.map((a, index) => (
              <FAQItem
                key={index}
                answer={a.answer}
                index={index + 1}
                isOpen={selectedFAQItem === index}
                question={a.question}
                selectedItem={selectedFAQItem}
                setItem={(ind) => setSelectedFAQItem(ind)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
