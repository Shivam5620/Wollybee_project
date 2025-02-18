export interface ITabRoutes {
  label: string;
  url: string;
  color: string;
}

export const tabRoutes: ITabRoutes[] = [
  {
    label: 'Shop All',
    url: '/shop-all',
    color: '#FFC648',
  },
  {
    label: 'Shop by age',
    url: '/shop-by-age',
    color: '#3884C5',
  },
  {
    label: 'Shop by Interests',
    url: '/shop-by-interests',
    color: '#8AC48A',
  },
  {
    label: 'Combos & Gift Sets',
    url: '/combo-gift-sets',
    color: '#4D4D4D',
  },
  {
    label: 'Our Story',
    url: '/our-story',
    color: '#FFC648',
  },
  {
    label: 'Why we are loved',
    url: '/why-wollybee',
    color: '#3884C5',
  },
];

export const mobileNavRoutes: ITabRoutes[] = [
  {
    label: 'Shop All',
    url: '/shop-all',
    color: '#FFC648',
  },
  {
    label: 'Shop by age',
    url: '/shop-by-age',
    color: '#3884C5',
  },
  {
    label: 'Shop by Interest',
    url: '/shop-by-interests',
    color: '#8AC48A',
  },
  {
    label: 'Offers',
    url: '/offers',
    color: '#FFC648',
  },
  {
    label: 'FAQ',
    url: '/faq',
    color: '#3884C5',
  },
];
