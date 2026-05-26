const Header = () => {
  return (
    <div className="w-full flex items-center justify-between fixed px-28 py-10 z-10">
      <div id="logo" aria-hidden="true"></div>
      <button className="bg-black text-white px-10 py-2 border-white border-solid border-[5px] rounded-full hover:scale-110 transition-colors duration-300">
        Записаться
      </button>
    </div>
  );
};

export default Header;
