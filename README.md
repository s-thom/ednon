# Editable Nonsense

## A concept for an editable modular utility dashboard

The final goal of the project is (near-)complete modularity. At this point it is not that. However, it is a somewhat modular dashboard with utilities, so it's most of the way there.

## Things it uses

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (and Jake Archibald's [idb](https://www.npmjs.com/package/idb) wrapper)
* [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) (for offline support)
* [Adding to Home Screen](https://developers.google.com/web/fundamentals/app-install-banners/)

## Contributing

If you have access to this repository (or I decided to make this public), then you are welcome to contribute.

Here's a list of good starter issues.

* [ ] A better name
* [ ] A better icon
* [ ] More types of things (note: may be best to hold off until the groundwork for phase 2 is in place)

### Making it go

Once you've checked out the source code, getting it to run locally is pretty easy

```sh
npm install
npm start
```

To build a production build:

```sh
npm run build
```

The output is in `build/`

## Phases

This project is to go through 3 phases of development.

### Phase 1

Make a dashboard with a few useful things.

This phase is complete.

### Phase 2

Make a component based system driven by IndexedDB, where the structure of different items can be modified by DB.

There will be a set of base Parts (e.g. buttons, lists, inputs of various types), which will then be used to build up mre complex Parts. Each Part manages its own state (but does not affect children or parents).

### Phase 3

Make a system for having information flow between different Parts.

I don't know how I'll do this yet.
