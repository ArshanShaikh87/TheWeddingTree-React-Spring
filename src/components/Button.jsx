const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-primary text-darkbg font-semibold rounded-md hover:opacity-90 transition duration-300"
    >
      {children}
    </button>
  );
};

export default Button;
