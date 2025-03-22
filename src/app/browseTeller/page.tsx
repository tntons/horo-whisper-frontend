import TellerCardBrowse from "../../components/TellerCardBrowse";
import SearchBar from "../../components/SearchBar";

const tellers = [
  {
    imageSrc: "/teller00.png",
    rating: 4.8,
    tellerName: "Golf the Teller",
    tags: ["Tarot Reading", "Love and relationship"],
    description:
      "I have been practicing tarot for over 20 years and graduated from a well-known institution....",
    reviews: 28,
    waitTime: 3,
    price: 200,
    questions: 3,
  },
  {
    imageSrc: "/teller00.png",
    rating: 1.4,
    tellerName: "Golfy the Teller",
    tags: ["Love and relationship"],
    description:
      "I have been in love for over 20 years and graduated from romance novels....",
    reviews: 2,
    waitTime: 100,
    price: 20,
    questions: 5,
  },
];

export default function BrowseTeller() {
  return (
    <div className="flex flex-col items-center overflow-y-auto justify-between">
      <SearchBar />

      {tellers.map((teller, index) => (
        <TellerCardBrowse key={index} {...teller} />
      ))}
    </div>
  );
}
