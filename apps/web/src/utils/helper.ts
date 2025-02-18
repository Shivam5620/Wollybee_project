export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function last3Months() {
  const date = new Date();
  date.setMonth(date.getMonth() - 3);
  date.setDate(date.getDate() - 1);
  return formatDate(date);
}

export function last6Months() {
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  date.setDate(date.getDate() - 1);
  return formatDate(date);
}

export function last30Days() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  date.setDate(date.getDate() - 1);
  return formatDate(date);
}


export function logError(error:string, tag:string) {
  const client = "web";
  const currentTimeStamp = new Date();
  console.log(`ERROR : ${client} | ${currentTimeStamp} | ${tag} | ${error}`);
}

export function logInfo(info:string, tag:string) {
  const client = "web";
  const currentTimeStamp = new Date();
  console.log(`INFO : ${client} | ${currentTimeStamp} | ${tag} | ${info}`);
}