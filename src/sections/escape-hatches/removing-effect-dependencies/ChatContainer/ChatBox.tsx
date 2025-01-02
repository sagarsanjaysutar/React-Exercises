import React, { FC, useEffect } from 'react';
import createConnection, { EventNameType } from './chat';
import { notification } from 'antd';

const serverUrl = 'https://localhost:1234';

type ChatBoxProp = {
    channelId: string;
    channelName: string;
};

const ChatBox: FC<ChatBoxProp> = ({ channelName, channelId }) => {
    /**
     * @todo Use of EffectEvent to update other states like message, onVisit, etc.
     * @ref https://react.dev/learn/removing-effect-dependencies#do-you-want-to-read-a-value-without-reacting-to-its-changes
     *
     * @todo Use of JS Object as dependency
     * @ref https://react.dev/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally
     *
     */
    // const [messages, setMessages] = useState([]);

    // const onVisit = useEffectEvent(visitedRoomId => {
    //     logVisit(visitedRoomId, notificationCount);
    //   });
    // const onMessage = useEffectEvent((receivedMessage) => {
    //     setMessages((msgs) => [...msgs, receivedMessage]);
    //     if (!isMuted) {
    //         playSound();
    //     }
    // });

    useEffect(() => {
        // onVisit(roomId);
        const conn = createConnection(serverUrl, channelId);

        // connection.on('message', (receivedMessage) => {
        //     onMessage(receivedMessage);
        // });

        const eventName: EventNameType = 'connected';
        conn.on(eventName, () => {
            notification.open({ message: `Connected to ${channelName}` });
        });
        conn.connect();

        return () => {
            conn.disconnect();
        };
    }, [channelId]);
    return (
        <div className="flex flex-col p-5">
            <h1 className="text-xl text-slate-100">Welcome to {channelName} channel!</h1>
        </div>
    );
};

export default ChatBox;
