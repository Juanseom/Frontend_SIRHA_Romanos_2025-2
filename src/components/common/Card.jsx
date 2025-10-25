const Card = ({ title, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-[376px] h-[234px] bg-[#f3f3f3] border border-black hover:bg-gray-200 transition-colors flex flex-col items-center justify-center gap-4"
    >
      <div className="w-40 h-40 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-black text-2xl font-semibold">
        {title}
      </span>
    </button>
  );
};

export default Card;