import { nanoid } from "nanoid";

export const makePlayer = (socket, players) => {
    let playerId = nanoid(16);
    while (
        players.some((existingPlayer) => existingPlayer?.playerId === playerId)
    ) {
        playerId = nanoid(16);
    }
    return {
        pings: 0,
        playerId,
        playerName: "Player",
        socket,
    };
};
