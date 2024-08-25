export const Quote = () => {
  return (
    <div className="bg-slate-100 h-screen w-1/2 flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-3xl font-bold">
            “The Customer Service I received was Exceptional. The support team went above and beyond to address my concerns.”
          </div>
          <div className="mt-4">
            <div className="max-w-md text-xl font-semibold text-left">
              Jules Winfield
            </div>
            <div className="max-w-md text-sm font-light text-slate-500 text-left">
              CEO | ACME CORP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
