export default function SchoolProgramCard() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center rounded-lg overflow-hidden max-w-8xl 2xl:max-w-[85%] mx-auto my-10 bg-white">
      {/* Left Image Section (for md and above) */}
      <div className="hidden lg:flex justify-center ml-10 self-center">
        <img
          src="/cafAssessment.svg"
          alt="Students in classroom"
          className="w-full lg:w-240 lg:h-140 xl:w-230 xl:h-120 [@media(min-width:1536px)_and_(max-width:1700px)]:h-135 [@media(min-width:1536px)_and_(max-width:1700px)]:w-250 [@media(min-width:1701px)_and_(max-width:2900px)]:h-110 object-cover grayscale"
        />
      </div>

      {/* Right Content Section */}
      <div className="w-full md:w-200 p-6 md:p-10 flex flex-col justify-center text-center lg:text-left lg:gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold inline-block py-1 mb-4 lg:mb-12 text-gray-900">
          CAFs Programs At schools
        </h2>

        {/* Image only visible on small devices (below md) */}
        <div className="block lg:hidden mb-4">
          <img
            src="/programs.png"
            alt="Students in classroom"
            className="w-full h-80 sm:h-90 object-cover rounded-md grayscale"
          />
        </div>

        <p className="text-gray-700 text-sm sm:text-base md:text-[1.1rem] lg:text-[1.1rem] leading-relaxed md:pr-6 2xl:mr-10">
          Children go through key stages—from early bonding and trust-building in infancy,
          to developing independence and self-control in toddlerhood, and forming friendships
          and understanding social rules in early childhood. As they grow, school-age kids
          build self-esteem, empathy, and teamwork, while adolescents explore identity,
          values, and emotional regulation, shaping their social and psychological maturity.
          Children go through key stages—from early bonding and trust-building in infancy,
          to developing independence and self-control in toddlerhood, and forming friendships
          and understanding social rules in early childhood. As they grow, school-age kids
          build self-esteem, empathy, and teamwork, while adolescents explore identity,
          values, and emotional regulation.
        </p>
      </div>
    </div>
  );
}
