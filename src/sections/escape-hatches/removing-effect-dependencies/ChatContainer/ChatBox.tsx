/**
 * @brief Reusing Logic with Custom Hooks
 * @ref https://react.dev/learn/reusing-logic-with-custom-hooks
 */
import React, { FC } from 'react';
import { useChatRoom } from './useChatRoom';

type ChatBoxProp = {
    channelId: string;
    channelName: string;
};

const ChatBox: FC<ChatBoxProp> = ({ channelName, channelId }) => {
    /**
     * @todo Use of EffectEvent to update other states on connection like message, onVisit, etc.
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
    // });

    
    useChatRoom(channelId);

    return (
        <div className="flex flex-col p-5">
            <h1 className="text-xl text-slate-100">Welcome to {channelName} channel!</h1>
        </div>
    );
};

export default ChatBox;
