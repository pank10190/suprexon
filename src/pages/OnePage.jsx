import axios from "axios";

export default function OnePage() {
  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await axios.post(
      "http://localhost:8000/api/enquiry",
      Object.fromEntries(data)
    );
    alert("Message sent successfully!");
    e.target.reset();
  };

  return (
    <>
      {/* HERO */}
      <section id="home" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-28 text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Suprexon Digital Agency
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            We build high-quality web applications that help businesses grow.
          </p>
          <a
            href="#contact"
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold"
          >
            Start Your Project
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-14">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Web Development", "React & MERN", "Laravel & APIs"].map((s) => (
              <div key={s} className="bg-white p-8 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{s}</h3>
                <p className="text-gray-600">
                  Professional, scalable and secure development solutions.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-14">Our Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((p) => (
              <div
                key={p}
                className="h-56 bg-gray-200 rounded-xl flex items-center justify-center"
              >
                Project {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Suprexon</h2>
            <p className="text-gray-600 mb-6">
              Let’s discuss your project and turn your idea into reality.
            </p>
            <p>📧 contact@suprexon.com</p>
            <p>📞 +91 9XXXX XXXXX</p>
          </div>

          <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow space-y-4">
            <input name="name" required placeholder="Name" className="w-full border p-3 rounded" />
            <input name="email" required placeholder="Email" className="w-full border p-3 rounded" />
            <textarea name="message" required rows="4" placeholder="Message" className="w-full border p-3 rounded"></textarea>
            <button className="w-full bg-indigo-600 text-white py-3 rounded font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}