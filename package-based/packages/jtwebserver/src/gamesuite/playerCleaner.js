import logger from '../logger';

let pingedPlayers = [];

export const pingPlayers = gameSuite => {
	if(gameSuite.playerList.length < 1) return;
  gameSuite.playerList.forEach(player => {
    gameSuite.emitToPlayer(player.socketId, gameSuite.makeCommand('ping'));
    const pinged = pingedPlayers.filter(x => x.socketId === player.socketId);
    if(pinged.length === 0) {
      pingedPlayers.push({
        socketId: player.socketId,
        tries: 0
      });
      return;
    }
    if(pinged[0].tries > 2) {
      gameSuite.removePlayer(player.socketId);
      logger.info(`[GS] Player ${player.socketId} removed due to inactivity.`);
      return;
    }
		logger.info(`[GS] No pong from ${player.socketId} (Attempts: ${pinged[0].tries + 1}).`);
    pinged[0].tries += 1;
  });
};

export const handlePong = socketId => {
	if(pingedPlayers.some(p => p.socketId === socketId)) {
		pingedPlayers = pingedPlayers.filter(p => p.socketId !== socketId);
	}
};