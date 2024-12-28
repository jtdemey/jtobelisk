import dotenv from "dotenv";

dotenv.config();

/**
 * A "module" in the context of this web server is any external web application that can
 * be deployed on the website. Disabled modules will not be imported or run.
 * @typedef {Object} SiteModule
 * @property {string} name Name
 * @property {(expressApp, router) => void|null} onHttpServerInit Init function with an Express application, and its router as arguments
 * @property {(socketServer) => void|null} onSocketServerInit Init function with wss WebSocket server as an argument
 * @property {(socketServer, webSocket, socketEvent) => void|null} onSocketMessage Socket message handler function
 */

/**
 * A module definition is used to initiate a module
 * @typedef {Object} SiteModuleDefinition
 * @property {boolean} enabled Is module enabled?
 * @property {string} moduleName Name
 * @property {string} modulePath Path to module's index file which will be imported
 * @property {(importedModule, expressApp, router) => void} onHttpServerInit Init function with an Express application, its router and imported module as arguments
 * @property {(importedModule, socketServer) => void} onSocketServerInit Init function with wss WebSocket server and imported module as arguments
 * @property {(importedModule, socketServer, webSocket, socketEvent) => void} onSocketMessage Socket message handler function
 */

const SITE_MODULE_REPOSITORY_DIRECTORY =
    process.env?.SITE_MODULE_REPOSITORY_DIRECTORY ?? "";

/** @type {SiteModuleDefinition[]} */
const SITE_MODULE_DEFINITIONS = [
    {
        enabled: false,
        moduleName: "adventureBook",
        modulePath: `${SITE_MODULE_REPOSITORY_DIRECTORY}adventurebook/src/middleware.js`,
        onHttpServerInit: (importedModule, expressApp, router) => {
            router
                .route("/adventure_book/the_devils_fingers/*/")
                .get((req, res, next) =>
                    importedModule.default(req, res, next, "/adventure_book/the_devils_fingers/", "adventure_book/")
                );
        },
    },
    {
        enabled: false,
        moduleName: "gameSuite",
        modulePath: "./gamesuite/gameSuite.js",
        onHttpServerInit: null,
        onSocketServerInit: (importedModule) => importedModule.makeGameSuite(),
        onSocketMessage: (
            importedModule,
            socketServer,
            webSocket,
            socketEvent
        ) =>
            importedModule.handleSocketMessage(
                socketServer,
                webSocket,
                socketEvent
            ),
    },
];

/**
 * Import and enable a site module
 * @param {SiteModuleDefinition} moduleDefinition Definition for the module to enable
 * @returns {Promise<SiteModule|null>}
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
                        ? (expressApp, router) =>
                              moduleDefinition.onHttpServerInit(
                                  importedModule,
                                  expressApp,
                                  router
                              )
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
                process.stderr.write(
                    `Unable to resolve module imported from ${moduleDefinition.modulePath}`
                );
                process.stderr.write(`${error}\n`);
                reject(error);
            });
    });

const siteModules = {
    enableSiteModules: async (logger) => {
        const enabledModuleDefs = SITE_MODULE_DEFINITIONS.filter(
            (moduleDef) => moduleDef.enabled
        );
        if (enabledModuleDefs.length < 1) {
            logger.info("No site modules enabled");
            return [];
        }
        const enabledSiteModules = await Promise.all(
            enabledModuleDefs.map(async (moduleDef) => {
                try {
                    return enableModule(moduleDef);
                } catch (e) {
                    logger.error(
                        `Failed to load module ${moduleDef.moduleName} imported from ${moduleDef.modulePath}`
                    );
                    logger.error(e);
                }
            })
        );
        logger.info(
            `Site modules enabled: ${enabledSiteModules
                .map((siteModule) => siteModule?.name ?? null)
                .filter((siteModule) => siteModule !== null)
                .join(", ")}`
        );
        return enabledSiteModules;
    },
    onHttpServerInit: (modules, expressApp, router) =>
        modules.forEach((siteModule) =>
            siteModule.onHttpServerInit?.(expressApp, router)
        ),
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
