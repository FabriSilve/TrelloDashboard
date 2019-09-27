const FORMAT = /[^#]*#[0-9]+/;
const EXTRACT_NUMBER = /[^#]*([0-9]+)$/;

const getListNumber = (name) => FORMAT.test(name)
  ? parseInt(name.match(EXTRACT_NUMBER)[0])
  : 0;

export default getListNumber;
