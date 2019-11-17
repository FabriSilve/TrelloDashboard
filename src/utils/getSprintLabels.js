const LABELS_TO_IGNORE = ['Defect', 'Blocked', 'Priority - High', 'Back from validation'];

const getSprintLabels = (cards, lists) => cards
  .filter(({ list }) => lists.includes(list))
  .reduce(
    (sprintLabels, { points, labels }) => {
      labels.forEach((label) => {
        if (!LABELS_TO_IGNORE.includes(label.name)) {
          if (sprintLabels[label.name]) sprintLabels[label.name] += points;
          else sprintLabels[label.name] = points;
        }
      });
      return sprintLabels;
    },
    {},
  );

export default getSprintLabels;
