import * as React from 'react';

import { TextField } from '../TextField';

const styles = require<{ title: string; content: string; add: string; container: string; }>('./People.css');

export const Add = () => (
  <div className={styles.container}>
    <div className={styles.title}><h1>Fahrer</h1><button>Close</button></div>
    <div className={styles.content}>
      <TextField label="First Name" />
      <TextField label="Last Name" />
      <TextField label="Email" />
    </div >
  </div >
);
