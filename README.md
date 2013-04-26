# Universal Slider Plugin
### This plugin adds functionality to the jQuery UI slider component.
#### It uses jQuery, jQuery UI, and Less CSS.

## About

* pluginSlider.js
* Author : Jeffrey D. Stein
* Title : Slider Plugin
* Date Created : 2011-May-24
* Last Updated : 2011-Sep-20
* Version : 3.8

## Release Notes

-------------------------
### 2011-Sep-20

#### v/4.0

* Moved code that finds/creates value(s), min, max inputs outside of the create event callback function.
* Created aliases for settings: '*.value(s)', '*.min', '*.max'.

-------------------------
### 2011-Aug-17 & 2011-Sep-19

#### v/3.9

* Various edits.

-------------------------
### 2011-Aug-16

#### v/3.8

* Comment out console logging.

-------------------------
### 2011-Aug-11

#### v/3.7

* Added CSS notches to single, lower and upper range inputs.
* Consolidated some styles using LESS.

-------------------------
### 2011-Aug-11

#### v/3.6

* Optimization help from Kirin Murphy:
  * Added "parseInt" to lower and upper range input value getters.
  * General optimization.

-------------------------
### 2011-Aug-09

#### v/3.5

* Added code that inserts min and max inputs if they aren't hard-coded, or sets values of existing min and max inputs.

-------------------------
### 2011-Aug-09

#### v/3.4

* Added code to put all inputs inside a fieldset.
* Added settings for min and max classes.

-------------------------
### 2011-Aug-04

#### v/3.3

* Never mind.  Seems to already work fine with unique fieldsets.
* Need to tweak code so it accepts min and max inputs with unique fieldsets.

-------------------------
### 2011-July-28

#### v/3.2

* Playing around with min and max inputs.  These should exist in the code so they don't need to be generated dynamically.

-------------------------
### 2011-July-26

#### v/3.1

* Added code that creates and appends value input(s) to handle(s).

-------------------------
### 2011-July-12

#### v/3.0

* Optimized by Kirin Murphy.

-------------------------
### 2011-July-12

#### v/2.0

* Need to optimize so that data is grabbed from hard coded inputs (if they exist) before the create function runs.
* Trying to make it a plugin.

-------------------------
### 2011-June-20

#### v/1.0

* Some improvements.

-------------------------
### 2011-May-24

#### v/Beta

* Starting out.  Not a plugin yet.

-------------------------