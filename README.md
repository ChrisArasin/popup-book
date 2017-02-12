# A Popup Book of Superheroes.

## Usage instructions
JavaScript is all packaged, so you can just open index.html in chrome.
Click and drag to page through the book.

## What I would do next
I spent my time focusing building a framework for a popup book, where updating a single value on the parent Book object controls the transforms for each spread, page, and popup.

The CSS for the book and pages is quite simple. However, I did not spend time on reusable classes for creating different types of popups. Establishing some rules there would go a long way, especially for dealing with depth issues.

Additionally, the creation of custom object, each with their own CSS size and positioning styles, and transform properties is not the simplest task with vanilla JavaScript, so I focused more on an elegant animation system instead of object assembly process. React/JSX could go a long way to help assemble nested DOM elements with custom styles.

I also chose simplify the animation problem by not trying to simulate actual popup book mechanics. I did however watch a few videos and they're fascination. That would be particularly fun challenge. https://www.youtube.com/channel/UCx2M2bGHtXBszG6tuR_NIbQ/videos

I had to force myself and not add shadows. But they would look great.

On using it, I noticed that the figure has better motion when going backwards through the book, so the animations could use some adjustments.

And the bat-signal... I really wanted to make the bat-signal.

## Note on time
At three hours I had a working prototype of the Book > Spread > Page > Popup relationship. I spent some extra time finishing the mouse interaction and assembling the demo scenes.
