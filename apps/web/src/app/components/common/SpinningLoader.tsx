const SpinningLoader = ({text = "Loading..."} : {text : string}) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm z-50">
        <div className="w-10 h-10 border-4 border-primary-color border-t-transparent border-dotted rounded-full animate-spin"></div>
        {text && <p className='text-primary-black ml-4 text-sm'>{text}</p>}
      </div>
    );
  };
  
  export default SpinningLoader;
  