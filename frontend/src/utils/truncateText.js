export const truncateText = (text, maxLength) => {
    if (!text || typeof text !== 'string') return "";
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + ' . . . . ';
  };