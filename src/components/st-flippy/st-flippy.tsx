import { Component, Prop, Element, State } from '@stencil/core';

/**
 * two ways of defining flip behaviour:
 * - through native browser events for flip and flip-back (e.g. click, mouseenter, …)
 * - through isFlipped true|false
 *
 * only one of these can be used. `isFlipped` is prioritized if both were to be used.
 */
@Component({
	tag: 'st-flippy',
	styleUrl: 'st-flippy.scss'
})
export class StFlippy {

	@Element() element: HTMLElement;

	@Prop() flipEvents: string;
	@Prop() flipBackEvents: string;
	@Prop() flipDuration: number;
	@Prop() flipTimingFunction: string;
	@Prop() isFlipped: boolean;

	@State() flipState: boolean;

	private events = { flipEvents: [], flipBackEvents: [] };
	// private options = { duration: 400, timingFunction: 'ease-in' };

	componentWillLoad() {
		this.init();
	}

	/**
	 * add options to the element (duration, timingfunction).
	 */
	componentDidLoad() {
		const duration = this.flipDuration || 400;
		const timingFunction = this.flipTimingFunction || 'ease-in';
		['front', 'back']
			.forEach(key => {
				const el = this.element.querySelector(`.st-flippy__${key}`);
				el['style'].transition = `all ${duration/1000}s ${timingFunction}`;
			});
	}

	/**
	 * handling the `is-flipped` attribute.
	 * usually this is used together with modern frameworks.
	 */
	componentWillUpdate() {
		if (this.isFlipped !== undefined) {
			this.flipState = this.isFlipped;
		}
	}

	private init() {
		if (this.isFlipped !== undefined) {
			this.flipState = this.isFlipped;
		} else if (this.flipEvents !== undefined) {
			['flipEvents', 'flipBackEvents'].forEach(key => {
				this.events[key] = (this[key]) ?
					this[key].split(',') :
					[];
			});
			// adding event listeners
			const allEvents = [...this.events.flipEvents, ...this.events.flipBackEvents];
			allEvents
				.filter((eventType, index) => allEvents.indexOf(eventType) === index)
				.forEach(eventType => this.element.addEventListener(eventType, (evt) => this.processFlip(evt)));
			this.flipState = false;
		}
	}

	private processFlip(evt) {
		const eventType = evt.type;
		if (this.flipState && this.events.flipBackEvents.indexOf(eventType) !== -1) {
			this.flipState = !this.flipState;
		} else if (!this.flipState && this.events.flipEvents.indexOf(eventType) !== -1) {
			this.flipState = !this.flipState;
		}
	}

	render() {
		return (
			<div class={ `st-flippy ${(this.flipState ? 'st-flippy--flipped' : '')}` }>

				{/* FRONT */}
				<div class="st-flippy__front">
					<slot name="front" />
				</div>

				{/* BACK */}
				<div class="st-flippy__back">
					<slot name="back" />
				</div>
			</div>
		);
	}
}
