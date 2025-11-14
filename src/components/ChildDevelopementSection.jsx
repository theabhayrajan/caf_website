// components/ChildDevelopment.js
import Image from 'next/image';

const stages = [
  {
    title: "Cognitive Development",
    description: "Children’s thinking and learning abilities develop progressively with age, becoming more complex over time. Supportive environments and playful learning experiences are key to nurturing this growth."
  },
  {
    title: "Social and Emotional Development",
    description: "Children’s thinking and learning abilities develop progressively with age, becoming more complex over time. Supportive environments and playful learning experiences are key to nurturing this growth."
  },
  {
    title: "Speech and Language Development",
    description: "Children’s thinking and learning abilities develop progressively with age, becoming more complex over time. Supportive environments and playful learning experiences are key to nurturing this growth."
  },
  {
    title: "Fine Motor Skill Development",
    description: "Children’s thinking and learning abilities develop progressively with age, becoming more complex over time. Supportive environments and playful learning experiences are key to nurturing this growth."
  },
  {
    title: "Gross Motor Skill Development",
    description: "Children’s thinking and learning abilities develop progressively with age, becoming more complex over time. Supportive environments and playful learning experiences are key to nurturing this growth."
  }
];

const ChildDevelopmentSection = () => {
  return (
    
    <div className="container px-10 py-10 mx-auto max-w-8xl lg:max-w-[100vw] xl:max-w-[95vw] [@media(min-width:1536px)_and_(max-width:1550px)]:max-w-[95vw] [@media(min-width:1551px)_and_(max-width:1900px)]:max-w-[85vw] [@media(min-width:1700px)_and_(max-width:2900px)]:max-w-[75vw]">
      {/* Top Section */}
      <div className="text-left mb-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-10 2xl:whitespace-nowrap">
          The Journey of Child Development: Navigating Key Stages from Infancy to Adolescence
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mt-4 text-left 2xl:pr-18">
          Children go through key stages—from early bonding and trust-building in infancy, to developing independence and self-control in toddlerhood, 
          and forming friendships and understanding social rules in early childhood. As they grow, school-age kids build self-esteem, empathy, 
          and teamwork, while adolescents explore identity, values, and emotional regulation, shaping their social and psychological maturity.
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between gap-4 2xl:w-[70vw] justify-self-center">
        {/* Image Section */}
        <div className="lg:block hidden w-80">
          <Image
            src="/journey.svg" // Replace with the actual image URL
            alt="Child Development"
            width={300}
            height={200}
            className="w-full h-auto lg:h-160 [@media(min-width:1152px)_and_(max-width:1277px)]:h-130 [@media(min-width:1152px)_and_(max-width:1277px)]:-translate-y-11 xl:h-140 2xl:h-145 [@media(min-width:1900px)_and_(max-width:2900px)]:h-160 lg:-translate-y-13 xl:-translate-y-10 2xl:-translate-y-12"
          />
        </div>

        {/* Text Section */}
        <div className="flex-2">
          <ul className="space-y-[2vh] lg:space-x-[3vh] xl:space-y-[4vh] w-full">
            {stages.map((stage, index) => (
              <li key={index}>
                <h2 className="text-2xl font-semibold text-gray-800">{index + 1}. {stage.title}</h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  {stage.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChildDevelopmentSection;
