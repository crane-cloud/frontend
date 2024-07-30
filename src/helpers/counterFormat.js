export const formatCount = (num) => {
    if (num < 1000) {
      return num.toString();
    } else {
      return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}k`;
    }
  };