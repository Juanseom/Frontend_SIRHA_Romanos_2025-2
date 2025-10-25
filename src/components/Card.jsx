const Card = ({ title, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-[376px] h-[200px] sm:h-[220px] md:h-[234px] bg-[#f3f3f3] border border-black hover:bg-gray-200 transition-colors flex flex-col items-center justify-center gap-3 sm:gap-4 mx-auto"
    >
      <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-lg sm:text-xl md:text-2xl font-semibold px-4 text-center">
        {title}
      </span>
    </button>
  );
};

export default Card