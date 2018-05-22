# word-clock

A responsive HTML5 Word-based clock

## Gestures

Swipe :arrow_up:️️️️ to switch language

Swipe :arrow_down:️️️️ to switch color

Swipe :arrow_left:️️️️ and :arrow_right:️️️️ to change time

`Tap&hold` to go back to present

`Double tap` to toggle fullscreen

## Configuration

The state and configuration is persisted on the location's hash. The first 2 should be modified using gestures. After modifying the URL you need to reload to see the changes.

- `background`: Set a fixed background color. The value needs to be a valid CSS color, if hex without `#`, f.e: ABBE51
- `color`: A value from `0-5` specifying the color of the clock.
- `cycle`: Switch to the next color after this many seconds. `0` for no cycling
- `dots`: Change it to `0` to hide the dots at the bottom that provide 1-minute precision.
- `fx`: Change it to `0` to turn off transitions on slower devices.
- `lang`: At the moment, `en` and `es` are supported.
- `width`: A value from `0-100` specifying the % of the viewport width to use

## Demo

See the word-clock in action at https://flesler.github.io/word-clock/

## License

MIT License

Copyright (c) 2017 Ariel Flesler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
