declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_ELASTICSEARCH_HOST: string;
    REACT_APP_ELASTICSEARCH_INDEX: string;
    REACT_APP_ELASTICSEARCH_USER: string;
    REACT_APP_ELASTICSEARCH_PASSWORD: string;
  }
}
