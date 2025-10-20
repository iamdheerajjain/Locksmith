const Characters = ({ title, value, setCharacter }) => {
  return (
    <>
      <div className="bg-gradient-to-br from-light-background to-light-secondary/20 dark:from-dark-background dark:to-dark-secondary/20 border border-light-border dark:border-dark-border p-5 rounded-2xl hover:from-light-surfaceHover hover:to-light-secondary/30 dark:hover:from-dark-surfaceHover dark:hover:to-dark-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 hover-lift">
        <label className="flex items-center cursor-pointer justify-between">
          <span className="text-base font-medium text-light-text dark:text-dark-text capitalize tracking-wide">
            {title}
          </span>
          <input
            type="checkbox"
            className="sr-only peer"
            checked={value}
            onChange={() => setCharacter(!value)}
          />
          <div className={`relative w-12 h-6 rounded-full peer transition-all duration-300 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-light-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-md dark:border-dark-border peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white ${
            value 
              ? 'bg-gradient-primary peer-focus:ring-4 peer-focus:ring-pastelPurple/30 dark:peer-focus:ring-pastelPurple/30' 
              : 'bg-light-border dark:bg-dark-border'
          }`}></div>
        </label>
      </div>
    </>
  );
};

export default Characters;