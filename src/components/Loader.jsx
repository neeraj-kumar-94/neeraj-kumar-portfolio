import { motion, AnimatePresence } from "framer-motion";

function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          className="nk-loader fixed inset-0 z-[10060] flex items-center justify-center bg-white transition-colors duration-300 dark:bg-nkBg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="text-center">
            <motion.div
              className="mx-auto h-14 w-14 rounded-full border-4 border-slate-200 border-t-nkPrimary dark:border-slate-700 dark:border-t-nkAccent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
              Loading Portfolio
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Loader;
