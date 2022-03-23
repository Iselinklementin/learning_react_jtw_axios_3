import PropTypes from "prop-types";

function DateFunction(props) {
  const { date } = props;
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  const options = { day: "numeric", month: "long", year: "numeric" };
  const pageDate = date;
  const formattedData = new Date(pageDate).toLocaleDateString("en-GB", options);

  return (
    <p className="mb-0">
      <span className="fw-bold">Added: </span>
      {formattedData}
    </p>
  );
}

DateFunction.propTypes = {
  date: PropTypes.node.isRequired,
};

export default DateFunction;
