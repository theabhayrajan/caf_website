// components/ChildDevelopment.js
import Image from 'next/image';

const stages = [
  {
    title: "Cognitive Development",
    description: "Children's thinking and learning abilities develop progressively with age, becoming more complex over time. Supportive environments and playful learning experiences are key to nurturing this growth."
  },
  {
    title: "Social and Emotional Development",
    description: "Children's thinking and learning abilities develop progressively with age, becoming more complex over time. Supportive environments and playful learning experiences are key to nurturing this growth."
  },
  {
    title: "Speech and Language Development",
    description: "Children's thinking and learning abilities develop progressively with age, becoming more complex over time. Supportive environments and playful learning experiences are key to nurturing this growth."
  },
  {
    title: "Fine Motor Skill Development",
    description: "Children's thinking and learning abilities develop progressively with age, becoming more complex over time. Supportive environments and playful learning experiences are key to nurturing this growth."
  },
  {
    title: "Gross Motor Skill Development",
    description: "Children's thinking and learning abilities develop progressively with age, becoming more complex over time. Supportive environments and playful learning experiences are key to nurturing this growth."
  }
];

const ChildDevelopmentSection = () => {
  return (
    <div className="container px-10 py-5 mx-auto max-w-8xl lg:max-w-[100vw] xl:max-w-[95vw] [@media(min-width:1536px)_and_(max-width:1550px)]:max-w-[95vw] [@media(min-width:1551px)_and_(max-width:1900px)]:max-w-[85vw] [@media(min-width:1700px)_and_(max-width:2900px)]:max-w-[75vw]">
      {/* Top Section */}
      <div className="text-left mb-10">
        <h1 className="text-[1.5rem] md:text-[1.7rem] lg:text-3xl font-bold text-gray-800 mb-10 2xl:whitespace-nowrap">
          The Journey of Child Development: Navigating Key Stages from Infancy to Adolescence
        </h1>
        <p className="text-lg md:text-[1.2rem] text-gray-600 leading-relaxed mt-4 text-left 2xl:pr-18">
          Children go through key stages—from early bonding and trust-building in infancy, to developing independence and self-control in toddlerhood, 
          and forming friendships and understanding social rules in early childhood. As they grow, school-age kids build self-esteem, empathy, 
          and teamwork, while adolescents explore identity, values, and emotional regulation, shaping their social and psychological maturity.
        </p>
      </div>

      {/* Bottom Section - Using CSS Grid for alignment */}
      <div className="lg:grid lg:grid-cols-[auto_1fr] lg:gap-8 2xl:w-[70vw] mx-auto">
        {/* Image Section */}
        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <Image
            src="/journey.svg"
            alt="Child Development"
            width={300}
            height={600}
            className="w-auto h-auto max-w-[370px] -translate-y-10 xl:max-w-[400px]"
          />
        </div>

        {/* Text Section - Using Grid to align with image arrows */}
        <div className="flex flex-col justify-between py-4 lg:py-8">
          {stages.map((stage, index) => (
            <div 
              key={index} 
              className="flex items-center mb-8 lg:mb-0"
            >
              <div className="flex-1">
                <h2 className="text-2xl md:text-[1.5rem] font-semibold text-gray-800 mb-2">
                  {index + 1}. {stage.title}
                </h2>
                <p className="text-gray-600 text-[1.1rem] sm:text-[1.15rem] md:text-[1.2rem] leading-relaxed mb-5">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChildDevelopmentSection;
