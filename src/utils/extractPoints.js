const FORMAT = /^\([0-9]+\).*$/;
const EXTRACT_NUMBER = /^\(*([0-9]+)\)/;

const extractPoints = (name) => FORMAT.test(name)
  ? parseInt(name.match(EXTRACT_NUMBER)[1])
  : 0;

export default extractPoints;