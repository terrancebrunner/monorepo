export function InnovationHeader() {
  return (
    <div className="relative py-20 md:py-18 -mb-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="w-full container mx-auto px-4 text-center relative z-10">
        <h1 className="text-7xl md:text-8xl font-serif text-white mb-2 md:mb-4">Innovation Title</h1>
        <p className="text-3xl md:text-4xl font-thin text-white/70">Innovation subtitle and description</p>
      </div>
    </div>
  );
}