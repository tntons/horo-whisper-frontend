import TellerCardBrowse from "../../components/TellerCardBrowse";

export default function BrowseTeller() {
  return (
    <div className="flex flex-col items-center overflow-y-auto justify-between">
      <TellerCardBrowse
        imageSrc="/teller00.png"
        rating={4.8}
        tellerName="Golf the Teller"
        tags={["Tarot Reading", "Love and relationship"]}
        description="I have been practicing tarot for over 20 years and graduated from a well-known institution...."
        reviews={28}
        waitTime={3}
        price={200}
        questions={3}
      />
    </div>
  );
}
