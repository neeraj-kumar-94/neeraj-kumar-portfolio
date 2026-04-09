import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

function Contact({ info }) {
  const [formValues, setFormValues] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const name = formValues.name.trim();
    const email = formValues.email.trim();
    const message = formValues.message.trim();

    if (name.length < 3) return "Please enter at least 3 characters for name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (message.length < 10) return "Message must be at least 10 characters.";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setFormStatus({ type: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formValues.name,
          from_email: formValues.email,
          message: formValues.message,
          to_email: "neeraj74530@gmail.com",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setFormStatus({ type: "success", message: "Message sent successfully. I will get back to you soon." });
      setFormValues({ name: "", email: "", message: "" });
    } catch (_error) {
      setFormStatus({
        type: "error",
        message: "Unable to send right now. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition duration-300 placeholder:text-slate-500 focus:border-nkPrimary dark:border-slate-600 dark:bg-nkCard dark:text-slate-300 dark:placeholder:text-slate-500";

  return (
    <section
      id="contact"
      className="nk-contact w-full min-w-0 bg-slate-100 py-20 transition-colors duration-300 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Contact"
          title="Let us build your next project"
          subtitle="Open to full-time and remote opportunities. Reach out for collaboration, website revamps, or frontend support."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-300 dark:border-slate-700 dark:bg-nkCard"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Contact Details</h3>
            <div className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
              <p>{info.location}</p>
              <a
                className="block transition duration-300 hover:scale-[1.01] hover:text-nkPrimary"
                href={`tel:${info.phone}`}
              >
                {info.phone}
              </a>
              <a
                className="block transition duration-300 hover:scale-[1.01] hover:text-nkPrimary"
                href={`mailto:${info.email}`}
              >
                {info.email}
              </a>
            </div>
          </motion.div>

          <motion.form
            className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-300 dark:border-slate-700 dark:bg-nkCard"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <input
                type="text"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="Your name"
                className={inputClass}
                required
              />
              <input
                type="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="Your email"
                className={inputClass}
                required
              />
              <textarea
                rows="5"
                value={formValues.message}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, message: event.target.value }))
                }
                placeholder="Write your message..."
                className={inputClass}
                required
              />
              {formStatus.message ? (
                <p
                  className={`text-sm ${
                    formStatus.type === "success"
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {formStatus.message}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-nkPrimary px-5 py-3 font-medium text-white transition duration-300 hover:scale-[1.02] hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-75"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
