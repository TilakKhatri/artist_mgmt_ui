import { NavItem } from "@/types/index";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  dob?: any;
  gender: any;
}
export const users: User[] = [
  {
    id: 1,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    dob: "2002-01-02",
    gender: "m",
  },
  {
    id: 2,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    gender: "m",
  },
  {
    id: 3,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    gender: "m",
  },
  {
    id: 4,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    gender: "m",
  },
  {
    id: 5,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    gender: "m",
  },
  {
    id: 6,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    gender: "m",
  },
  {
    id: 7,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    gender: "m",
  },
  {
    id: 8,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    gender: "m",
  },
  {
    id: 9,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    gender: "m",
  },
  {
    id: 10,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    gender: "m",
  },
  {
    id: 11,
    first_name: "firstname",
    last_name: "lastname",
    email: "hell@gmail.com",
    password: "tyui6789",
    phone: "90823930303",
    address: "kanjdkjfkdjf",
    gender: "m",
  },
];

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Artist",
    href: "/dashboard/artist",
    icon: "kanban",
    label: "artist",
  },
];
