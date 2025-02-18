const CustomError = ({ text = 'Some Error Occured!' }: { text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 md:p-16 lg:p-24 animate-fadeIn">
        <h1 className="text-4xl font-bold text-red-600 mb-4 animate-pulse">
          Oops!
        </h1>
        <p className="text-lg text-gray-700 mb-8">{text}</p>
      </div>
    </div>
  );
};

export default CustomError;
