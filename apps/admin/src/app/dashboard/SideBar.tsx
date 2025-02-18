'use client'
import { dashboardRoutes, ICONS } from '@repo/ui/lib';
import MenuLink from './MenuLink';
import Image from 'next/image';
import Link from 'next/link';

const SideBar = () => {
  
  const dashboardRoutesData = [
    {
      module: "User Management",
      href: dashboardRoutes.user
    },
    {
      module: 'Roles Management',
      href: dashboardRoutes.roles,
    },
    {
      module: 'Order Management',
      href: dashboardRoutes.order,
    },
    {
      module: 'Media Assets',
      href: dashboardRoutes.media,
    },
    {
      module: 'Configuration',
      children: [
        {
          module: "Configuration",
          href: dashboardRoutes.configuration,
        },
        {
          module: 'Banner',
          href: dashboardRoutes.banner,
        },
        {
          module: 'Deal of the Day',
          href: dashboardRoutes.dealOfTheDay,
        },
        {
          module: 'Coupon',
          href: dashboardRoutes.coupon,
        },
        {
          module: 'Feedback',
          href: dashboardRoutes.feedback,
        },
      ]
    },
    {
      module: 'Product',
      children: [
        {
          module: 'Products',
          href: dashboardRoutes.products,
        },
        {
          module: 'Product Categories',
          href: dashboardRoutes.productCategories,
        },
        {
          module: 'Product Interests',
          href: dashboardRoutes.productInterests,
        },
        {
          module: 'Product Ages',
          href: dashboardRoutes.productAges,
        },
        {
          module: 'Product Reviews',
          href: dashboardRoutes.reviews,
        },
      ]
    },
    {
      module: "FAQ",
      children: [
        {
          module: 'FAQ',
          href: dashboardRoutes.faq,
        },
        {
          module: 'FAQ Category',
          href: dashboardRoutes.faqCategory,
        }
      ]
    }
  ];


  return (
    <div className="fixed z-20 w-56 h-screen flex flex-col shadow-xl bg-primary-color">
      <Link href={dashboardRoutes.dashboard}>
        <Image
          alt="wollybeeLogoAndText"
          height={36}
          priority
          className="cursor-pointer p-5"
          src={ICONS.admin.sideBarLogo}
          width={200}
        />
      </Link>

      {dashboardRoutesData.map((a, index) => (
        <MenuLink key={index} {...a} />
      ))}
      
    </div>
  );
};

export default SideBar;
