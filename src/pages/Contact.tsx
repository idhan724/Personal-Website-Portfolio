import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import {
  Send,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import MagneticButton from "@/components/MagneticButton";
import GlitchText from "@/components/GlitchText";
import TiltField from "@/components/TiltField";
import {
  container,
  itemInRight,
  itemInUp,
} from "@/components/animation/variants";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const MAX = 500;
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
type SubmitStatus = "idle" | "loading" | "success" | "error";

function Contact() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<SubmitStatus>("idle");
  const [charCount, setCharCount] = React.useState(0);
  const onFocus = React.useCallback(
    (field: string) => () => setFocused(field),
    [],
  );
  const onBlur = React.useCallback(() => setFocused(null), []);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
      if (name === "message") setCharCount(value.length);
    },
    [],
  );

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim() ||
      !formRef.current
    )
      return;
    setStatus("loading");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setCharCount(0);
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputCls = (field: string) =>
    [
      "w-full rounded-lg px-4 py-3 text-sm outline-none",
      "transition-all duration-300 placeholder:text-primary/30 text-primary",
      focused === field ? "border border-indigo-500" : "border border-border",
      focused === field ? "bg-indigo-500/20" : "bg-transparent",
      focused === field ? "shadow-[0_0_20px_rgba(99,102,241,0.15)]" : "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-[11px] tracking-[0.4em] uppercase mb-3 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ── Get In Touch ──
          </motion.p>

          <h1 className="text-[clamp(4rem,12vw,9rem)] leading-none tracking-wider font-bebas">
            <GlitchText text="LET'S" />
            <br />
            <span className="text-indigo-500">
              <GlitchText text="TALK" />
            </span>
          </h1>

          <motion.p
            className="mt-6 text-sm max-w-md leading-relaxed font-cormorant"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Got a wild idea? Exciting project? Or just want to chat — the door
            is always open. Drop us a message and we'll get back to you shortly.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={container}
            initial="hidden"
            whileInView="show"
          >
            <motion.div
              variants={itemInRight}
              className="flex items-start gap-4 group"
            >
              <motion.div
                className="mt-0.5 p-2.5 rounded-lg border transition-colors duration-300 bg-indigo-500/20 border-border"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Mail size={16} />
              </motion.div>
              <div>
                <p className="text-[11px] tracking-widest uppercase mb-0.5 font-mono text-muted">
                  Email
                </p>

                <a
                  href="mailto:iidhankhalassaputra@gmail.com"
                  className="text-sm transition-colors duration-200 hover:text-blue-500"
                >
                  iidhankhalassaputra@gmail.com
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={itemInRight}
              className="flex items-start gap-4 group"
            >
              <motion.div
                className="mt-0.5 p-2.5 rounded-lg border transition-colors duration-300 bg-indigo-500/20 border-border"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <SiGithub size={16} />
              </motion.div>
              <div>
                <p className="text-[11px] tracking-widest uppercase mb-0.5 font-mono text-muted">
                  Github
                </p>

                <a
                  href="https://github.com/idhan724"
                  className="text-sm transition-colors duration-200 hover:text-blue-500"
                >
                  Idhan Khalas Saputra
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={itemInRight}
              className="flex items-start gap-4 group"
            >
              <motion.div
                className="mt-0.5 p-2.5 rounded-lg border transition-colors duration-300 bg-indigo-500/20 border-border"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <MapPin size={16} />
              </motion.div>
              <div>
                <p className="text-[11px] tracking-widest uppercase mb-0.5 font-mono text-muted">
                  Location
                </p>

                <p className="text-sm">Jakarta, Indonesia</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-3">
            <motion.div
              className="relative rounded-2xl border border-border bg-card overflow-hidden"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(69, 94, 233,0.2) 0%, transparent 60%)",
                }}
              />

              <motion.form
                ref={formRef}
                variants={container}
                initial="hidden"
                whileInView="show"
                onSubmit={onSubmit}
                className="relative p-8 lg:p-10 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <TiltField
                    label="Full Name"
                    htmlFor="full-name"
                    variants={itemInUp}
                  >
                    <input
                      id="full-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      onFocus={onFocus("name")}
                      onBlur={onBlur}
                      placeholder="John Doe"
                      required
                      className={inputCls("name")}
                    />
                  </TiltField>
                  <TiltField
                    label="Email Address"
                    htmlFor="email-address"
                    variants={itemInUp}
                  >
                    <input
                      id="email-address"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      onFocus={onFocus("email")}
                      onBlur={onBlur}
                      placeholder="john@example.com"
                      required
                      className={inputCls("email")}
                    />
                  </TiltField>
                </div>

                <TiltField
                  label="Subject"
                  htmlFor="subject"
                  variants={itemInUp}
                >
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    onFocus={onFocus("subject")}
                    onBlur={onBlur}
                    placeholder="About a new project..."
                    className={inputCls("subject")}
                  />
                </TiltField>

                <TiltField
                  label="Message"
                  htmlFor="message"
                  variants={itemInUp}
                >
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      onFocus={onFocus("message")}
                      onBlur={onBlur}
                      placeholder="Tell us about your idea or project..."
                      rows={6}
                      maxLength={MAX}
                      required
                      className={`${inputCls("message")} resize-none`}
                    />
                    <motion.span
                      className={`absolute bottom-3 right-4 text-[11px] font-mono ${
                        charCount > MAX * 0.9 ? "text-indigo-500" : "text-muted"
                      }`}
                      animate={{ opacity: focused === "message" ? 1 : 0 }}
                    >
                      {charCount}/{MAX}
                    </motion.span>
                  </div>
                </TiltField>

                <motion.div
                  variants={itemInUp}
                  className="flex items-center justify-between gap-4 pt-2"
                >
                  <p className="text-[11px]">* All fields are required</p>
                  <MagneticButton
                    type="submit"
                    disabled={status === "loading"}
                    className="relative flex items-center gap-3 px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide overflow-hidden bg-indigo-500 font-mono"
                    style={{
                      opacity: status === "loading" ? 0.7 : 1,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {status === "loading" ? (
                        <motion.span
                          key="l"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Loader size={16} />
                          </motion.div>
                          Sending...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="s"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Send size={16} /> Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </MagneticButton>
                </motion.div>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      className="flex items-center gap-3 p-4 rounded-xl border bg-green-500/8 border-green-500/25 text-green-500"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <CheckCircle size={18} />
                      <div>
                        <p className="text-sm font-semibold">Message sent!</p>
                        <p className="text-[11px] opacity-70 mt-0.5">
                          We'll get back to you shortly.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      className="flex items-center gap-3 p-4 rounded-xl border bg-red-500/8 border-red-500/25 text-red-500"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <AlertCircle size={18} />
                      <div>
                        <p className="text-sm font-semibold">
                          Failed to send message
                        </p>
                        <p className="text-[11px] opacity-70 mt-0.5">
                          Please make sure your EmailJS Service ID, Template ID,
                          and Public Key are correct.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
