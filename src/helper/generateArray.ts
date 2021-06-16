export function generateArrayAndRandomize(
  cardType: string,
  cardNumber: number
) {
  const animals = [
    "australian-shepherd",
    "basenji",
    "basset-hound",
    "beagle",
    "beagle2",
    "border-collie",
    "boxer",
    "bull-terrier",
    "bulldog",
    "chihuahua",
    "corgi",
    "dachshund",
    "dalmatian",
    "french-bulldog",
    "golden-retriever",
    "great-dane",
    "jack-russell-terrier",
    "labrador-retriever",
    "miniature-schnauzer",
    "pitbull",
    "pointer",
    "pomeranian",
    "poodle",
    "rottweiler",
    "saint-bernard",
    "samoyed",
    "shar-pei",
    "shiba-inu",
    "shih-tzu",
    "siberian-husky",
    "yorkshire-terrier",
    "dogdog",
  ];
  const fruits = [
    "apricot",
    "avocado",
    "banana",
    "basil",
    "beet",
    "bell-pepper",
    "berries",
    "blueberry",
    "broccoli",
    "cabbage",
    "cauliflower",
    "coconut",
    "fig",
    "garlic",
    "grapefruit",
    "guava",
    "kiwi",
    "lemon",
    "mango",
    "orange",
    "papaya",
    "passion-fruit",
    "persimmon",
    "pineapple",
    "plum",
    "potato",
    "raspberry",
    "spinach",
    "strawberry",
    "tomato",
    "watermelon",
    "grapes",
  ];
  function generateArray(arraytype: string[], n: number) {
    const rand = Math.floor(Math.random() * (32 - n));
    const newArray = arraytype.slice(rand, rand + n);
    const lastnewArray = [...newArray, ...newArray];
    return lastnewArray.sort(() => Math.random() - 0.5);
  }
  if (cardType === "animal") {
    if (cardNumber === 4) {
      return generateArray(animals, 8);
    }
    if (cardNumber === 6) {
      return generateArray(animals, 18);
    }
    if (cardNumber === 8) {
      return generateArray(animals, 32);
    }
  }
  if (cardType === "fruit") {
    if (cardNumber === 4) {
      return generateArray(fruits, 8);
    }
    if (cardNumber === 6) {
      return generateArray(fruits, 18);
    }
    if (cardNumber === 8) {
      return generateArray(fruits, 32);
    }
  }
  return [];
}
