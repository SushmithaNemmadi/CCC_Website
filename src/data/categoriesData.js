//categoriesData.js

import womenFootwearImg from "../assets/women-footwear.png";
import electronicsImg from "../assets/electronics.png";
import mobilePhonesImg from "../assets/mobile-phones.png";
//import dressImg from "../assets/dress.png";
import toysImg from "../assets/toys.png";
import appliancesImg from "../assets/appliances.png";
import decorativesImg from "../assets/decoratives.png";
//import jewelleryImg from "../assets/jewellery.png";
import groceryImg from "../assets/grocery.png";
import furnitureImg from "../assets/furniture.png";
import menimg from "../assets/men.png";
import kidsimg from "../assets/kids.png";
import menfootwear_img from "../assets/men_footwear.png";

import woman1 from "../assets/woman1.png";
import woman2 from "../assets/woman2.png";
import woman3 from "../assets/woman3.png";
import woman4 from "../assets/woman4.png";

const categoriesData = {
  women: [
    {
      id: 101,
      name: "Vark Lilac Floral Design A-Line Ethnic Set",
      description: "Elegant lilac ethnic set with floral prints.",
      price: 2599,
      image: woman1,
      category: "women",
    },
    {
      id: 102,
      name: "Vark Lavender Embroidered Cotton-Blend A-Line Ethnic Set",
      description: "Lavender embroidered cotton-blend ethnic wear.",
      price: 3499,
      image: woman2,
      category: "women",
    },
    {
      id: 103,
      name: "Vark Purple Floral Embroidered A-Line Ethnic Set",
      description: "Purple floral embroidered ethnic set.",
      price: 2999,
      image: woman3,
      category: "women",
    },
    {
      id: 104,
      name: "Vark Indigo Embroidered Cotton-Blend A-Line Ethnic Set",
      description: "Indigo cotton-blend ethnic set with embroidery.",
      price: 3499,
      image: woman4,
      category: "women",
    },
    {
      id: 1,
      name: "Floral Dress",
      description: "Lightweight summer floral dress",
      price: 1200,
      image: "/images/floral-dress.jpg",
      category: "women",
    },
  ],

  men: [
    {
      id: 2,
      name: "Men T-Shirt",
      description: "Comfortable cotton t-shirt",
      price: 800,
      image: menimg,
      category: "men",
    },
  ],

  kids: [
    {
      id: 3,
      name: "Kids Jacket",
      description: "Warm winter jacket for kids",
      price: 1500,
      image: kidsimg,
      category: "kids",
    },
  ],

  "men-footwear": [
    {
      id: 4,
      name: "Men Running Shoes",
      description: "Breathable running shoes",
      price: 2500,
      image: menfootwear_img,
      category: "men-footwear",
    },
  ],

  "women-footwear": [
    {
      id: 5,
      name: "Heels",
      description: "Elegant party heels",
      price: 1299,
      image: womenFootwearImg,
      category: "women-footwear",
    },
    {
      id: 6,
      name: "Flats",
      description: "Comfortable daily wear flats",
      price: 899,
      image: womenFootwearImg,
      category: "women-footwear",
    },
  ],

  Laptops: [
    {
      id: 7,
      name: "Laptop",
      description: "High-performance laptop",
      price: 49999,
      image: electronicsImg,
      category: "electronics",
    },
    {
      id: 8,
      name: "Headphones",
      description: "Wireless over-ear headphones",
      price: 2999,
      image: electronicsImg,
      category: "electronics",
    },
  ],

  mobile: [
    {
      id: 9,
      name: "iPhone",
      description: "Apple iPhone 14 Pro",
      price: 69999,
      image: mobilePhonesImg,
      category: "mobile",
    },
    {
      id: 10,
      name: "Samsung",
      description: "Samsung Galaxy S23",
      price: 59999,
      image: mobilePhonesImg,
      category: "mobile",
    },
  ],
  toys: [
    {
      id: 13,
      name: "Teddy Bear",
      description: "Soft and cuddly teddy bear",
      price: 499,
      image: toysImg,
      category: "toys",
    },
    {
      id: 14,
      name: "RC Car",
      description: "Remote-controlled racing car",
      price: 1499,
      image: toysImg,
      category: "toys",
    },
  ],

  "home-appliances": [
    {
      id: 15,
      name: "Air Conditioner",
      description: "Energy efficient AC",
      price: 25999,
      image: appliancesImg,
      category: "home-appliances",
    },
    {
      id: 16,
      name: "Washing Machine",
      description: "Top-load automatic washing machine",
      price: 19999,
      image: appliancesImg,
      category: "home-appliances",
    },
  ],

  decoratives: [
    {
      id: 17,
      name: "Wall Art",
      description: "Abstract canvas wall art",
      price: 999,
      image: decorativesImg,
      category: "decoratives",
    },
    {
      id: 18,
      name: "Table Lamp",
      description: "Minimalist table lamp",
      price: 799,
      image: decorativesImg,
      category: "decoratives",
    },
  ],
  grocery: [
    {
      id: 21,
      name: "Basmati Rice",
      description: "Premium long grain rice",
      price: 999,
      image: groceryImg,
      category: "grocery",
    },
    {
      id: 22,
      name: "Wheat Flour",
      description: "Whole wheat atta 5kg",
      price: 499,
      image: groceryImg,
      category: "grocery",
    },
  ],

  furniture: [
    {
      id: 23,
      name: "Sofa Set",
      description: "5-seater wooden sofa set",
      price: 29999,
      image: furnitureImg,
      category: "furniture",
    },
    {
      id: 24,
      name: "Dining Table",
      description: "4-seater dining table",
      price: 18999,
      image: furnitureImg,
      category: "furniture",
    },
  ],
};

// Add this new export: a flat array of all products from all categories
const allProducts = [
  ...categoriesData.women,
  ...categoriesData.men,
  ...categoriesData.kids,
  ...categoriesData["men-footwear"],
  ...categoriesData["women-footwear"],
  ...categoriesData.Laptops,
  ...categoriesData.mobile,
 // ...categoriesData.dress,
  ...categoriesData.toys,
  ...categoriesData["home-appliances"],
  ...categoriesData.decoratives,
  //...categoriesData.jewellery,
  ...categoriesData.grocery,
  ...categoriesData.furniture,
];

export default categoriesData;
export { allProducts };
