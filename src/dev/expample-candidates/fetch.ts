import https from 'https';

export function fetch(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      res.on('error', err => {
        reject(err);
      });
      res.setEncoding('utf8');
      let body = '';
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => {
        let json: unknown;
        try {
          json = JSON.parse(body);
        } catch (err) {
          reject(err);
        }
        resolve(json);
      });
    });
  });
}
