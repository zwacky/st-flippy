# st-flippy

## Examples

* **Vanilla**: https://jsbin.com/falipumuri/edit?html,output
* **AngularJS**: https://jsbin.com/qodacareba/1/edit?html,js,output
* **React**: can't get it to run on JS-REPL sites... would look similar to this: https://jsbin.com/lubukodike/edit?html,js,output

## Usage

Just add `<script async defer src="https://rawgit.com/zwacky/st-flippy/master/dist/stflippy.js"></script>` into your app.

Then in the template:

```
<st-flippy {PARAMS}>
    <div slot="front">
        {HERE COMES YOUR FRONT}
    </div>
    <div slot="front">
        {HERE COMES YOUR BACK}
    </div>
</st-flippy>
```

**Caveat**: Currently the flippy component is not a blocked element. Add its height and `display: block` and it should work with your layout.

## API (params)

Mandatory params (either `is-flipped` or `flip-(back-)events`):

* **is-flipped**: boolean
* **flip-events**: string, concatenated with ','
* **flip-back-events**: string, concatenated with ','

Optional params:

* **flip-duration**: number, default `400`
* **flip-timing-function**: string, default `ease-in`
