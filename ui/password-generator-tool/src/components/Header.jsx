const Header = ({ handleOnClick }) => {
  return (
    <div>
      <nav className="fixed w-full z-50 py-4 bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-lg border-b border-light-border/50 dark:border-dark-border/50 shadow-sm dark:shadow-dark-border/50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg hover-lift">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="font-bold text-2xl text-gradient-primary">
              Locksmith
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center relative w-max cursor-pointer select-none gap-3">
              <span className="font-medium text-light-textSecondary dark:text-dark-textSecondary transition-transform hover:scale-110 hover-lift">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              </span>
              <input
                type="checkbox"
                className="sr-only peer"
                onClick={handleOnClick}
              />
              <div className="relative w-14 h-7 bg-light-border rounded-full peer peer-focus:ring-4 peer-focus:ring-pastelPurple/30 dark:peer-focus:ring-pastelPurple/30 dark:bg-dark-border peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-light-border after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md dark:border-dark-border peer-checked:bg-gradient-primary hover-lift"></div>
              <span className="font-medium text-light-textSecondary dark:text-dark-textSecondary transition-transform hover:scale-110 hover-lift">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              </span>
            </label>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;