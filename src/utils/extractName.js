const FORMAT = /^\([0-9]+\).*$/;
const EXTRACT_NAME = /^\(*([0-9]+)\)/;

const extractName = (name) => FORMAT.test(name)
  ? name.split(/\(.+\)/).pop().trim()
  : 0;

export default extractName;
