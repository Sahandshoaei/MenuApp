import type { MenuItem } from "../types/menu-item";
import cocaColaImg from "../../../assets/images/menu/cocacola.webp";
import cheesecakeImg from "../../../assets/images/menu/cheesecake.jpg";
import eggsImg from "../../../assets/images/menu/eggs.jpg";
import burgerImg from "../../../assets/images/menu/burger.jpg";
import espressoImg from "../../../assets/images/menu/espresso.jpg";
import mojitoImg from "../../../assets/images/menu/mojito.avif";

/** قیمت‌ها به تومان (عدد صحیح) */
export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "کوکا کولا",
    price: 45000,
    image: cocaColaImg,
    category: "drinks",
    description: "نوشابه خنک و گازدار",
    weightLabel: "۳۳۰ میلی‌لیتر",
    ingredients: "آب گازدار، شکر، رنگ کارامل، کافئین",
  },
  {
    id: "2",
    name: "اسپرسو",
    price: 85000,
    image: espressoImg,
    category: "drinks",
    description: "شات قهوه غلیظ و پرعطر",
    weightLabel: "۳۰ میلی‌لیتر",
    ingredients: "دانه‌های قهوه عربیکا",
  },
  {
    id: "3",
    name: "موجیتو",
    price: 180000,
    image: mojitoImg,
    category: "drinks",
    description: "نوشیدنی خنک با نعنا و لیمو",
    weightLabel: "۳۵۰ میلی‌لیتر",
    ingredients: "نعنا، لیمو، شکر، آب سودا",
  },
  {
    id: "4",
    name: "چیزکیک",
    price: 145000,
    image: cheesecakeImg,
    category: "desserts",
    description: "چیزکیک خامه‌ای با بیسکویت",
    weightLabel: "۱۲۰ گرم",
    ingredients: "پنیر خامه‌ای، بیسکویت، شکر، خامه",
  },
  {
    id: "5",
    name: "املت تخم‌مرغ",
    price: 95000,
    image: eggsImg,
    category: "breakfast",
    description: "املت نرم با نان تازه",
    weightLabel: "۲ عدد",
    ingredients: "تخم‌مرغ، کره، نمک، فلفل",
  },
  {
    id: "6",
    name: "برگر مخصوص",
    price: 285000,
    image: burgerImg,
    category: "sandwiches",
    description: "برگر گوشت با کاهو و گوجه‌فرنگی",
    weightLabel: "۲۵۰ گرم",
    ingredients: "گوشت گوساله، نان برگر، کاهو، گوجه، سس",
  },
];
