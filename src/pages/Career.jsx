import React, { useState } from "react";

export default function Career() {
  const jobs = [
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
      description: [
        "Develop responsive UI with React & Tailwind",
        "Work closely with designers to implement new features",
        "Optimize web applications for maximum speed",
      ],
    },
    {
      title: "Backend Developer",
      location: "Remote",
      type: "Full-time",
      description: [
        "Build and maintain APIs using PHP, Node.js, or Laravel",
        "Manage database architecture and optimization",
        "Ensure security and scalability of applications",
      ],
    },
    {
      title: "UI/UX Designer",
      location: "Remote",
      type: "Contract",
      description: [
        "Design engaging interfaces for web & mobile apps",
        "Create wireframes, prototypes, and mockups",
        "Collaborate with development team to implement designs",
      ],
    },
  ];

  const [activeJob, setActiveJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeJob) return;

    setLoading(true);
    setSuccessMsg("");

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("mobile", formData.mobile);
      payload.append("job_title", activeJob.title);
      payload.append("resume", formData.resume);

      const response = await fetch("http://localhost:8000/api/career", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(`✅ Application submitted for ${activeJob.title}`);
        setActiveJob(null);
        setFormData({ name: "", email: "", mobile: "", resume: null });

        setTimeout(() => setSuccessMsg(""), 10000);
      } else {
        alert("Failed to submit application");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="careers"
      className="relative py-24 text-white overflow-hidden
                 bg-gradient-to-b from-[#0f0f25] via-[#0b0b1f] to-[#0b0f1a]
                 md:bg-none"
    >
      {/* 🎥 Background Video (desktop only) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/vdo1.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0"></div>

      {/* CONTENT */}
      <div className="relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-yellow-400 mb-16">
          Careers
        </h2>

        <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="
        relative group
        bg-gradient-to-br from-[#141a3a]/80 to-[#0f142b]/80
        backdrop-blur-xl
        border border-white/10
        rounded-3xl p-7
        shadow-xl
        hover:shadow-indigo-500/40
        transition-all duration-300
        hover:-translate-y-3
      "
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Job Title */}
                <h3 className="text-xl font-extrabold text-indigo-400 mb-1">
                  {job.title}
                </h3>

                {/* Meta */}
                <p className="text-xs text-gray-400 mb-3 flex items-center gap-2">
                  📍 {job.location}
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  ⏱ {job.type}
                </p>

                {/* Description */}
                <ul className="text-gray-300 text-sm space-y-2 mb-6 leading-relaxed">
                  {job.description.map((point, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-yellow-400">✔</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => setActiveJob(job)}
                  className=" w-full
                            bg-gradient-to-r from-yellow-400 to-yellow-300
                            text-black
                            py-3
                            rounded-full
                            font-bold
                            text-sm
                            shadow-lg
                            hover:scale-105
                            hover:shadow-yellow-400/40
                            transition
                          "
                >
                  Apply Now →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {activeJob && (
          <div className="fixed inset-0  z-50 flex items-center justify-center px-4 ">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveJob(null)}
            />

            {/* Modal */}
            <div
              className=" relative  z-15 w-full max-w-md
                      bg-gradient-to-br from-[#151a3b]/90 to-[#0f142b]/90
                      backdrop-blur-xl
                      border border-white/10
                      rounded-3xl p-8
                      shadow-2xl
                      animate-fadeInUp"
            >
              {/* Close */}
              <button
                onClick={() => setActiveJob(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl transition"
              >
                ✕
              </button>

              {/* Header */}
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-extrabold text-yellow-400">
                  Apply for {activeJob.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Join SUPREXON Technologies 🚀
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="text-xs text-gray-400 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-[#0f1629]
                     border border-gray-700 text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="text-xs text-gray-400 font-semibold">
                    Mobile Number
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      📱
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f1629]
                       border border-gray-700 text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs text-gray-400 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-[#0f1629]
                     border border-gray-700 text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Resume */}
                <div>
                  <label className="text-xs text-gray-400 font-semibold">
                    Upload Resume (PDF)
                  </label>
                  <div
                    className="mt-1 flex items-center gap-3 px-4 py-3 rounded-xl
                     bg-[#0f1629] border border-dashed border-gray-600
                     text-gray-300"
                  >
                    📄
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf"
                      onChange={handleChange}
                      required
                      className="w-full text-sm file:hidden"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`
          w-full mt-4
          bg-gradient-to-r from-yellow-400 to-yellow-300
          text-black py-3 rounded-full
          font-bold text-sm
          shadow-lg
          hover:scale-105 hover:shadow-yellow-400/40
          transition
          ${loading ? "opacity-60 cursor-not-allowed" : ""}
        `}
                >
                  {loading ? "Submitting..." : "Submit Application →"}
                </button>
              </form>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2
                          bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-50">
            {successMsg}
          </div>
        )}

        <p
          className=" mt-20 max-w-4xl mx-auto text-center
                text-gray-300 text-sm sm:text-base md:text-lg
                leading-relaxed
                
               
                px-6 sm:px-10 py-6
                rounded-2xl
                shadow-xl
                animate-fadeInUp "
        >
          Join <span className="text-yellow-400 font-semibold">Supre<span className="text-indigo-400 font-medium">Xon</span> Technologies</span> and work remotely with a
          <span className="text-indigo-400 font-medium"> talented team</span> to
          create <span className="text-green-400 font-medium">high-quality software</span> and
          <span className="text-pink-400 font-medium"> modern websites</span>.
        </p>
      </div>
    </section>
  );
}