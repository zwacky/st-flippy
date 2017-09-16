/**
 * two ways of defining flip behaviour:
 * - through native browser events for flip and flip-back (e.g. click, mouseenter, …)
 * - through isFlipped true|false
 *
 * only one of these can be used. `isFlipped` is prioritized if both were to be used.
 */
export declare class StFlippy {
    element: HTMLElement;
    flipEvents: string;
    flipBackEvents: string;
    flipDuration: number;
    flipTimingFunction: string;
    isFlipped: boolean;
    flipState: boolean;
    private events;
    componentWillLoad(): void;
    /**
     * add options to the element (duration, timingfunction).
     */
    componentDidLoad(): void;
    /**
     * handling the `is-flipped` attribute.
     * usually this is used together with modern frameworks.
     */
    componentWillUpdate(): void;
    private init();
    private processFlip(evt);
    render(): JSX.Element;
}
