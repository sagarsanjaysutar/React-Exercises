import { notification } from 'antd';
import createConnection, { EventNameType } from './chat';
import { useEffect } from 'react';

const serverUrl = 'https://localhost:1234';

/**
 * @brief A custom hook to connect to the chat room.
 *      -   Separation of concern.
 *      -   Custom Hooks let you share stateful logic.
 *      -   Custom Hooks let you share stateful logic, but not the state itself. e.g.
 *          a state returned by a custom hook to two different variables returns two
 *          independents states.
 *          e.g. const a = useFetchCountry(); const b = useFetchCountry(); a != b.
 *      -   By using custom hook, what to do is specified. How to do it is in the custom hook.
 */
export function useChatRoom(channelId: string) {
    useEffect(() => {
        // Todo:
        // onVisit(roomId);
        const conn = createConnection(serverUrl, channelId);

        // Todo:
        // connection.on('message', (receivedMessage) => {
        //     onMessage(receivedMessage);
        // });

        const eventName: EventNameType = 'connected';
        conn.on(eventName, () => {
            notification.open({ message: `Connected to ${channelId}` });
        });
        conn.connect();

        return () => {
            conn.disconnect();
        };
    }, [channelId]);
}
