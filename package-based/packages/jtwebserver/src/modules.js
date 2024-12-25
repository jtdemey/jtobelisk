/**
 * A "module" in the context of this web server is any external web application that can
 * be deployed on the website. Disabled modules will not be imported or run.
 * @typedef {Object} SiteModule
 * @property {string} moduleName Name
 * @property {(httpServer) => void|null} onHttpServerInit Init function with Express HTTP server and imported module as arguments
 * @property {(socketServer) => void|null} onSocketServerInit Init function with wss WebSocket server and imported module as arguments
 * @property {(socketServer, webSocket, socketEvent) => void|null} onSocketMessage Socket message handler function
 */

/**
 * A module definition is used to initiate a module
 * @typedef {Object} SiteModuleDefinition
 * @property {boolean} enabled Is module enabled?
 * @property {string} moduleName Name
 * @property {string} modulePath Path to module's index file which will be imported
 * @property {(importedModule, httpServer) => void} onHttpServerInit Init function with Express HTTP server and imported module as arguments
 * @property {(importedModule, socketServer) => void} onSocketServerInit Init function with wss WebSocket server and imported module as arguments
 * @property {(importedModule, socketServer, webSocket, socketEvent) => void} onSocketMessage Socket message handler function
 */

const SITE_MODULE_DEFINITIONS = [
  {
    enabled: false,
    moduleName: "gameSuite",
    modulePath: "./gamesuite/gameSuite.js",
    onHttpServerInit: null,
    onSocketServerInit: (importedModule) => importedModule.makeGameSuite(),
    onSocketMessage: (importedModule, socketServer, webSocket, socketEvent) =>
      importedModule.handleSocketMessage(socketServer, webSocket, socketEvent),
  },
];

/**
 * Create a site module
 * @param {SiteModuleDefinition} moduleDefinition Definition for the module to enable
 * @returns {Promise<SiteModule>}
 */
const enableModule = async (moduleDefinition) =>
  new Promise((resolve, reject) => {
    if (!moduleDefinition.enabled) {
      resolve(null);
      return null;
    }

    import(moduleDefinition.modulePath)
      .then((importedModule) => {
        process.stdout.write(
          `\tEnabled module '${moduleDefinition.moduleName}'\n`
        );
        resolve({
          name: moduleDefinition.moduleName,
          onHttpServerInit: moduleDefinition.onHttpServerInit
            ? (server) =>
                moduleDefinition.onHttpServerInit(importedModule, server)
            : null,
          onSocketServerInit: moduleDefinition.onSocketServerInit
            ? (socketServer) =>
                moduleDefinition.onSocketServerInit(
                  importedModule,
                  socketServer
                )
            : null,
          onSocketMessage: moduleDefinition.onSocketMessage
            ? (socketServer, webSocket, socketEvent) =>
                moduleDefinition.onSocketMessage(
                  importedModule,
                  socketServer,
                  webSocket,
                  socketEvent
                )
            : null,
        });
      })
      .catch((error) => {
        process.stderr.write(`${error}\n`);
        reject(error);
      });
  });

const siteModules = {
  enableSiteModules: async (logger) => {
    const enabledModuleDefs = SITE_MODULE_DEFINITIONS.filter(moduleDef => moduleDef.enabled);
    if (enabledModuleDefs.length < 1) {
        logger.info("No site modules enabled");
        return [];
    }
    const enabledSiteModules = await Promise.all(
      enabledModuleDefs.map((moduleDef) =>
        enableModule(moduleDef).catch((e) => console.error(e))
      )
    );
    logger.info(`Site modules enabled: ${enabledSiteModules.map(siteModule => siteModule.name).join(", ")}`);
    return enabledSiteModules;
  },
  onHttpServerInit: (modules, httpServer) =>
    modules.forEach((siteModule) => siteModule.onHttpServerInit?.(httpServer)),
  onSocketServerInit: (modules, socketServer) =>
    modules.forEach((siteModule) =>
      siteModule.onSocketServerInit?.(socketServer)
    ),
  onSocketMessage: (modules, socketServer, webSocket, socketEvent) =>
    modules.forEach((siteModule) =>
      siteModule.onSocketMessage?.(socketServer, webSocket, socketEvent)
    ),
};

export default siteModules;
