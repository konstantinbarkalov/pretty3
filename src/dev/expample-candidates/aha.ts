import { fetch } from './fetch';
import { Pretty } from '../..';
import { AnsiRenderer } from '../../text/renderer/implementation';

const url = 'https://jsonplaceholder.typicode.com/users/2';



async function main(): Promise<void> {
  const jsonResponse = await fetch(url);
  Pretty.print(jsonResponse, url, {renderer: new AnsiRenderer()});
}

main();