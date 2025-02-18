const Heading = ({ text, color }: { text: string; color: string }) => {
  return (
    <div className="text-center md:p-2 py-1 md:mt-10 mt-3">
      <p className={`font-cheri text-4xl md:text-6xl ${color}`}>{text}</p>
    </div>
  );
};

export default Heading;
