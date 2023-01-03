const DisplayData = ({
  icon,
  title,
  value,
  unit = "",
  subtitle = "",
  sub_text = "",
}) => {
  return (
    <div className="flex flex-col lg:flex-row  lg:items-center p-3 rounded-lg bg-slate-200 mr-2 mb-2 w-1/3">
      <div className="bg-slate-300 rounded-full mr-3 p-2 text-slate-800 w-[40px]">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="text-slate-700">{title}</p>
        <h3 className="text-slate-900 text-lg">
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
