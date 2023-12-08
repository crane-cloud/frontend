export const parseEnvContent = (content) => {
  const lines = content.split('\n');
  const envData = {};

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    const keyValueRegex = /^\s*([\w.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^'"\s]+))?\s*$/;
    const match = trimmedLine.match(keyValueRegex);

    if (match) {
        const key = match[1];
        let value = match[2] || match[3] || match[4];
        if (value !== undefined) {
          value = value.replace(/^["']|["']$/g, '');
        }
        envData[key] = value;
      }
  
  });

  return envData;
  };