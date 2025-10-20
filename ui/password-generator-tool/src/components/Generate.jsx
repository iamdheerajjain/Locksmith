import error from "../assets/error.svg";
import {
  generatePasswordApi,
  passwordStrengthVerifier,
} from "../service/PasswordGeneratorApi";
import Characters from "./Characters";
import CharactersLength from "./CharactersLength";
import SendMail from "./SendMail";
import EmailConfig from "./EmailConfig";
import ExportOptions from "./ExportOptions";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState, useEffect } from "react";

const Generate = ({ darkMode }) => {
  const [capitalAlphabet, setCapitalAlphabet] = useState(false);
  const [smallAlphabet, setSmallAlphabet] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [passwordLength, setPasswordLength] = useState(8);
  const [generatedPassword, setGeneratedPassword] = useState("MyPassword");
  const [passwordToCopy, setPasswordToCopy] = useState("");
  const [copy, setCopy] = useState("COPY");
  const [strength, setStrength] = useState("poor");
  const [serverDown, setServerDown] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    callGeneratePasswordApi({
      capitalAlphabet,
      smallAlphabet,
      number,
      specialCharacter,
      passwordLength,
    });
  }, [
    capitalAlphabet,
    smallAlphabet,
    number,
    specialCharacter,
    passwordLength,
  ]);

  useEffect(() => {
    setPasswordToCopy(generatedPassword);
  }, [generatedPassword]);

  useEffect(() => {
    strengthVerifier(generatedPassword);
  }, [generatedPassword]);

  const onCopyPassword = () => {
    setCopy("COPIED");
    setTimeout(function () {
      setCopy("Copy");
    }, 1000);
  };

  function refreshPassword() {
    setIsGenerating(true);
    callGeneratePasswordApi({
      capitalAlphabet,
      smallAlphabet,
      number,
      specialCharacter,
      passwordLength,
    });
    setTimeout(() => setIsGenerating(false), 800);
  }

  function callGeneratePasswordApi(characters) {
    if (
      characters.capitalAlphabet == true ||
      characters.smallAlphabet == true ||
      characters.number == true ||
      characters.specialCharacter == true
    ) {
      generatePasswordApi(characters)
        .then((response) => setGeneratedPassword(response.data))
        .catch((error) => console.error(error));
    }
  }

  function strengthVerifier(password) {
    if (password.length != 0) {
      passwordStrengthVerifier({ checkPassword: password })
        .then((response) => setStrength(response.data))
        .catch(() => setServerDown(true));
    }
  }

  return (
    <div className={darkMode ? "bg-gradient-dark min-h-screen" : "bg-gradient-light min-h-screen"}>
      {serverDown != true ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Password Display Section - Full Width Card */}
            <div className="card-primary p-8 mb-8 smooth-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-light-text dark:text-dark-text">
                      Password Strength
                    </h2>
                    <div
                      className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 strength-indicator ${strength} ${
                        strength === "very strong"
                          ? "bg-success/20 text-success dark:bg-success/30 shadow-sm"
                          : strength === "strong"
                          ? "bg-blue-500/20 text-blue-500 dark:bg-blue-500/30 shadow-sm"
                          : strength === "good"
                          ? "bg-warning/20 text-warning dark:bg-warning/30 shadow-sm"
                          : strength === "fair"
                          ? "bg-orange-500/20 text-orange-500 dark:bg-orange-500/30 shadow-sm"
                          : "bg-error/20 text-error dark:bg-error/30 shadow-sm"
                      }`}
                    >
                      {strength}
                    </div>
                  </div>
                  <div className="card-secondary">
                    <div className={`text-3xl md:text-4xl font-mono break-all text-light-text dark:text-dark-text leading-relaxed text-center py-4 px-2 password-generation ${isGenerating ? 'password-generation' : ''}`}>
                      {generatedPassword}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <CopyToClipboard
                    text={passwordToCopy}
                    onCopy={onCopyPassword}
                  >
                    <button className="btn-primary px-7 py-4 min-w-[150px] justify-center flex items-center gap-3 hover-lift">
                      <svg
                        className={`w-5 h-5 ${copy === 'COPIED' ? 'copy-animation' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      {copy}
                    </button>
                  </CopyToClipboard>

                  <button
                    className="btn-secondary px-7 py-4 min-w-[150px] justify-center flex items-center gap-3 hover-lift"
                    onClick={() => refreshPassword()}
                  >
                    <svg
                      className={`w-5 h-5 ${isGenerating ? 'loading-spinner' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    REFRESH
                  </button>
                </div>
              </div>
            </div>

            {/* Configuration Section - Full Width Card */}
            <div className="card-primary p-8 smooth-fade-in">
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8 pb-2 border-b border-light-border dark:border-dark-border">
                Password Configuration
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Character Settings */}
                <div>
                  <div className="mb-8">
                    <CharactersLength
                      passwordLength={passwordLength}
                      setPasswordLength={setPasswordLength}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-5 pb-2 border-b border-light-border dark:border-dark-border">
                      Character Types
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Characters
                        title="uppercase letters"
                        value={capitalAlphabet}
                        setCharacter={setCapitalAlphabet}
                      />
                      <Characters
                        title="lowercase letters"
                        value={smallAlphabet}
                        setCharacter={setSmallAlphabet}
                      />
                      <Characters
                        title="numbers"
                        value={number}
                        setCharacter={setNumber}
                      />
                      <Characters
                        title="symbols"
                        value={specialCharacter}
                        setCharacter={setSpecialCharacter}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Email Settings */}
                <div>
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-5 pb-2 border-b border-light-border dark:border-dark-border">
                      Email Settings
                    </h3>
                    <EmailConfig darkMode={darkMode} />
                  </div>

                  <div>
                    <SendMail
                      darkMode={darkMode}
                      generatedPassword={generatedPassword}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options Section */}
            <ExportOptions darkMode={darkMode} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold mb-4 text-center text-light-text dark:text-dark-text">Server Down</h1>
          <p className="text-lg text-light-textSecondary mb-8 text-center">
            We apologize for the inconvenience, but the server is currently
            down. Please try again later.
          </p>
          <img
            src={error}
            alt="Server Down Illustration"
            className="w-32 h-auto max-w-sm mb-8"
          />
        </div>
      )}
    </div>
  );
};

export default Generate;