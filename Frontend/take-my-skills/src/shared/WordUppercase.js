 export default function writeAWordWithoutFullUppercase  (adCategory) {
  return adCategory.charAt(0).toUpperCase() + adCategory.slice(1).toLowerCase();
};

