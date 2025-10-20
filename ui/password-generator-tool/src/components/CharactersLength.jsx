const CharactersLength = ({ passwordLength, setPasswordLength }) => {
  return (
    <>
      <div className="mb-10 smooth-fade-in">
        <div className="flex justify-between items-center mb-5">
          <label className="text-base font-medium text-light-text dark:text-dark-text tracking-wide">
            Password Length
          </label>
          <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg animate-pulse">
            {passwordLength}
          </div>
        </div>
        <div className="relative">
          <input
            type="range"
            min={8}
            max={32}
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            className="w-full h-3 bg-gradient-to-r from-light-border to-light-secondary dark:from-dark-border dark:to-dark-secondary rounded-full appearance-none cursor-pointer slider shadow-inner hover-lift"
            style={{
              background: `linear-gradient(to right, #C5ADC5 0%, #C5ADC5 ${
                ((passwordLength - 8) / (32 - 8)) * 100
              }%, #E2DFF2 ${
                ((passwordLength - 8) / (32 - 8)) * 100
              }%, #E2DFF2 100%)`,
            }}
          />
          <div className="flex justify-between text-sm text-light-textSecondary dark:text-dark-textSecondary mt-3">
            <span>8</span>
            <span>32</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharactersLength;