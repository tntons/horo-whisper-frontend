export default function TellerDetail() {
  const packages = [
    { price: 200, questions: 3 },
    { price: 300, questions: 5 },
    { price: 500, questions: 10 },
  ];

  const reviews = [
    {
      name: "Chalisa P***",
      date: "19/03/2025",
      title: "Life-Changing Reading!",
      review: "Golf the Teller gave me so much clarity about my relationship",
      rating: 5,
    },
    {
      name: "Saharat N***",
      date: "16/03/2025",
      title: "A Guiding Light in My Love Life",
      review:
        "I felt lost after a breakup, but Golf's reading helped me understand what I needed to heal and move forward.",
      rating: 5,
    },
    {
      name: "Chalisa P***",
      date: "13/03/2025",
      title: "Life-Changing Reading!",
      review: "Golf the Teller gave me so much clarity about my relationship",
      rating: 5,
    },
    {
      name: "Chalisa P***",
      date: "13/03/2025",
      title: "Life-Changing Reading!",
      review: "Golf the Teller gave me so much clarity about my relationship",
      rating: 5,
    },
    {
      name: "Chalisa P***",
      date: "13/03/2025",
      title: "Life-Changing Reading!",
      review: "Golf the Teller gave me so much clarity about my relationship",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Teller Info Card */}
        <div className="bg-greybackground m-4 rounded-lg p-3 border border-greyborder">
          <div className="flex gap-4">
            <div className="w-24 h-28 bg-gray-200 rounded-lg flex-shrink-0">
              {/* Placeholder for teller image */}
            </div>

            <div className="flex-1">
              <div className="flex justify-between w-full">
                <h2 className=" font-medium mt-2">Golf the teller</h2>
                <p className="text-gray-500 underline"> Report</p>
              </div>

              <div className="flex gap-2 mt-2">
                <span className="bg-yellow01 text-yellow03 flex items-center text-sm px-2  rounded-xl border border-yellow02">
                  Tarot Reading
                </span>
                <span className="bg-pink01 text-pink03 flex items-center text-sm px-2 py-1 rounded-xl border border-pink02">
                  Love and Relationship
                </span>
              </div>

              <div className="flex mt-2">
                <p className="text-md">28 Reviews</p>
              </div>

              <div className="flex ">
                <p className="text-md">Expected wait time - 3 minutes</p>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="mt-4 flex gap-4">
            {/* Left Column - Packages */}
            <div className="w-1/2">
              <div className="flex justify-center">
                <p className="bg-purple01/30 flex items-center text-md px-2 w-fit rounded-xl border border-black">
                  Packages
                </p>
              </div>

              <div className="flex flex-col mt-2 gap-1 ml-6">
                {packages.map((pkg, index) => (
                  <p key={index}>
                    ฿ {pkg.price} / {pkg.questions} questions
                  </p>
                ))}
              </div>
            </div>

            {/* Dividing Line */}
            <div className="border-l border-dashed border-[#D0D0D0]"></div>

            {/* Right Column - Description */}
            <div className="w-1/2 mt-1">
              <p>
                &quot;I have been practicing tarot for over 20 years and
                graduated from a well-known institution specializing in
                spiritual and intuitive arts. My passion lies in helping people
                find clarity in love and relationships.&quot;
              </p>
            </div>
          </div>

          {/* Book Button */}
          <div className="flex justify-center mt-4">
            <button className="bg-purple04 text-white rounded-xl px-28 py-1">
              <span className="text-xl">Book</span>
            </button>
          </div>

        </div>

        {/* Reviews Section */}
        <div className="mx-4 mb-20 border border-greyborder rounded-t-lg">
          <div className="bg-purple02 text-white px-4 py-2 rounded-t-lg">
            <h1>Reviews</h1>
          </div>

          <div>
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-3 border-b-2 border-greyborder"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#D9D9D9] rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p>{review.name}</p>
                      <p className="text-greydate">{review.date}</p>
                    </div>
                    <div className="flex text-[#FFC13C] text-md">
                      {"★ ".repeat(review.rating)}
                    </div>
                  </div>
                </div>

                <h1 className=" text-[13px] font-medium mt-2">
                  {review.title}
                </h1>
                <p className="mt-0.5">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
