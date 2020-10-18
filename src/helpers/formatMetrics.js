import { dayNames, monthNames } from './dateConstants';

const timestampToDate = (timestamp) => {
  const timestampMillisecond = timestamp * 1000; // convert timestamp to milliseconds
  const dateObject = new Date(timestampMillisecond); // create a date object out of milliseconds
  return dateObject;
};

const formatTime = (timeValue) => {
  const timeString = timeValue.toString();

  if (timeString.length < 2) {
    return `0${timeString}`;
  }

  return timeString;
};

const getTimeString = (date, period) => {
  if (period === '7d') {
    return `${dayNames[date.getDay()].substring(0, 3)}'${date.getDate()}`;
  }

  if (period === '1m') {
    return `${dayNames[date.getDay()].substring(0, 3)}'${date.getDate()}`;
  }

  if (period === '3m') {
    return `${monthNames[date.getMonth()].substring(0, 3)}`;
  }

  if (period === '1y') {
    return `${monthNames[date.getMonth()].substring(0, 3)}`;
  }

  return `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
};

const bytesToMegabytes = (bytes) => bytes / 1000000;

export const getCurrentTimeStamp = () => {
  return new Date().getTime() / 1000;
};

// this function gets the 'end' timestamp
export const subtractTime = (endTimestamp, days) => new Date(
  endTimestamp - (days * 24 * 60 * 60)
).getTime();

export const formatMemoryMetrics = (projectID, memoryMetrics, period = '1d') => {
  const found = memoryMetrics.find((metric) => metric.project === projectID);
  const memoryData = [];

  if (found !== undefined) {
    if (found.metrics.length > 0) {
      found.metrics.forEach((metric) => {
        const newMetricObject = {
          time: getTimeString(timestampToDate(metric.timestamp), period),
          memory: bytesToMegabytes(metric.value)
        };

        memoryData.push(newMetricObject);
      });
    } else {
      memoryData.push({ time: 0, memory: 0 });
      memoryData.push({ time: 0, memory: 0 });
    }
  }
  return memoryData;
};

export const formatCPUMetrics = (projectID, cpuMetrics, period = '1d') => {
  const found = cpuMetrics.find((metric) => metric.project === projectID);
  const cpuData = [];

  if (found !== undefined) {
    if (found.metrics.length > 0) {
      found.metrics.forEach((metric) => {
        const newMetricObject = {
          time: getTimeString(timestampToDate(metric.timestamp), period),
          cpu: metric.value * 10
        };

        cpuData.push(newMetricObject);
      });
    } else {
      cpuData.push({ time: 0, cpu: 0 });
      cpuData.push({ time: 0, cpu: 0 });
    }
  }
  return cpuData;
};

export const formatNetworkMetrics = (projectID, networkMetrics, period = '1d') => { // this is a shortcut for when function is called and period is undefined
  const found = networkMetrics.find((metric) => metric.project === projectID);
  const networkData = [];

  if (found !== undefined) {
    if (found.metrics.length > 0) {
      found.metrics.forEach((metric) => {
        const newMetricObject = {
          time: getTimeString(timestampToDate(metric.timestamp), period),
          network: metric.value
        };

        networkData.push(newMetricObject);
      });
    } else {
      networkData.push({ time: 0, network: 0 });
      networkData.push({ time: 0, network: 0 });
    }
  }
  return networkData;
};

export const formatAppMemoryMetrics = (appID, memoryMetrics) => {
  const found = memoryMetrics.find((metric) => metric.app === appID);
  const memoryData = [];

  if (found !== undefined) {
    if (found.metrics.length > 0) {
      found.metrics.forEach((metric) => {
        const newMetricObject = {
          time: timestampToDate(metric.timestamp),
          memory: bytesToMegabytes(metric.value)
        };

        memoryData.push(newMetricObject);
      });
    } else {
      memoryData.push({ time: 0, memory: 0 });
      memoryData.push({ time: 0, memory: 0 });
    }
  }
  return memoryData;
};

export const formatAppCPUMetrics = (appID, cpuMetrics) => {
  const found = cpuMetrics.find((metric) => metric.app === appID);
  const cpuData = [];

  if (found !== undefined) {
    if (found.metrics.length > 0) {
      found.metrics.forEach((metric) => {
        const newMetricObject = {
          time: timestampToDate(metric.timestamp),
          cpu: metric.value * 10
        };

        cpuData.push(newMetricObject);
      });
    } else {
      cpuData.push({ time: 0, cpu: 0 });
      cpuData.push({ time: 0, cpu: 0 });
    }
  }
  return cpuData;
};

export const formatAppNetworkMetrics = (appID, networkMetrics) => {
  const found = networkMetrics.find((metric) => metric.app === appID);
  const networkData = [];

  if (found !== undefined) {
    if (found.metrics.length > 0) {
      found.metrics.forEach((metric) => {
        const newMetricObject = {
          time: timestampToDate(metric.timestamp),
          network: metric.value
        };

        networkData.push(newMetricObject);
      });
    } else {
      networkData.push({ time: 0, network: 0 });
      networkData.push({ time: 0, network: 0 });
    }
  }
  return networkData;
};
