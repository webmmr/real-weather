const DisplayData = ({
  icon,
  title,
  value,
  unit = "",
  subtitle = "",
  sub_text = "",
}) => {
  return (
    <div className="flex items-center p-3 rounded-lg bg-slate-200 mr-2 mb-4 w-1/3">
      <div className="bg-slate-300 rounded-full mr-3 p-2 text-slate-800">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="text-slate-700 mb-1">{title}</p>
        <h3 className="text-slate-900 text-xl">
          {value} {unit}{" "}
          <span className="text-sm">
            {subtitle} {sub_text}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default DisplayData;
