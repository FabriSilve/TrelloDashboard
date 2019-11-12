const FORMAT = /^\([0-9]+(\.\d+)?\).*$/;
const EXTRACT_NUMBER = /^\(*([0-9]+(\.\d+)?)\)/;

const extractPoints = (name) => FORMAT.test(name)
  ? parseFloat(name.match(EXTRACT_NUMBER)[1])
  : 0;

export default extractPoints;