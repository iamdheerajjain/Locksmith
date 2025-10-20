import { useState, useEffect } from "react";
import {
  saveEmailConfigApi,
  getEmailConfigApi,
  getEmailConfigStatusApi,
} from "../service/PasswordGeneratorApi";

const EmailConfig = ({ darkMode, onConfigSaved }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    username: "",
    password: "",
    useTls: true,
    fromEmail: "",
    fromName: "Locksmith",
  });
  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    checkConfigStatus();
    loadExistingConfig();
  }, []);

  const checkConfigStatus = async () => {
    try {
      const response = await getEmailConfigStatusApi();
      setIsConfigured(response.data);
    } catch (error) {
      console.error("Error checking config status:", error);
    }
  };

  const loadExistingConfig = async () => {
    try {
      const response = await getEmailConfigApi();
      if (response.data) {
        setConfig(response.data);
      }
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateConfig = () => {
    const newErrors = {};

    if (!config.username.trim()) {
      newErrors.username = "Email username is required";
    }
    if (!config.password.trim()) {
      newErrors.password = "Email password is required";
    }
    if (!config.fromEmail.trim()) {
      newErrors.fromEmail = "From email is required";
    } else if (!isValidEmail(config.fromEmail)) {
      newErrors.fromEmail = "Please enter a valid email address";
    }
    if (!config.smtpHost.trim()) {
      newErrors.smtpHost = "SMTP host is required";
    }
    if (config.smtpPort <= 0 || config.smtpPort > 65535) {
      newErrors.smtpPort = "Please enter a valid port number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateConfig()) {
      return;
    }

    setIsLoading(true);
    setSaveStatus("");

    try {
      await saveEmailConfigApi(config);
      setSaveStatus("success");
      setIsConfigured(true);
      onConfigSaved && onConfigSaved();
      setTimeout(() => {
        setIsOpen(false);
        setSaveStatus("");
      }, 2000);
    } catch (error) {
      console.error("Error saving config:", error);
      setSaveStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetChange = (preset) => {
    switch (preset) {
      case "gmail":
        setConfig((prev) => ({
          ...prev,
          smtpHost: "smtp.gmail.com",
          smtpPort: 587,
          useTls: true,
        }));
        break;
      case "outlook":
        setConfig((prev) => ({
          ...prev,
          smtpHost: "smtp-mail.outlook.com",
          smtpPort: 587,
          useTls: true,
        }));
        break;
      case "yahoo":
        setConfig((prev) => ({
          ...prev,
          smtpHost: "smtp.mail.yahoo.com",
          smtpPort: 587,
          useTls: true,
        }));
        break;
      default:
        break;
    }
  };

  if (!isOpen) {
    return (
      <div className="mt-8 smooth-fade-in">
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-pastelPurple/20 to-lightSteelBlue/20 dark:from-pastelPurple/10 dark:to-lightSteelBlue/10 rounded-2xl border border-pastelPurple/30 dark:border-lightSteelBlue/20 shadow-sm hover:shadow-md transition-all duration-300 hover-lift">
          <div className="flex items-center space-x-4">
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-light-text dark:text-dark-text">
                Email Configuration
              </h3>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
                {isConfigured
                  ? "Email is configured and ready to use"
                  : "Configure your email settings to send passwords"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-primary rounded-xl hover:from-pastelPurpleDark hover:to-lightSteelBlueDark transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover-lift"
          >
            {isConfigured ? "Update" : "Configure"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 smooth-fade-in">
      <div className="bg-light-surface dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border p-7 shadow-lg hover-lift">
        <div className="flex items-center justify-between mb-7 pb-4 border-b border-light-border dark:border-dark-border">
          <div className="flex items-center space-x-4">
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                Email Configuration
              </h3>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
                Set up your email provider to send generated passwords
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2.5 text-light-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors rounded-lg hover:bg-light-border/50 dark:hover:bg-dark-border/50 hover-lift"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-7">
          {/* Email Provider Presets */}
          <div>
            <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-3">
              Quick Setup (Select your email provider)
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handlePresetChange("gmail")}
                className="p-4 text-sm font-bold text-light-text dark:text-dark-text bg-gradient-to-br from-light-background to-light-secondary/20 dark:from-dark-background dark:to-dark-secondary/20 rounded-xl hover:from-light-surfaceHover hover:to-light-secondary/30 dark:hover:from-dark-surfaceHover dark:hover:to-dark-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md hover-lift"
              >
                Gmail
              </button>
              <button
                type="button"
                onClick={() => handlePresetChange("outlook")}
                className="p-4 text-sm font-bold text-light-text dark:text-dark-text bg-gradient-to-br from-light-background to-light-secondary/20 dark:from-dark-background dark:to-dark-secondary/20 rounded-xl hover:from-light-surfaceHover hover:to-light-secondary/30 dark:hover:from-dark-surfaceHover dark:hover:to-dark-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md hover-lift"
              >
                Outlook
              </button>
              <button
                type="button"
                onClick={() => handlePresetChange("yahoo")}
                className="p-4 text-sm font-bold text-light-text dark:text-dark-text bg-gradient-to-br from-light-background to-light-secondary/20 dark:from-dark-background dark:to-dark-secondary/20 rounded-xl hover:from-light-surfaceHover hover:to-light-secondary/30 dark:hover:from-dark-surfaceHover dark:hover:to-dark-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md hover-lift"
              >
                Yahoo
              </button>
            </div>
          </div>

          {/* SMTP Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-2.5">
                SMTP Host
              </label>
              <input
                type="text"
                value={config.smtpHost}
                onChange={(e) => handleInputChange("smtpHost", e.target.value)}
                className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-pastelPurple focus:border-transparent shadow-sm hover-lift ${
                  errors.smtpHost
                    ? "border-error/50 bg-error/10 dark:bg-error/20"
                    : "border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface focus:bg-light-surface dark:focus:bg-dark-surface"
                }`}
                placeholder="smtp.gmail.com"
              />
              {errors.smtpHost && (
                <p className="mt-1.5 text-sm text-error dark:text-error">
                  {errors.smtpHost}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-2.5">
                SMTP Port
              </label>
              <input
                type="number"
                value={config.smtpPort}
                onChange={(e) =>
                  handleInputChange("smtpPort", parseInt(e.target.value) || 0)
                }
                className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-pastelPurple focus:border-transparent shadow-sm hover-lift ${
                  errors.smtpPort
                    ? "border-error/50 bg-error/10 dark:bg-error/20"
                    : "border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface focus:bg-light-surface dark:focus:bg-dark-surface"
                }`}
                placeholder="587"
              />
              {errors.smtpPort && (
                <p className="mt-1.5 text-sm text-error dark:text-error">
                  {errors.smtpPort}
                </p>
              )}
            </div>
          </div>

          {/* Email Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-2.5">
                Email Username
              </label>
              <input
                type="email"
                value={config.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-pastelPurple focus:border-transparent shadow-sm hover-lift ${
                  errors.username
                    ? "border-error/50 bg-error/10 dark:bg-error/20"
                    : "border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface focus:bg-light-surface dark:focus:bg-dark-surface"
                }`}
                placeholder="your-email@gmail.com"
              />
              {errors.username && (
                <p className="mt-1.5 text-sm text-error dark:text-error">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-2.5">
                Email Password / App Password
              </label>
              <input
                type="password"
                value={config.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-pastelPurple focus:border-transparent shadow-sm hover-lift ${
                  errors.password
                    ? "border-error/50 bg-error/10 dark:bg-error/20"
                    : "border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface focus:bg-light-surface dark:focus:bg-dark-surface"
                }`}
                placeholder="Your email password or app password"
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-error dark:text-error">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* From Email Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-2.5">
                From Email Address
              </label>
              <input
                type="email"
                value={config.fromEmail}
                onChange={(e) => handleInputChange("fromEmail", e.target.value)}
                className={`w-full px-5 py-3.5 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-pastelPurple focus:border-transparent shadow-sm hover-lift ${
                  errors.fromEmail
                    ? "border-error/50 bg-error/10 dark:bg-error/20"
                    : "border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface focus:bg-light-surface dark:focus:bg-dark-surface"
                }`}
                placeholder="noreply@yourdomain.com"
              />
              {errors.fromEmail && (
                <p className="mt-1.5 text-sm text-error dark:text-error">
                  {errors.fromEmail}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-2.5">
                From Name
              </label>
              <input
                type="text"
                value={config.fromName}
                onChange={(e) => handleInputChange("fromName", e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface focus:bg-light-surface dark:focus:bg-dark-surface transition-all duration-300 focus:ring-2 focus:ring-pastelPurple focus:border-transparent shadow-sm hover-lift"
                placeholder="Locksmith"
              />
            </div>
          </div>

          {/* TLS Option */}
          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              id="useTls"
              checked={config.useTls}
              onChange={(e) => handleInputChange("useTls", e.target.checked)}
              className="w-5 h-5 text-pastelPurple bg-light-surface border-light-border rounded focus:ring-pastelPurple dark:focus:ring-pastelPurple dark:ring-offset-dark-background focus:ring-2 dark:bg-dark-surface dark:border-dark-border hover-lift"
            />
            <label
              htmlFor="useTls"
              className="text-sm font-bold text-light-text dark:text-dark-text"
            >
              Use TLS/SSL encryption (recommended)
            </label>
          </div>

          {/* Save Status */}
          {saveStatus && (
            <div
              className={`p-5 rounded-xl ${
                saveStatus === "success"
                  ? "bg-success/10 dark:bg-success/20 border border-success/20 dark:border-success/30"
                  : "bg-error/10 dark:bg-error/20 border border-error/20 dark:border-error/30"
              } smooth-fade-in`}
            >
              <div className="flex items-center space-x-3">
                <svg
                  className={`w-6 h-6 ${
                    saveStatus === "success"
                      ? "text-success dark:text-success"
                      : "text-error dark:text-error"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {saveStatus === "success" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  )}
                </svg>
                <span
                  className={`text-sm font-bold ${
                    saveStatus === "success"
                      ? "text-success dark:text-success"
                      : "text-error dark:text-error"
                  }`}
                >
                  {saveStatus === "success"
                    ? "Email configuration saved successfully!"
                    : "Failed to save email configuration. Please try again."}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-5 border-t border-light-border dark:border-dark-border">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3.5 text-sm font-bold text-light-text dark:text-dark-text bg-gradient-to-br from-light-background to-light-secondary/20 dark:from-dark-background dark:to-dark-secondary/20 rounded-xl hover:from-light-surfaceHover hover:to-light-secondary/30 dark:hover:from-dark-surfaceHover dark:hover:to-dark-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md hover-lift"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-primary rounded-xl hover:from-pastelPurpleDark hover:to-lightSteelBlueDark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 hover-lift"
            >
              {isLoading ? (
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
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailConfig;