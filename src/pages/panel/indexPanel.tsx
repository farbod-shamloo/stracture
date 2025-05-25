import React from "react";

const items = [
  { icon: "fa-home", label: "خانه", link: "/" },
  { icon: "fa-user", label: "کاربران", link: "/panel/users" },
];

const calcPosition = (index, total, radius) => {
  const angle = (index / total) * 2 * Math.PI;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
};

const CircleItem = ({ icon, label, link, position, size = 56 }) => (
  <a
    href={link}
    className="absolute group"
    style={{
      left: `calc(50% + ${position.x}px)`,
      top: `calc(50% + ${position.y}px)`,
      transform: "translate(-50%, -50%)",
      width: size,
      height: size,
    }}
  >
    <div className="w-full h-full rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-transform duration-300 transform group-hover:scale-110 cursor-pointer relative">
      <i className={`fa ${icon} text-black text-2xl`} />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-300">
        {label}
      </div>
    </div>
  </a>
);

const IndexPanel = () => {
  const radius = 120; 

  return (
  <>
    <div className="relative w-96 h-96 mx-auto mt-12">
     
      <svg
        className="absolute inset-0 pointer-events-none"
        width="384"
        height="384"
        viewBox="0 0 384 384"
      >
        {items.map((_, index) => {
          const { x, y } = calcPosition(index, items.length, radius);
          const center = 192;
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={center + x}
              y2={center + y}
              stroke="#6b7280" 
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 w-24 h-24 bg-black rounded-full flex items-center justify-center text-white shadow-xl transform -translate-x-1/2 -translate-y-1/2 z-20">
        <i className="fa fa-globe fa-3x" />
      </div>

      {items.map((item, index) => {
        const position = calcPosition(index, items.length, radius);
        return (
          <CircleItem
            key={index}
            icon={item.icon}
            label={item.label}
            link={item.link}
            position={position}
          />
        );
      })}
      
    </div>
    <div className="text-center">
     <p className="text-blue-500 font-bold">پنل مدیریت کاربران</p>
    
    </div>
  </>
  );
};

export default IndexPanel;
