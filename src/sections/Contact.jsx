import React, { useState } from "react";

const Contacts = () => {
  const [activeForm, setActiveForm] = useState("collab");

  const [collabData, setCollabData] = useState({
    name: "",
    email: "",
    channel: "",
    collabType: "",
    message: "",
  });

  const [brandData, setBrandData] = useState({
    name: "",
    company: "",
    email: "",
    website: "",
    promotionType: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleCollabChange = (e) => {
    setCollabData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBrandChange = (e) => {
    setBrandData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData =
      activeForm === "collab" ? collabData : brandData;

    const payload = {
      ...formData,

      formType:
        activeForm === "collab"
          ? "YouTube Collaboration Inquiry"
          : "Brand Promotion Inquiry",

      _subject:
        activeForm === "collab"
          ? "New YouTube Collaboration Inquiry"
          : "New Brand Promotion Inquiry",

      _captcha: "false",
      _template: "table",
    };

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/svmbrands@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");

      if (activeForm === "collab") {
        setCollabData({
          name: "",
          email: "",
          channel: "",
          collabType: "",
          message: "",
        });
      } else {
        setBrandData({
          name: "",
          company: "",
          email: "",
          website: "",
          promotionType: "",
          budget: "",
          message: "",
        });
      }

      setTimeout(() => {
        setStatus("");
      }, 4000);
    } catch (error) {
      console.error(error);
      setStatus("error");

      setTimeout(() => {
        setStatus("");
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden bg-[#05070d] px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-red-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
              Work With Me
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Let's create something
            <br />

            <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              worth watching.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Want to collaborate on a video or promote your brand
            to my audience? Choose an option below and let's talk.
          </p>
        </div>

        {/* TWO OPTIONS */}
        <div className="mb-8 grid gap-5 md:grid-cols-2">

          {/* COLLAB CARD */}
          <button
            type="button"
            onClick={() => {
              setActiveForm("collab");
              setStatus("");
            }}
            className={`group relative overflow-hidden rounded-3xl border p-7 text-left transition-all duration-300 ${
              activeForm === "collab"
                ? "border-red-500/40 bg-gradient-to-br from-red-500/[0.12] to-transparent shadow-xl shadow-red-950/20"
                : "border-white/10 bg-white/[0.03] hover:border-red-500/20 hover:bg-white/[0.05]"
            }`}
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-500/10 blur-3xl transition group-hover:bg-red-500/20" />

            <div className="relative">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
                {/* YouTube / Collaboration Icon */}
                <svg
                  className="h-7 w-7 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.8 3.9-6.8 3.9Z" />
                </svg>
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                Creator Collaboration
              </p>

              <h3 className="text-2xl font-bold">
                Let's make a video together.
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Got an idea for a video, challenge, podcast,
                shoutout, or creator collaboration?
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-red-300">
                Start a collaboration
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </button>

          {/* BRAND CARD */}
          <button
            type="button"
            onClick={() => {
              setActiveForm("brand");
              setStatus("");
            }}
            className={`group relative overflow-hidden rounded-3xl border p-7 text-left transition-all duration-300 ${
              activeForm === "brand"
                ? "border-purple-500/40 bg-gradient-to-br from-purple-500/[0.12] to-transparent shadow-xl shadow-purple-950/20"
                : "border-white/10 bg-white/[0.03] hover:border-purple-500/20 hover:bg-white/[0.05]"
            }`}
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

            <div className="relative">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-500/10">
                {/* Brand Icon */}
                <svg
                  className="h-7 w-7 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3l8 4.5v5c0 4.5-3.4 7.6-8 8.5-4.6-.9-8-4-8-8.5v-5L12 3Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
                Brand Promotion
              </p>

              <h3 className="text-2xl font-bold">
                Put your brand in front of my audience.
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Looking for a creator to promote your product,
                app, service, or campaign? Let's work together.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-purple-300">
                Discuss a brand deal
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">

          {/* LEFT INFO CARD */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl sm:p-9">

            <div>
              <div
                className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border ${
                  activeForm === "collab"
                    ? "border-red-400/20 bg-red-500/10"
                    : "border-purple-400/20 bg-purple-500/10"
                }`}
              >
                {activeForm === "collab" ? (
                  <svg
                    className="h-6 w-6 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10l4.5-2.5A1 1 0 0 1 21 8.4v7.2a1 1 0 0 1-1.5.9L15 14"
                    />
                    <rect
                      x="3"
                      y="6"
                      width="12"
                      height="12"
                      rx="2"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h16M8 7a4 4 0 1 1 8 0"
                    />
                  </svg>
                )}
              </div>

              <h3 className="text-2xl font-semibold">
                {activeForm === "collab"
                  ? "Have a collab idea?"
                  : "Let's talk business."}
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                {activeForm === "collab"
                  ? "Whether you're another creator, a filmmaker, podcaster, or someone with a crazy video idea, I'd love to hear it."
                  : "Have a product, service, app, or campaign you'd like to promote? Send me the details and let's discuss a potential partnership."}
              </p>
            </div>

            <div className="mt-12 space-y-4">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/svm__maurya/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 transition-all duration-300 hover:border-pink-500/20 hover:bg-pink-500/[0.04]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/15 via-pink-500/15 to-orange-400/15 text-pink-400 transition-transform duration-300 group-hover:scale-105">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.7"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      ry="5"
                    />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Instagram
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-200 group-hover:text-pink-300">
                    @svm__maurya
                  </p>
                </div>

                <span className="text-gray-600 group-hover:text-pink-400">
                  →
                </span>
              </a>

              {/* Creator Availability */}
              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/20 p-4">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Availability
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-200">
                    Open for collaborations & brand deals
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-9">

            {/* FORM SWITCHER */}
            <div className="mb-8 flex rounded-xl border border-white/10 bg-black/20 p-1">

              <button
                type="button"
                onClick={() => {
                  setActiveForm("collab");
                  setStatus("");
                }}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  activeForm === "collab"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Collaboration
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveForm("brand");
                  setStatus("");
                }}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  activeForm === "brand"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Brand Promotion
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* COLLAB FORM */}
              {activeForm === "collab" && (
                <>
                  <div className="mb-2">
                    <h4 className="text-xl font-semibold">
                      Let's collaborate
                    </h4>

                    <p className="mt-1 text-sm text-gray-500">
                      Tell me about your channel and your collaboration idea.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Your name"
                      name="name"
                      value={collabData.name}
                      onChange={handleCollabChange}
                      placeholder="Your name"
                    />

                    <Input
                      label="Email address"
                      name="email"
                      type="email"
                      value={collabData.email}
                      onChange={handleCollabChange}
                      placeholder="you@example.com"
                    />
                  </div>

                  <Input
                    label="YouTube / Social Channel"
                    name="channel"
                    value={collabData.channel}
                    onChange={handleCollabChange}
                    placeholder="youtube.com/@yourchannel"
                  />

                  <Select
                    label="Collaboration type"
                    name="collabType"
                    value={collabData.collabType}
                    onChange={handleCollabChange}
                    options={[
                      ["", "Select collaboration type"],
                      ["youtube-video", "YouTube Video"],
                      ["shorts", "Shorts / Reels"],
                      ["podcast", "Podcast"],
                      ["challenge", "Challenge / Concept"],
                      ["cross-promo", "Cross Promotion"],
                      ["other", "Something Else"],
                    ]}
                  />

                  <Textarea
                    label="Tell me your idea"
                    name="message"
                    value={collabData.message}
                    onChange={handleCollabChange}
                    placeholder="Tell me about your channel, your idea, expected timeline, and anything else..."
                  />
                </>
              )}

              {/* BRAND FORM */}
              {activeForm === "brand" && (
                <>
                  <div className="mb-2">
                    <h4 className="text-xl font-semibold">
                      Let's discuss your brand
                    </h4>

                    <p className="mt-1 text-sm text-gray-500">
                      Share a few details about your brand and campaign.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Your name"
                      name="name"
                      value={brandData.name}
                      onChange={handleBrandChange}
                      placeholder="John Smith"
                    />

                    <Input
                      label="Company / Brand"
                      name="company"
                      value={brandData.company}
                      onChange={handleBrandChange}
                      placeholder="Your Brand"
                    />
                  </div>

                  <Input
                    label="Business email"
                    name="email"
                    type="email"
                    value={brandData.email}
                    onChange={handleBrandChange}
                    placeholder="hello@brand.com"
                  />

                  <Input
                    label="Website / Product link"
                    name="website"
                    value={brandData.website}
                    onChange={handleBrandChange}
                    placeholder="https://yourbrand.com"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">

                    <Select
                      label="Promotion type"
                      name="promotionType"
                      value={brandData.promotionType}
                      onChange={handleBrandChange}
                      options={[
                        ["", "Select promotion type"],
                        ["dedicated-video", "Dedicated YouTube Video"],
                        ["integration", "Video Integration"],
                        ["short", "Short / Reel"],
                        ["community", "Community Promotion"],
                        ["campaign", "Campaign"],
                        ["other", "Other"],
                      ]}
                    />

                    <Select
                      label="Campaign budget"
                      name="budget"
                      value={brandData.budget}
                      onChange={handleBrandChange}
                      options={[
                        ["", "Select budget"],
                        ["discuss", "Let's discuss"],
                        ["under-25k", "Under ₹25K"],
                        ["25k-50k", "₹25K – ₹50K"],
                        ["50k-1l", "₹50K – ₹1L"],
                        ["1l+", "₹1L+"],
                      ]}
                    />
                  </div>

                  <Textarea
                    label="Tell me about the campaign"
                    name="message"
                    value={brandData.message}
                    onChange={handleBrandChange}
                    placeholder="Tell me about your product, campaign goals, timeline, deliverables, target audience, or anything else..."
                  />
                </>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`group flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-semibold text-white shadow-lg transition duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${
                  activeForm === "collab"
                    ? "bg-red-600 shadow-red-600/20 hover:bg-red-500"
                    : "bg-purple-600 shadow-purple-600/20 hover:bg-purple-500"
                }`}
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    Message sent
                    <span>✓</span>
                  </>
                ) : (
                  <>
                    {activeForm === "collab"
                      ? "Send collaboration request"
                      : "Send brand inquiry"}

                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-center text-sm text-emerald-300">
                  Thanks! Your inquiry has been submitted successfully.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-center text-sm text-red-300">
                  Something went wrong. Please try again.
                </div>
              )}

              <p className="text-center text-xs text-gray-600">
                Your information will only be used to respond to your inquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* INPUT */
const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-300"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-600 transition duration-200 focus:border-blue-500/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
};

/* SELECT */
const Select = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-300"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        required
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-gray-300 outline-none transition duration-200 focus:border-blue-500/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-blue-500/10"
      >
        {options.map(([value, label]) => (
          <option
            key={value}
            value={value}
            className="bg-gray-950"
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

/* TEXTAREA */
const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-300"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        required
        rows="5"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm leading-6 text-white outline-none placeholder:text-gray-600 transition duration-200 focus:border-blue-500/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
};

export default Contacts;
