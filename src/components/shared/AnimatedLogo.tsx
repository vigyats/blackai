const AnimatedLogo = () => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-draw"
    >
      {/* Circle */}
      <path
        className="logo-path circle"
        d="M250 80 A170 170 0 1 1 249.9 80"
      />

      {/* Vertical curve */}
      <path
        className="logo-path line"
        d="M160 70 Q160 230 160 420"
      />
    </svg>
  );
};

export default AnimatedLogo;
