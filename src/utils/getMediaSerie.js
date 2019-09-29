const average = arr => arr.reduce((p, c) => p + c[1], 0) / arr.length;

const getMediaSerie = (serie, mediaItems = 3) => serie.map(
  (data, index, array) => {
    const left = index - mediaItems > 0 ? index - mediaItems : 0;
    const subArray = array.slice(left, index);
    const value = Math.ceil(average(subArray));
    
    return [data[0], Number.isNaN(value) ? data[1] : value];
  }
);

export default getMediaSerie;