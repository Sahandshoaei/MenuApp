import type{ MenuItem } from "../types/menu-item";
import cocaColaImg from "../../../assets/images/menu/cocacola.webp"
import cheesecakeImg from "../../../assets/images/menu/cheesecake.jpg"
import eggsImg from "../../../assets/images/menu/eggs.jpg"
import burgerImg from "../../../assets/images/menu/burger.jpg"
import espressoImg from "../../../assets/images/menu/espresso.jpg"
import mojitoImg from "../../../assets/images/menu/mojito.avif"


export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Coca Cola",
    price: 2.5,
    image:cocaColaImg,
    category: "drinks",
    description: "Refreshing soda beverage",
  },
    {
    id: "2",
    name: "Espresso",
    price: 12,
    image: espressoImg,
    category: "drinks",
    description: "Strong and bold coffee shot",
  },
      {
    id: "3",
    name: "Mojito",
    price: 20,
    image: mojitoImg,
    category: "drinks",
    description: "Refreshing cocktail with mint and lime",
  },

  {
    id: "4",
    name: "Cheesecake",
    price: 6,
    image: cheesecakeImg,
    category: "desserts",
    description: "Creamy cheesecake with a graham cracker crust",
  },

  {
    id: "5",
    name: "Eggs",
    price: 5,
    image: eggsImg,
    category: "breakfast",
    description: "Crispy golden fries with a sprinkle of salt",
  },

  {
    id: "6",
    name: "Burger",
    price: 15,
    image: "...",
    category: "sandwiches",
    description: "Juicy beef burger with lettuce and tomato",
  },
];



