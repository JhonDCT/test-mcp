export class EventBus {
    private listeners: Map<string, Function[]> = new Map();

    public subscribe(eventName: string, callback: Function): void {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, []);
        }

        this.listeners.get(eventName)?.push(callback);
    }

    public publish(event: any): void {
        const eventName = event.constructor.name;
        const listener = this.listeners.get(eventName);
        if (listener) {
            listener.forEach(listener => listener(event));
        }
    }
}