const FORMAT = /^\([0-9]+(\.\d+)?\).*$/;
const EXTRACT_NAME = /\(.+\)/;

const extractName = (name) => FORMAT.test(name)
  ? name.split(EXTRACT_NAME).pop().trim()
  : '';

export default extractName;
