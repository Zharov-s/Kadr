import PropTypes from "prop-types";

const TiltText = ({ tiltRef }) => {
  return (
    <div
      id="tilt-in"
      ref={tiltRef}
      className="absolute top-1/2 left-20 -translate-y-1/2"
    >
      <h1 className="text-[6vw] leading-[6vw] uppercase cursor-pointer font-[bold] text-white tracking-tight">
        Психолог
      </h1>
      <h1 className="text-[7.5vw] leading-[6vw] uppercase cursor-pointer font-[bold] text-white tracking-tight">
        в Москве
      </h1>
      <h1 className="text-[6vw] leading-[6vw] uppercase cursor-pointer font-[bold] text-white tracking-tight">
        и онлайн
      </h1>
    </div>
  );
};

TiltText.propTypes = {
  tiltRef: PropTypes.object.isRequired,
};

export default TiltText;
