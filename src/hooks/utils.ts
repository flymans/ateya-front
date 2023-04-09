import QRCode from 'qrcode';

export const generateQrCode = async (qrId: string): Promise<string> => {
  const qrLink = `${process.env.REACT_APP_FRONT_URL}${qrId}`;
  return await QRCode.toDataURL(qrLink);
};
