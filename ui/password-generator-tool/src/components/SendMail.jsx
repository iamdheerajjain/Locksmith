import { useState } from "react";
import { sentMailApi } from "../service/PasswordGeneratorApi";

const SendMail = ({ darkMode, generatedPassword }) => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [sendText, setSendText] = useState("send");
  const [status, setStatus] = useState();
  const [isSending, setIsSending] = useState(false);

  function sentMail(e) {
    e.preventDefault();
    setSendText("validating...");

    if (validateInputs()) {
      setIsSending(true);
      setSendText("sending...");
      const reqData = {
        name: recipientName,
        email: recipientEmail,
        password: generatedPassword,
      };
      sentMailApi(reqData)
        .then((response) => {
          if (response.status === 200) {
            setSendText("done");
            setTimeout(function () {
              setSendText("send");
              setIsSending(false);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error(error);
          setIsSending(false);
          setSendText("error");
          setTimeout(function () {
            setSendText("send");
          }, 2000);
        });
    }
  }

  function validateInputs() {
    let valid = true;

    if (recipientEmail.trim()) {
      setIsEmailEmpty(false);
    } else {
      setIsEmailEmpty(true);
      valid = false;
    }

    if (recipientName.trim()) {
      setIsNameEmpty(false);
    } else {
      setIsNameEmpty(true);
      valid = false;
    }

    return valid;
  }

  return (
    <>
      <div className="mt-8 smooth-fade-in">
        <div className="bg-gradient-to-br from-pastelPurple/20 to-lightSteelBlue/20 dark:from-pastelPurple/10 dark:to-lightSteelBlue/10 rounded-2xl p-7 border border-pastelPurple/30 dark:border-lightSteelBlue/20 shadow-sm hover-lift">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
              Send Password via Email
            </h3>
          </div>

          <form onSubmit={sentMail} className="space-y-5">
            <div>
              <input
                className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-pastelPurple focus:border-transparent shadow-sm hover-lift ${
                  isNameEmpty
                    ? "border-error/50 bg-error/10 dark:bg-error/20"
                    : darkMode
                    ? "bg-dark-surface border-dark-border text-dark-text"
                    : "bg-light-surface border-light-border text-light-text"
                }`}
                type="text"
                placeholder="Recipient Name"
                name="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
              {isNameEmpty && (
                <p className="mt-1.5 text-sm text-error dark:text-error">
                  Name is required
                </p>
              )}
            </div>

            <div>
              <input
                className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-pastelPurple focus:border-transparent shadow-sm hover-lift ${
                  isEmailEmpty
                    ? "border-error/50 bg-error/10 dark:bg-error/20"
                    : darkMode
                    ? "bg-dark-surface border-dark-border text-dark-text"
                    : "bg-light-surface border-light-border text-light-text"
                }`}
                type="email"
                placeholder="Recipient Email Address"
                name="recipientEmail"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
              {isEmailEmpty && (
                <p className="mt-1.5 text-sm text-error dark:text-error">
                  Email is required
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full px-6 py-3.5 bg-gradient-primary hover:from-pastelPurpleDark hover:to-lightSteelBlueDark text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  {sendText}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SendMail;