import * as json2csv from 'json2csv';
import { saveAs } from 'file-saver';

export const download = <T>(options: json2csv.Options<T>, filename: string): Promise<string> => {
  try {
    const result = json2csv(options);

    const fileBlob = new Blob([result], { type: 'text/csv;charset=utf-8' });

    saveAs(fileBlob, filename);

    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
};