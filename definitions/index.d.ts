import { Theme } from 'nuxt-fela';

export interface App {
  breakpoint: number;
  color: string;
  colors: string[];
  isMenuActive: boolean;
  isScrolled: boolean;
}

export interface Contact {
  address: ContactAddress;
  content: string;
  email: IconedType;
  phone: IconedType;
  social: ContactSocial;
}

export interface ContactAddress {
  city: string;
  extra: string;
  icon: string;
  latitude: number;
  longitude: number;
  street: string;
  zipcode: string;
}

export interface ContactSocial {
  facebook: Iconed;
  messenger: Iconed;
  skype: Iconed;
  viber: Iconed;
  whatsapp: Iconed;
}

export interface Hero {
  image: Image;
  subtitle: string;
  title: string;
}

export interface Iconed {
  icon: string;
  value: string;
}

export interface IconedType extends Iconed {
  type: string;
}

export interface Image {
  alt?: string;
  src: string;
}

export interface Introduction {
  content: string;
  image: Image;
  title: string;
}

export interface Member {
  image: Image;
  name: string;
  role: string;
}

export type Menu = MenuItem[];

export interface MenuItem {
  exact: boolean;
  icon?: string;
  id: string;
  label?: string;
  link: string;
}

export interface Partner {
  image: Image;
  link: string;
  title: string;
}

export interface Preset {
  height?: number;
  maxHeight?: number;
  maxWidth?: number;
  sizes?: string[];
  srcSet?: string[];
  width?: number;
}

export interface Product {
  colorings: ProductColoring[];
  drawings: string;
  extras: string[];
  image: Image;
  images: Image[];
  isDiscount: boolean;
  isNew: boolean;
  order: number;
  pricing: ProductPricing;
  subtitle: string;
  title: string;
}

export interface ProductColoring {
  colors: string[];
  description: string;
}

export interface ProductPricing {
  coop: number;
  max: number;
  min: number;
  selected: number;
}

export interface Question {
  content: string;
  order: number;
  section: number;
  title: string;
}

export interface Testimony {
  content: string;
  date: string;
  from: string;
  image: Image;
  title: string;
}

export interface Theme extends Theme {
  theContactBarHeight: number;
}