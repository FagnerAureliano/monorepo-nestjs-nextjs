export function bufferToBase64(data: any) {
  const buff = Buffer.from(data.data, 'base64');
  const str = buff.toString('base64');
  return 'data:image/jpeg;base64,' + str;
}
