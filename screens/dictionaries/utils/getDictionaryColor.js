import { NewColors as Colors } from '@constants';

const PRIMARY = {
  background: Colors.primary,
  feedback: Colors.primary,
};

const SECONDARY = {
  background: Colors.secondary,
  feedback: Colors.secondary,
};

const INDIGO = {
  background: Colors.indigo,
  feedback: Colors.indigo,
};

const BLUE = {
  background: Colors.blue,
  feedback: Colors.blue,
};

const TOTAL = 12;

export const getDictionaryColor = (index) => {
  const group = Math.trunc(index / TOTAL);
  const count = group * TOTAL;

  // Primary
  if (index % 12 === 0) {
    return PRIMARY;
  }

  if (index - count === 1) {
    return PRIMARY;
  }

  // Secondary
  if (index - count === 2) {
    return SECONDARY;
  }

  if (index - count === 3) {
    return SECONDARY;
  }

  if (index - count === 10) {
    return SECONDARY;
  }

  if (index - count === 11) {
    return SECONDARY;
  }

  // Indigo
  if (index - count === 4) {
    return INDIGO;
  }

  if (index - count === 5) {
    return INDIGO;
  }

  if (index - count === 8) {
    return INDIGO;
  }

  if (index - count === 9) {
    return INDIGO;
  }

  // Blue
  if (index - count === 6) {
    return BLUE;
  }

  if (index - count === 7) {
    return BLUE;
  }
};
