import { handleImposterMsg } from "../../../../imposter/src/socket/imposterController.js";
import createImposterDomain from "../../../../imposter/src/socket/imposterDomain.js";

const createImposterModule = gameSuite => ({
  controller: handleImposterMsg,
  domain: createImposterDomain(gameSuite)
});

export default createImposterModule;
