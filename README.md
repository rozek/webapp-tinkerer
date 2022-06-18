**Web Application Development made easy**

> This file is meant to be read as a "GitHub Page". If it looks "strange" because of visible &lt;script&gt; tags (or others), you should probably navigate to [https://rozek.github.io/webapp-tinkerer/](https://rozek.github.io/webapp-tinkerer/) instead

The **WebApp Tinkerer** (**WAT**) allows people to develop web applications directly in their browser. Both the development environment and the final application may be run on many operating systems (such as Windows, Linux, macOS, iOS, iPadOS, Android, ChromeOS) and on devices with multiple form factors (such as desktops, notebooks, convertibles, tablets, smartphones) - although developing on smartphones may be challenging because of their small displays (from a technical viewpoint, however, it is absolutely feasible). Even smartwatches may run WAT applications if they provide a modern browser.

**(WAT is currently under active development, please stay tuned - it is planned to be finished by end of July)**

**WAT vs. HyperCard**

WAT was inspired by the incredibly brilliant [HyperCard](https://en.wikipedia.org/wiki/HyperCard), but it is by no means any kind of HyperCard "clone".

Compared to HyperCard, WAT lacks

* the built-in drawing tool and
* the novice-friendly scripting language (WAT uses JavaScript instead)

On the other side, WAT offers

* support for many platforms and form factors,
* access to all [Web APIs](https://whatwebcando.today/) (e.g., Bluetooth, RTC, Speech Synthesis and Recognition, AR and VR and much more)
* no need for an explicit installation
* automatic updates (if desired)

(t.b.c.)



  <div id="Applet" class="WAT Applet" style="
    display:block; position:relative; overflow:hidden;
    width:480px; height:320px;
    background:white; color:black;
  "></div>




## Version History ##

(in reverse chronological order)

* 0.1.0 Initial Release (Minimum Viable Product, MVP)<br>*(to be launched on Tuesday, June 21, 2022)*

## License ##

[MIT License](LICENSE.md)

&nbsp;

<script name="JIL"         src="js/javascript-interface-library.js"></script>
<script name="jquery"      src="js/jquery-1.12.4.min.js"></script>
<script name="localforage" src="js/localforage.min.js"></script>
<script name="download"    src="js/download.min.js"></script>
<script name="codeflask"   src="js/codeflask.min.js"></script>

<link rel="stylesheet" href="css/WAT-Runtime.css">
<script src="js/WAT-Runtime.js"></script>

<link rel="stylesheet" href="css/WAT-Designer.css">
<script src="js/WAT-Designer.js"></script>
