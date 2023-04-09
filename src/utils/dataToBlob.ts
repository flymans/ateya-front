export const dataURLToBlobURL = (dataURL: string) => {
  const binaryString = window.atob(dataURL.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const byteArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: 'image/png' });
  const blobURL = URL.createObjectURL(blob);
  return blobURL;
};
