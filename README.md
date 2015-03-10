# Universal Slider Plugin

A jQuery plugin by Jeff Stein

### This plugin adds functionality to the jQuery UI slider component.  It uses jQuery, jQuery UI, and Less CSS.

## About

* **Author**: Jeffrey D. Stein
* **Date Created**: 2011-May-24
* **GitHub Pages**: [link](http://jdstein1.github.io/Slider-Plugin/)
* **Dependencies**:
	* Required
		* jQuery (v1.6.4+): [link](http://jquery.com/download/)
		* jQuery UI (v1.8.13+): [link](http://jqueryui.com/download/)
	* Optional
		* Less CSS (v1.4.1+): [link](http://lesscss.org/)

## Usage

### Running locally

### Integrating with your project



## Release Notes

* **2013-Apr-26**
	* SEE COMMIT LOG FOR FURTHER RELEASE NOTES
* **2011-Oct-03**
	* select.html, v/1.3
		* Used change event to trigger value updates of the select, input and handle value.
		* Consolidated change events into one function that is triggered by selects and inputs.
	* select.html, v/1.2
		* Append inputs to handles.
* **2011-Sep-30**
	* select.html, v/1.1
		* Added form inputs that update in sync with the sliders and select options.
* **2011-Sep-23**
	* select.html, v/1.0
		* Started work on extending the functionality of a jQuery UI slider demo.  Original demo allows min or max slider functionality with one select option form element.  I intend to add compatibility with a range slider that uses 2 select option form elements.
* **2011-Sep-20**
	* pluginSlider.js, v/4.0
		* Moved code that finds/creates value(s), min, max inputs outside of the create event callback function.
		* Created aliases for settings: '*.value(s)', '*.min', '*.max'.
* **2011-Sep-19**
	* pluginSlider.js, v/3.9
		* Various edits.
* **2011-Aug-17**
	* pluginSlider.js, v/3.9
		* Various edits.
* **2011-Aug-16**
	* pluginSlider.js, v/3.8
		* Comment out console logging.
* **2011-Aug-11**
	* pluginSlider.js, v/3.7
		* Added CSS notches to single, lower and upper range inputs.
		* Consolidated some styles using LESS.
	* pluginSlider.js, v/3.6
		* Optimization help from Kirin Murphy:
		* Added "parseInt" to lower and upper range input value getters.
		* General optimization.
* **2011-Aug-09**
	* pluginSlider.js, v/3.5
		* Added code that inserts min and max inputs if they aren't hard-coded, or sets values of existing min and max inputs.
	* pluginSlider.js, v/3.4
		* Added code to put all inputs inside a fieldset.
		* Added settings for min and max classes.
* **2011-Aug-04**
	* pluginSlider.js, v/3.3
		* Never mind.  Seems to already work fine with unique fieldsets.
		* Need to tweak code so it accepts min and max inputs with unique fieldsets.
* **2011-July-28**
	* pluginSlider.js, v/3.2
		* Playing around with min and max inputs.  These should exist in the code so they don't need to be generated dynamically.
* **2011-July-26**
	* pluginSlider.js, v/3.1
		* Added code that creates and appends value input(s) to handle(s).
* **2011-July-12**
	* pluginSlider.js, v/3.0
		* Optimized by Kirin Murphy.
	* pluginSlider.js, v/2.0
		* Need to optimize so that data is grabbed from hard coded inputs (if they exist) before the create function runs.
		* Trying to make it a plugin.
* **2011-June-20**
	* pluginSlider.js, v/1.0
		* Some improvements.
* **2011-May-24**
	* pluginSlider.js, v/Beta
		* Starting out.  Not a plugin yet.
