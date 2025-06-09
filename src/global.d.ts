declare module '*.css';
declare module '*.scss';
declare module '*.png';     
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module 'papaparse' {
  const content: any;
  export default content;
}