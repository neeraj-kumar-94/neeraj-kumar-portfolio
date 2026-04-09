function Footer({ info }) {
  return (
    <footer className="nk-footer relative z-10 w-full min-w-0 border-t border-slate-200 bg-slate-50 py-8 transition-colors duration-300 dark:border-slate-800 dark:bg-nkBg">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-slate-600 md:flex-row md:px-8 dark:text-slate-300">
        <p>© {new Date().getFullYear()} {info.name}. All rights reserved.</p>
        <a
          href={info.portfolio}
          target="_blank"
          rel="noreferrer"
          className="transition duration-300 hover:text-nkPrimary"
        >
          Previous Portfolio Version
        </a>
      </div>
    </footer>
  );
}

export default Footer;
