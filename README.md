**Web Application Development made easy**

> This file is meant to be read as a "GitHub Page". If it looks "strange" because of visible &lt;script&gt; tags (or others), you should probably navigate to [https://rozek.github.io/webapp-tinkerer](https://rozek.github.io/webapp-tinkerer)

<script info="if you see this tag, please navigate to https://rozek.github.io/webapp-tinkerer "></script>

The **WebApp Tinkerer** (**WAT**) allows novices, casual and professional programmers to **easily develop web applications directly in a browser**. Both the development environment and the final application may be run on **many operating systems** (such as Windows, Linux, macOS, iOS, iPadOS, Android, ChromeOS) and on devices with **multiple form factors** (such as desktops, notebooks, convertibles, tablets, smartphones).
Smartwatches *may* run WAT applications if they provide a modern browser and the applications have been designed with such small displays in mind.

**(WAT is currently under active development, please stay tuned - it is planned to be finished by mid of August)**

(current Version, Browser Requirements)

## Introduction ##

(runtime and designer, nested visuals, categories, applets, cards, compounds, controls, containers, components, master, builtin and custom, resources, configuration, custom properties, scripts, active and pending, event handling, bubbling, applet-wide, publish and subscribe, reactive programming, unique names)

### WAT vs. HyperCard ###

WAT was inspired by the incredibly brilliant [HyperCard](https://en.wikipedia.org/wiki/HyperCard), but it is by no means any kind of HyperCard "clone".

Compared to HyperCard, WAT lacks

* the built-in bitmap drawing tool (WAT uses vector-oriented graphics components instead),
* multiply usable Card backgrounds and
* the novice-friendly scripting language (WAT uses JavaScript instead)

On the other side, WAT offers

* support for many platforms and form factors,
* access to all [Web APIs](https://whatwebcando.today/) (e.g., Bluetooth, RTC, Speech Synthesis and Recognition, AR/VR and many more)
* no need for an explicit installation
* automatic updates (if desired)

## Special Use Cases ##

(active Personal Notebook, active Presentations)

## User Manual ##

(Designer Button, Toolbox, Layout Mode, Layouting (Matte, Positioning Guides), Nudger, Configuration Dialog (for Applet, Container, Component Selection), Script Editor (for Applet, Card, Component Selection), Applet Import, Applet Export)
(min. size for development: 320x480px)

### How to embed WAT Applets ###

(Runtime with/without Designer, dependencies, applet template or serialization)

### Resources ###

### Masters ###

*(Master Scripting, defineName/Category/Template/Method[s]/Property/Properties, on)*

### Applets ###

### Cards ###

### Compounds ###

### Controls ###

### Groups ###

*(special compound, simple group/ungroup, x/y configurable, automatic width/height, no other configuration possibilities, use compound for configuration and scripting)*

### Graphics ###

### Scripting ###

### Intrinsic Properties ###

### Custom Properties ###

### Event Handling ###

### Reactive Programming ###

(t.b.c.)



  <div id="Applet" class="WAT Applet" style="
    display:block; position:relative; overflow:hidden;
    width:480px; height:320px;
    border:dotted 1px black; border-radius:20px;
    background:white; color:black;
  "></div>




## Roadmap ##

The initial version of WAT is the smallest "minimal viable product" (MVP) the author could think of - usable to develop (yet very simple) web applications, but lacking many features users would normally expect from professional software. These features are planned to be integrated until end of August 2022:

* test on multiple platforms and browsers (Chrome, Firefox, Safari)
* full support for mobile and touch devices, including convertibles (still requires some tweaks)
* test on [Electron](https://www.electronjs.org/) and [NW.js](https://nwjs.io/) with internal dialogs
* Keyboard Bindings
* Undo/Redo
* (Card) Visit History
* local Backup in the Browser (using localForage)
* Synchronisation with external Server (develop the same WebApp from several computers)
* Support for designing "Compounds"
* Support for designing multiple cards
* Resource Handling (Resources are additional, usually external, CSS and Script files an applet may need)
* Master Scripting (develop your own masters, directly in the browser)
* extended Import (import one or multiple cards or components)
* additional import sources (i.e., from a given URL or from GitHub, with authentication)
* allow Drag-and-Drop import from filesystem onto applet itself (rather than Inspector)
* native Drag-and-Drop
* additional export targets (i.e., to a given URL or to GitHub, with authentication)
* export complete web applications
* Applet Overview (choose from all applets on a given web document)
* Card Overview (manage presence and order of all cards in an applet)
* Overview of Visuals with prominent names
* Overview of Visuals with reactive Variables
* Overview of currently known reactive Variables
* Overview of all Masters (and their actual usage)
* applet-wide event handling (aka message bus, publish/subscribe)
* find visuals containing a given text
* find visuals with a given state (e.g., pending script, pending error)
* remove jQuery dependency
* support for [Electron](https://www.electronjs.org/) and [NW.js](https://nwjs.io/) with external dialogs (yet to be developed)
* integrate [JS-Interpreter](https://github.com/NeilFraser/JS-Interpreter) (yet to be developed)
* inspect and debug JS-Interpreter scripts (yet to be developed)
* optional: add predefined "interactions" (to avoid scripting, yet to be developed)
* optional: perhaps integrate [Blockly](https://github.com/google/blockly) (yet to be developed)

and, of course, many additional masters

## Version History ##

(in reverse chronological order)

* 0.1.0 Initial Release (absolutely Minimum Viable Product, MVP)<br>*(to be launched on Tuesday, June 21, 2022)*

## Credits ##

WAT internally uses the following open-source software:

* [jQuery](https://github.com/jquery/jquery) - temporarily only, to be removed
* [JavaScript Interface Library](https://github.com/rozek/javascript-interface-library)
* [localForage](https://github.com/localForage/localForage)
* [download](http://danml.com/download.html)
* ~~[CodeFlask](https://github.com/kazzkiq/CodeFlask)~~
* ~~[Pell](https://github.com/jaredreich/pell)~~

## License ##

[MIT License](LICENSE.md)

&nbsp;

<style>
  html { width:100%; height:100% }
  body { min-width:100%; min-height:100% }
</style>

<script name="JIL"         src="js/javascript-interface-library.js"></script>
<script name="jquery"      src="js/jquery-1.12.4.min.js"></script>
<script name="localforage" src="js/localforage.min.js"></script>
<script name="download"    src="js/download.min.js"></script>
<script name="codeflask"   src="js/codeflask.min.js"></script>

<link rel="stylesheet" href="css/WAT-Runtime.css">
<script src="js/WAT-Runtime.js"></script>

<link rel="stylesheet" href="css/WAT-Designer.css">
<script src="js/WAT-Designer.js"></script>
