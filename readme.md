# How to start

Install `http-server` globally

```
$ npm install http-server -g
```

Run server on rep's folder

```
$ http-server ./
```

# Live demo

[https://toiletpatrol.github.io/rmtest/](https://toiletpatrol.github.io/rmtest/)

# This simple editor is a test Backbone.js app.

Task requirements:

- Two buttons (add image and add video).
- Image upload: show selected local file. No need to actually upload it to somewhere.
- Uploaded image popup box should be resizable by any of corner controls. Keep image's ratio.
- Video load: ask user to enter Youtube video URL, show video's preview.
- Loaded video popup box: same 4 controls, free resize.
- Popup boxes must be draggable.
- Don't limit the canvas' height. Add scroll if needed. New image or video must appear below others at the bottom of canvas.
- Don't save the state of canvas. Clear canvas on page refresh.
- Backbone.js is required. Any other libraries are optional.

# Publish to GitHub Pages

Rebase branch `gh-pages` from actual `master` then force push
