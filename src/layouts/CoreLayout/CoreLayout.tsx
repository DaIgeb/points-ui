import * as React from 'react';

type TStyle = { container: string, header: string, footer: string, main: string, navigation: string };
const styles = require<TStyle>('./CoreLayout.css');

type TAppProps = {
  header: React.ReactNode;
  children: React.ReactNode;
  navigation: React.ReactNode;
  footer: React.ReactNode;
};

export const CoreLayout = (props: TAppProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {props.header}
      </div>
      <div className={styles.footer}>
        {props.footer}
      </div>
      <div className={styles.main}>
        {props.children}
      </div>
      <div className={styles.navigation}>
        {props.navigation}
      </div>
    </div>
  );
};