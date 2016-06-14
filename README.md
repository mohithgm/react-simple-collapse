# react-simple-collapse [![Build Status](https://travis-ci.org/mrdivyansh/react-simple-collapse.svg)](https://travis-ci.org/mrdivyansh/react-simple-collapse) [![npm version](https://badge.fury.io/js/react-simple-collapse.svg)](https://badge.fury.io/js/react-simple-collapse)


## Installation

```
npm install react-simple-collapse --save
```

## Usage

```
<Expandable
	duration={ 300 }
	shouldExpanded={ true | false }
	onExpandStart={ ()=> {console.log('div is started expending')} }
	onExpandEnd={ ()=> {console.log('div is expended')} }
	onCollapseStart={ ()=> {console.log('div is started collapsing')} }
	onCollapseEnd={ ()=> {console.log('div is hidden now')} }
>
	<div>I am expanded div</div>
</Expandable>
```

## Liscense

MIT
