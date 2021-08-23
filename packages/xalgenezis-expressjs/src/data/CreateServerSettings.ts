interface CreateServerSettings {
  viewEngine?: string;
  viewsPaths?: string[];
  staticPaths?: string[];
  supportJSONRequest?: {
    limit?: string;
  };
  supportGet?: {
    limit?: string;
    extended?: boolean;
  };
  trustProxy?: boolean;
  hmr?: {
    eventsEmitter?: any;
    webpackEntries: {
      name?: string;
      configFilePath: string;
      statsFilePath?: string;
    }[];
  };
  session?: {
    secret: string;
    saveUninitialized?: boolean;
    resave: boolean;
    cookie?: {
      secure: boolean;
    };
    store?: Function;
  };
  port?: number;
  plugins?: Function[];
  before?: Function;
  onlySecure?: boolean;
  secureSettings?: {
    key: string;
    cert: string;
    port?: number;
  };
  webpack_hot_middleware_settings?: any;
}

export default CreateServerSettings;
