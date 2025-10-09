const MethodDisplay = ({ method, effectiveness }) => {
  const IconComponent = method.icon;
  return (
    <div className="bg-black border-2 border-purple-500/40 rounded-md p-6 shadow-md shadow-purple-500/20">
      {/* Method Name Header */}
      <div className="text-center mb-5">
        <h2 className="inter-text text-md font-semibold text-white">
          Method: {method.name}
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-12">
        {/* Deflection Section */}
        <div>
          <h3 className="inter-text text-sm font-semibold text-purple-400 mb-2">Deflection</h3>
          <p className="inter-text text-xs text-gray-400">Building up...</p>
        </div>

        {/* Effectiveness Section */}
        <div>
          <h3 className="inter-text text-sm font-semibold text-purple-400 mb-2">Effectiveness</h3>
          <p className="inter-text text-xs text-white font-semibold">{Math.round(effectiveness * 100)}%</p>
        </div>
      </div>
    </div>
  );
};

export default MethodDisplay;