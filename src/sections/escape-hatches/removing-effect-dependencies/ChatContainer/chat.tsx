/**
 * Exposes fake connection functions.
 */

export type EventNameType = 'connected' | 'disconnected';

export default function createConnection(serverUrl: string, channelId: string) {
    const eventTarget = new EventTarget();
    return {
        connect() {
            console.log('Connected to ' + serverUrl + ':' + channelId);
            const eventName: EventNameType = 'connected';
            eventTarget.dispatchEvent(new Event(eventName));
        },
        disconnect() {
            console.log('Disconnected from ' + serverUrl + ':' + channelId);
            const eventName: EventNameType = 'disconnected';
            eventTarget.dispatchEvent(new Event(eventName));
        },
        on(eventName: EventNameType, eventHandler: () => void) {
            eventTarget.addEventListener(eventName, eventHandler);
        },
        off(eventName: EventNameType, eventHandler: () => void) {
            eventTarget.removeEventListener(eventName, eventHandler);
        },
    };
}
