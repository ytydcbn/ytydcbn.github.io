import ImageSlider from "../ImageSlider";

const WorkCard = ({ images, name, description, highlights, fullDescription, url, children }) => {
  return (
    <div className="overflow-hidden rounded-xl p-2 laptop:p-4 first:ml-0">
      <ImageSlider images={images} height="h-72 laptop:h-80" objectFit="object-contain" />
      <h1 className="mt-4 text-xl laptop:text-2xl font-semibold text-accent-dark">{name || "项目名称"}</h1>
      <h2 className="mt-1 text-sm opacity-50">{description || ""}</h2>
      <p className="mt-3 text-sm laptop:text-base leading-relaxed">{fullDescription || ""}</p>
      {highlights && highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {highlights.map((item, index) => (
            <li key={index} className="text-sm opacity-70 flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-dark flex-shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
};

export default WorkCard;
